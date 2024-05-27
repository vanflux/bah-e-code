import { useQuery } from '@tanstack/react-query';
import { findAllAddresses } from '../api';

export function useAddresses(enabled?: boolean) {
  return useQuery({
    queryFn: () => findAllAddresses(),
    queryKey: ['addresses'],

    enabled,
  });
}
