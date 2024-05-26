import { useContext } from 'react';
import { authContext } from '../contexts';

export function useAuth() {
  return useContext(authContext);
}
