'use client';
import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { AuthContext, authReducer } from './';
import {
  loginService,
  logoutService,
  registerService,
  revalidateToken,
} from '@/services';
import { useRouter } from 'next/navigation';
import { User } from '@/types/auth';

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isAuthenticating: boolean;
}

const AUTH_INITIAL_STATE: AuthState = {
  isAuthenticated: false,
  user: null,
  isAuthenticating: true,
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const user: User = await revalidateToken();
        dispatch({ type: 'Auth - LOGIN', payload: user });
      } catch (error) {
        console.error('Error en login', error);
        dispatch({ type: 'Auth - LOGOUT' });
      }
    };
    checkLoginStatus();
  }, [router]);

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    dispatch({ type: 'Auth - CHECKING' });
    try {
      const user: User = await loginService(email, password);
      dispatch({ type: 'Auth - LOGIN', payload: user });
    } catch (error) {
      console.error('Error en login', error);
      dispatch({ type: 'Auth - LOGOUT' });
    }
  };

  const register = async ({
    fullName,
    email,
    password,
  }: {
    fullName: string;
    email: string;
    password: string;
  }) => {
    dispatch({ type: 'Auth - CHECKING' });
    try {
      const user: User = await registerService(email, password, fullName);
      dispatch({ type: 'Auth - LOGIN', payload: user });
    } catch (error) {
      console.error('Error en login', error);
      dispatch({ type: 'Auth - LOGOUT' });
    }
  };

  const logout = () => {
    logoutService();
    dispatch({ type: 'Auth - LOGOUT' });
  };

  const checking = () => {
    dispatch({ type: 'Auth - CHECKING' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,

        //Methods
        checking,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
