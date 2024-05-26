import { ReactNode, createContext, useEffect, useMemo, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthDto } from '../dtos';
import { getAuthToken, setAuthToken } from '../../../services/auth';

interface AuthContext {
  authDto?: AuthDto;
  authenticated: boolean;
  setToken: (token?: string) => void;
}

export const authContext = createContext<AuthContext>({} as AuthContext);

export const AuthProvider = ({ children }: { children?: ReactNode }) => {
  const [token, setToken] = useState(() => getAuthToken());

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  const value = useMemo<AuthContext>(() => {
    if (!token) return { authenticated: false, setToken };
    try {
      const authDto = jwtDecode<AuthDto>(token);
      return { authenticated: true, authDto, setToken };
    } catch {
      return { authenticated: false, setToken };
    }
  }, [token, setToken]);

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};
