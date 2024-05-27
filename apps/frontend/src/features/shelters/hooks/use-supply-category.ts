import { useQuery } from '@tanstack/react-query';
import { getSupplyCategory } from '../api';

export const useSupplyCategory = (id?: string) => {
  return useQuery({
    queryKey: ['supply-categories', id],
    queryFn: () => getSupplyCategory(id!),
    enabled: !!id,
  });
};
