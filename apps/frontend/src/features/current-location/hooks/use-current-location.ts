import { useContext } from 'react';
import { currentLocationContext } from '../contexts';

export function useCurrentLocation() {
  return useContext(currentLocationContext);
}
