import { LatLngTuple } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useWatchPosition } from '../../hooks/use-watch-position';
import { useEffect } from 'react';
import { cn } from '../../utils/cn';

export interface Point {
  position: LatLngTuple;
  label: string;
}

interface MapProps {
  className?: string;
  points?: Point[];
}

export const Map = ({ className, points }: MapProps) => {
  const userCoordinates = useWatchPosition();

  const center: LatLngTuple = [-30.069619, -51.166494];
  const userPosition: LatLngTuple | undefined = userCoordinates.currentPosition?.coords
    ? [userCoordinates.currentPosition.coords.latitude, userCoordinates.currentPosition.coords.longitude]
    : undefined;

  useEffect(() => {
    userCoordinates.startWatch({ enableHighAccuracy: true });
    return () => userCoordinates.clearWatch();
  }, []);

  function renderPoints() {
    if (!points?.length) {
      return;
    }

    return points.map((point) => (
      <Marker position={point.position} key={point.label}>
        <Popup>{point.label}</Popup>
      </Marker>
    ));
  }

  return (
    <div className={cn('flex flex-col flex-1', className)}>
      <MapContainer className="flex flex-col flex-1" center={center} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={20}
        />
        {userPosition && (
          <Marker position={userPosition}>
            <Popup>Minha posição</Popup>
          </Marker>
        )}
        {renderPoints()}
      </MapContainer>
    </div>
  );
};
