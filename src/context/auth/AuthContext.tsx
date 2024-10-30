'use client';
import { createContext } from 'react';
import { AuthState } from './AuthProvider';

interface ContextProps extends AuthState {
  checking: () => void;
  login: (loginData: { email: string; password: string }) => Promise<void>;
  register: (registerData: {
    fullName: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext({} as ContextProps);
