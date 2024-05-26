import L, { LatLngTuple, Map } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useWatchPosition } from '../../hooks/use-watch-position';
import React, { RefObject, useEffect, useState } from 'react';
import { cn } from '../../utils/cn';
import { Icon } from '../icons';

export interface Point {
  position: LatLngTuple;
  label: string;
  id: string;
}

const markerIcon = new L.Icon({
  iconUrl: '/assets/svg/marker.svg',
});

const userLocationIcon = new L.Icon({
  iconUrl: '/assets/svg/user.svg',
});

interface CenterUserLocationProps {
  position: LatLngTuple | undefined;
}

function CenterUserLocationButton({ position }: CenterUserLocationProps) {
  const map = useMap();

  function center() {
    if (position) {
      map.setView(position, 16);
    }
  }

  return (
    <div className="z-[500] flex justify-end p-2">
      <button type="button" className="shadow-system rounded-full p-2 bg-primary-50 hover:bg-primary-200 active:bg-primary-100">
        <Icon type="centerLocation" className="w-7 h-7 fill-gray-600" onClick={center} />
      </button>
    </div>
  );
}

interface MapProps {
  className?: string;
  points?: Point[];
  ref?: RefObject<Map>;
}

export const LMap = React.forwardRef<Map, MapProps>(({ className, points }, ref) => {
  const userCoordinates = useWatchPosition();
  const [userPosition, setUserPosition] = useState<LatLngTuple>();

  const center: LatLngTuple = [-30.069619, -51.166494];

  useEffect(() => {
    userCoordinates.startWatch({ enableHighAccuracy: true });

    return () => userCoordinates.clearWatch();
  }, []);

  useEffect(() => {
    if (userCoordinates.currentPosition?.coords) {
      setUserPosition(() => [userCoordinates.currentPosition!.coords.latitude, userCoordinates.currentPosition!.coords.longitude]);
    }
  }, [userCoordinates.currentPosition]);

  function renderPoints() {
    if (!points?.length) {
      return;
    }

    return points.map((point) => (
      <Marker position={point.position} key={point.id} icon={markerIcon}>
        <Popup>{point.label}</Popup>
      </Marker>
    ));
  }

  return (
    <div className={cn('flex flex-col flex-1', className)}>
      <MapContainer className="flex flex-col flex-1" ref={ref} center={center} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={20}
        />
        {userPosition && (
          <Marker position={userPosition} icon={userLocationIcon}>
            <Popup>Minha posição</Popup>
          </Marker>
        )}
        {renderPoints()}
        <CenterUserLocationButton position={userPosition} />
      </MapContainer>
    </div>
  );
});
