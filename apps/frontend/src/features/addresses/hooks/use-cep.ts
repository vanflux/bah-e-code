import { useQuery } from '@tanstack/react-query';
import cepPromise from 'cep-promise';

export function useCep(cepInput?: string) {
  const cep = cepInput?.replace(/[^\d]/g, '');
  return useQuery({
    queryFn: () => cepPromise(cep!),
    queryKey: ['cep', cep],
    enabled: cep?.length === 8,
  });
}
