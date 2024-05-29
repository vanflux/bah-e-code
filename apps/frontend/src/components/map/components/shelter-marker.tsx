import { Icon } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';

const shelterIcon = new Icon({
  iconUrl: '/assets/svg/shelter.svg',
});

const disabledShelterIcon = new Icon({
  iconUrl: '/assets/svg/disabled-shelter.svg',
});

export interface ShelterPoint {
  latitude: number;
  longitude: number;
  shelterId: string;
  name: string;
  disabled?: boolean;
}

export function ShelterMarker({ latitude, longitude, name, disabled }: ShelterPoint) {
  return (
    <Marker position={[latitude, longitude]} icon={disabled ? disabledShelterIcon : shelterIcon}>
      <Popup>{name}</Popup>
    </Marker>
  );
}
