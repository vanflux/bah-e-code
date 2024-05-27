import { useQuery } from '@tanstack/react-query';
import { getSupplyCategories } from '../api';

export const useSupplyCategories = () => {
  return useQuery({
    queryKey: ['supply-categories'],
    queryFn: () => getSupplyCategories(),
  });
};
