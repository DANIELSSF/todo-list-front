'use client';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUpForm() {
  const { register } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const credentials = { email, password, fullName };
      await register(credentials);
      router.replace('/tasks');
    } catch (error) {
      console.error('Error durante el registro:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="px-8 py-6 mt-4 text-left bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Crear una cuenta
        </h3>
        <form onSubmit={handleForm}>
          <div className="mt-4">
            <div>
              <label
                className="block text-gray-700 dark:text-gray-200"
                htmlFor="fullName"
              >
                Nombre Completo
              </label>
              <input
                type="text"
                placeholder="Nombre Completo"
                id="fullName"
                name="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div className="mt-4">
              <label
                className="block text-gray-700 dark:text-gray-200"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div className="mt-4">
              <label
                className="block text-gray-700 dark:text-gray-200"
                htmlFor="password"
              >
                Contraseña
              </label>
              <input
                type="password"
                placeholder="Contraseña"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div className="flex items-baseline justify-between">
              <button
                type="submit"
                className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 dark:bg-blue-500 dark:hover:bg-blue-700"
              >
                Registrarse
              </button>
              <Link
                href="/auth/login"
                className="text-sm text-blue-600 mx-2 hover:underline dark:text-blue-400"
              >
                Ya estas registrado
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
