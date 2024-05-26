import { useQuery } from '@tanstack/react-query';
import { getShelter } from '../api';

export const useShelter = (id?: string) => {
  return useQuery({
    queryKey: ['shelters', id],
    queryFn: () => getShelter(id!),
    enabled: !!id,
  });
};
