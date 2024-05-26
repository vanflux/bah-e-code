import { useQuery } from '@tanstack/react-query';
import { findAllWarns } from '../api';
import { useAuth } from '../../auth';

export const useHomeImages = () => {
  const { authenticated } = useAuth();
  return useQuery({
    queryKey: ['warns'],
    queryFn: () => findAllWarns(),
    enabled: authenticated,
  });
};
