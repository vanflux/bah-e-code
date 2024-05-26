import { useQuery } from '@tanstack/react-query';
import { getWarn, getWarnList } from '../api/warn';

export const useWarnList = () => {
  return useQuery({
    queryKey: ['warnList'],
    queryFn: () => getWarnList(),
  });
};

export const useFullWarn = (id: string) => {
  return useQuery({
    queryKey: ['warn'],
    queryFn: () => getWarn(id),
  });
};
