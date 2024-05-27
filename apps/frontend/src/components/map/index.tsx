import L, { LatLngTuple, Map } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import React, { RefObject } from 'react';
import { cn } from '../../utils/cn';
import { useCurrentLocation } from '../../features/current-location';
import CenterLocationButton from './components/center-button';

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

interface MapProps {
  className?: string;
  points?: Point[];
  ref?: RefObject<Map>;
}

export const LMap = React.forwardRef<Map, MapProps>(({ className, points }, ref) => {
  const center: LatLngTuple = [-30.069619, -51.166494];
  const { latitude, longitude } = useCurrentLocation();
  const userPosition: LatLngTuple | undefined = latitude && longitude ? [latitude, longitude] : undefined;

  function renderPoints() {
    if (!points?.length) return;
    return points.map((point) => (
      <Marker position={point.position} key={point.id} icon={markerIcon}>
        <Popup>{point.label}</Popup>
      </Marker>
    ));
  }

  return (
    <div className={cn('flex flex-col flex-1', className)}>
      <MapContainer className="flex flex-col flex-1 z-0" ref={ref} center={center} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={20}
          zIndex={0}
        />
        {userPosition && (
          <Marker position={userPosition} icon={userLocationIcon}>
            <Popup>Minha posição</Popup>
          </Marker>
        )}
        {renderPoints()}
        <CenterLocationButton />
      </MapContainer>
    </div>
  );
});
