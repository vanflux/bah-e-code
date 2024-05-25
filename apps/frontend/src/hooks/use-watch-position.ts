import { useState } from 'react';
import { Geolocation, Position } from '@capacitor/geolocation';

export function useWatchPosition() {
  const [currentPosition, setCurrentPosition] = useState<Position>();
  const [watchId, setWatchId] = useState('');
  const [error, setError] = useState();

  const clearWatch = () => {
    if (watchId) {
      Geolocation.clearWatch({ id: watchId });
      setWatchId('');
    }
  };

  const startWatch = async (options?: PositionOptions) => {
    if (!watchId) {
      const id = await Geolocation.watchPosition(options || {}, (pos: Position | null, err) => {
        if (err) {
          setError(err);
        }
        if (pos) {
          setCurrentPosition(pos);
        }
      });
      setWatchId(id);
    }
  };

  return {
    error,
    currentPosition,
    clearWatch,
    startWatch,
    isAvailable: true,
  };
}
