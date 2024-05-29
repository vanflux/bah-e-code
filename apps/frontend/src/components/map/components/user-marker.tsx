import { Icon, LatLngTuple } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import { useCurrentLocation } from '../../../features/current-location';

const userLocationIcon = new Icon({
  iconUrl: '/assets/svg/user.svg',
});

export function UserMarker() {
  const { latitude, longitude } = useCurrentLocation();
  const userPosition: LatLngTuple | undefined = latitude && longitude ? [latitude, longitude] : undefined;

  if (!userPosition) return null;

  return (
    <Marker position={userPosition} icon={userLocationIcon}>
      <Popup>Minha posição</Popup>
    </Marker>
  );
}
