import { ReactNode, createContext, useEffect, useMemo, useState } from 'react';
import { useWatchPosition } from '../../../hooks/use-watch-position';
import { AddressDto, useAddresses } from '../../addresses';

export type CurrentLocationType = 'gps' | string;

interface CurrentLocationContext {
  latitude?: number;
  longitude?: number;
  completeAddresses?: AddressDto[];
  type?: string;
  setType: (type?: CurrentLocationType) => void;
}

export const currentLocationContext = createContext<CurrentLocationContext>({} as CurrentLocationContext);

export const CurrentLocationProvider = ({ children }: { children?: ReactNode }) => {
  const [type, setType] = useState<CurrentLocationType | undefined>('gps');
  const userCoordinates = useWatchPosition();
  const { data: addresses } = useAddresses();

  useEffect(() => {
    if (type !== 'gps') return;
    userCoordinates.startWatch({ enableHighAccuracy: true });
    return () => userCoordinates.clearWatch();
  }, [type]);

  const value = useMemo<CurrentLocationContext>(() => {
    const completeAddresses = addresses?.filter((item) => item.latitude && item.longitude);
    if (type === 'gps') {
      return {
        latitude: userCoordinates.currentPosition?.coords.latitude,
        longitude: userCoordinates.currentPosition?.coords.longitude,
        type,
        setType,
        completeAddresses,
      };
    } else {
      const address = addresses?.find((item) => item.addressId === type);
      return {
        latitude: address?.latitude,
        longitude: address?.longitude,
        type,
        setType,
        completeAddresses,
      };
    }
  }, [userCoordinates.currentPosition, type, setType, addresses]);

  return <currentLocationContext.Provider value={value}>{children}</currentLocationContext.Provider>;
};
