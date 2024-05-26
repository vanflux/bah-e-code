import { useQuery } from '@tanstack/react-query';
import { findHomeImages } from '../api';
import { useAuth } from '../../auth';

export const useHomeImages = () => {
  const { authenticated } = useAuth();
  return useQuery({
    queryKey: ['images'],
    queryFn: () => findHomeImages(),
    enabled: authenticated,
  });
};
