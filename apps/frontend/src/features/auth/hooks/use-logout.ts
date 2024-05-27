import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useAuth } from './use-auth';

export function useLogout() {
  const { setToken } = useAuth();
  const queryClient = useQueryClient();

  return () => {
    setToken(undefined);
    queryClient.clear();
    toast.success('Desconectado com sucesso!');
  };
}
