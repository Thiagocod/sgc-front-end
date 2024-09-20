import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AdminAuthenticated, AdminAuthLogin, AdminLogout } from '../hooks/Auth'; // Supondo que você tenha funções específicas para admin

interface AdminAuthContextType {
  adminUser: string | null;
  isLoading: boolean; // Estado de carregamento para autenticação de admin
  adminSignin: (emailAdmin: string, password: string, cb: () => void) => Promise<void>;
  adminSignout: (cb: () => void) => void;
}

const adminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function ProvideAdminAuth({ children }: { children: ReactNode }) {
  const auth = useProvideAdminAuth();
  return <adminAuthContext.Provider value={auth}>{children}</adminAuthContext.Provider>;
}

export function useAdminAuth() {
  const context = useContext(adminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within a ProvideAdminAuth');
  }
  return context;
}

export function useProvideAdminAuth() {
  const [adminUser, setAdminUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Estado de carregamento

  useEffect(() => {
    const checkAdminAuth = async () => {
      setIsLoading(true); // Inicia o estado de carregamento
      const authData = await AdminAuthenticated();
      if (authData && authData.adminUser) {
        setAdminUser(authData.adminUser);
      } else {
        setAdminUser(null);
      }
      setIsLoading(false); // Finaliza o estado de carregamento
    };
    checkAdminAuth();
  }, []);

  const adminSignin = async (emailAdmin: string, password: string, cb: () => void) => {
    try {
      await AdminAuthLogin({ emailAdmin, password });
      setAdminUser(emailAdmin);
      cb();
    } catch (error) {
      console.error('Admin login failed', error);
    }
  };

  const adminSignout = (cb: () => void) => {
    AdminLogout();
    setAdminUser(null);
    cb();
  };

  return {
    adminUser,
    isLoading, // Retorna o estado de carregamento
    adminSignin,
    adminSignout,
  };
}