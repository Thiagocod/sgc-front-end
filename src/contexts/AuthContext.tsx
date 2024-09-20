import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Authenticated, AuthLogin, logout } from '../hooks/Auth'; // Mova sua lógica existente para um service separado, se ainda não o fez

interface AuthContextType {
  user: string | null;
  isLoading: boolean; // Novo estado de carregamento
  signin: (emailUser: string, password: string, cb: () => void) => Promise<void>;
  signout: (cb: () => void) => void;
}

const authContext = createContext<AuthContextType | undefined>(undefined);

export function ProvideAuth({ children }: { children: ReactNode }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useAuth() {
  const context = useContext(authContext);
  if (!context) {
    throw new Error('useAuth must be used within a ProvideAuth');
  }
  return context;
}

export function useProvideAuth() {
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Estado de carregamento

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true); // Inicia o carregamento
      const authData = await Authenticated();
      if (authData && authData.user) {
        setUser(authData.user);
      } else {
        setUser(null);
      }
      setIsLoading(false); // Finaliza o carregamento
    };
    checkAuth();
  }, []);

  const signin = async (emailUser: string, password: string, cb: () => void) => {
    try {
      await AuthLogin({ emailUser, password });
      setUser(emailUser);
      cb();
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const signout = (cb: () => void) => {
    logout();
    setUser(null);
    cb();
  };

  return {
    user,
    isLoading, // Retorna o estado de carregamento
    signin,
    signout,
  };
}



