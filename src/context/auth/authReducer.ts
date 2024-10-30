'use client';
import { User } from '@/types/auth';
import { AuthState } from './';

type AuthActionType =
  | { type: 'Auth - CHECKING' }
  | { type: 'Auth - LOGIN'; payload: User }
  | { type: 'Auth - LOGOUT' };

export const authReducer = (
  state: AuthState,
  action: AuthActionType
): AuthState => {
  switch (action.type) {
    case 'Auth - CHECKING':
      return {
        ...state,
        isAuthenticated: false,
        isAuthenticating: true,
      };
    case 'Auth - LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload, //this is an example
        isAuthenticating: false,
      };
    case 'Auth - LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        isAuthenticating: false,
      };
    default:
      return state;
  }
};
