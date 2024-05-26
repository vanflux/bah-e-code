import { useQuery } from '@tanstack/react-query';
import { getWarn } from '../api';

export const useWarn = (id: string) => {
  return useQuery({
    queryKey: ['warn', id],
    queryFn: () => getWarn(id),
  });
};
