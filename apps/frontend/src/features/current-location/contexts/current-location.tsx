import { ReactNode, createContext, useEffect, useMemo, useState } from 'react';
import { AddressDto, useAddresses } from '../../addresses';
import { Geolocation } from '@capacitor/geolocation';
import toast from 'react-hot-toast';

export type CurrentLocationType = 'gps' | string;

interface CurrentLocationContext {
  latitude?: number;
  longitude?: number;
  completeAddresses?: AddressDto[];
  type?: string;
  setType: (type?: CurrentLocationType) => void;
  refetch: () => void;
}

export const currentLocationContext = createContext<CurrentLocationContext>({} as CurrentLocationContext);

export const CurrentLocationProvider = ({ children }: { children?: ReactNode }) => {
  const [type, setType] = useState<CurrentLocationType | undefined>('gps');
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();
  const { data: addresses } = useAddresses();

  const completeAddresses = useMemo(() => {
    return addresses?.filter((item) => item.latitude && item.longitude);
  }, [addresses]);

  const refetch = async () => {
    if (type === 'gps') {
      try {
        const pos = await Geolocation.getCurrentPosition();
        if (!pos.coords.latitude || !pos.coords.longitude) return;
        setLatitude(() => pos.coords.latitude);
        setLongitude(() => pos.coords.longitude);
      } catch {
        toast.error('Falha ao obter a sua localização!');
      }
    } else {
      const address = addresses?.find((item) => item.addressId === type);
      if (!address?.latitude || !address.longitude) return;
      setLatitude(() => address.latitude);
      setLongitude(() => address.longitude);
    }
  };

  useEffect(() => {
    refetch();
  }, [type]);

  const value: CurrentLocationContext = { latitude, longitude, refetch, setType, type, completeAddresses };

  return <currentLocationContext.Provider value={value}>{children}</currentLocationContext.Provider>;
};
