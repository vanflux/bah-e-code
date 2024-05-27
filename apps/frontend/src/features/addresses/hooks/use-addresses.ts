import { useQuery } from '@tanstack/react-query';
import { findAllAddresses } from '../api';
import { useAuth } from '../../auth';

export function useAddresses() {
  const { authenticated } = useAuth();
  return useQuery({
    queryFn: () => findAllAddresses(),
    queryKey: ['addresses'],
    enabled: !!authenticated,
  });
}
