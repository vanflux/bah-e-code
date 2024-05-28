import { useQuery } from '@tanstack/react-query';
import { getRivers } from '../api';

export const useRivers = () => {
  return useQuery({
    queryKey: ['rivers'],
    queryFn: () => getRivers(),
  });
};
