import { useMutation } from '@tanstack/react-query';
import { createAddress } from '../api';

export function useCreateAddress() {
  return useMutation({
    mutationFn: createAddress,
  });
}
