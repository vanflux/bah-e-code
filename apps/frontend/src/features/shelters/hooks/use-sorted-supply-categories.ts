import { useMemo } from 'react';
import { SupplyCategoryDto } from '../dtos';

export function useSortedSupplyCategories(supplyCategories: SupplyCategoryDto[]) {
  return useMemo(() => {
    return supplyCategories?.sort((a, b) => {
      if (a.icon && b.icon) return a.name.localeCompare(b.name);
      if (a.icon) return -1;
      if (b.icon) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [supplyCategories]);
}
