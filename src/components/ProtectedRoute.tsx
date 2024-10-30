'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isAuthenticating } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && !isAuthenticating) {
      router.replace('/auth/login');
    }
  }, [isAuthenticated, isAuthenticating, router]);

  if (isAuthenticating) return <p>Loading...</p>;

  if (!isAuthenticated) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
