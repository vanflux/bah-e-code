import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../api';
import toast from 'react-hot-toast';
import { useAuth } from './use-auth';

export function useLogin() {
  const { setToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.clear();
      setToken(data.accessToken);
      toast.success('Autenticado com sucesso!');
    },
    onError: () => {
      setToken(undefined);
      toast.error('Falha ao autenticar');
    },
  });
}
