import { useMap } from 'react-leaflet';
import { Icon } from '../../icons';
import { useCurrentLocation } from '../../../features/current-location';

export default function CenterLocationButton() {
  const { latitude, longitude } = useCurrentLocation();
  const map = useMap();

  function center() {
    if (latitude != null && longitude != null) {
      map.setView([latitude, longitude], 17, { animate: true });
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
