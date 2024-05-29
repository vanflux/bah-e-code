import { cn } from '../../utils/cn';
import { LatLngTuple, Map } from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import { ShelterMarker, ShelterPoint } from './components/shelter-marker';
import { UserMarker } from './components/user-marker';
import React, { RefObject } from 'react';
import CenterLocationButton from './components/center-button';

interface MapProps {
  className?: string;
  shelterPoints?: ShelterPoint[];
  ref?: RefObject<Map>;
}

export const LMap = React.forwardRef<Map, MapProps>(({ className, shelterPoints }, ref) => {
  const center: LatLngTuple = [-30.069619, -51.166494];

  return (
    <div className={cn('flex flex-col flex-1', className)}>
      <MapContainer className="flex flex-col flex-1" ref={ref} center={center} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={20}
          zIndex={0}
        />
        <UserMarker />
        {shelterPoints?.map((point) => <ShelterMarker key={point.shelterId} {...point} />)}
        <CenterLocationButton />
      </MapContainer>
    </div>
  );
});
