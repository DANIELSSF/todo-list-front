import { User } from '@/types/auth';
import api from './api';

export const loginService = async (
  email: string,
  password: string
): Promise<User> => {
  const resp = await api.post('auth/login', { email, password });
  localStorage.setItem('token', resp.data.token);
  return resp.data;
};

export const registerService = async (
  email: string,
  password: string,
  fullName: string
): Promise<User> => {
  const resp = await api.post('auth/register', { email, password, fullName });
  localStorage.setItem('token', resp.data.token);
  return resp.data;
};

export const revalidateToken = async (): Promise<User> => {
  const resp = await api.get('auth/revalidate');
  localStorage.setItem('token', resp.data.token);
  return resp.data;
};

export const logoutService = () => {
  localStorage.removeItem('token');
};
