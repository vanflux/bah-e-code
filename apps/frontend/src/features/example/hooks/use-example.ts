import { useQuery } from '@tanstack/react-query';
import { getExample } from '../api';

export const useExample = () => {
  return useQuery({
    queryKey: ['example'],
    queryFn: () => getExample(),
  });
};
