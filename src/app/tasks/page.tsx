'use client';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useState, ChangeEvent } from 'react';
import TaskList from '@/components/TaskList';
import AddTaskForm from '@/components/AddTaskForm';
import { TaskStatus } from '@/types/task';
import { useTask } from '@/hooks/useTask';
import { Spinner } from '@/components/Spinner';
import { useRouter } from 'next/navigation';

export default function TasksPage() {
  const router = useRouter();
  const { tasks, isLoading } = useTask();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<TaskStatus | ''>('');

  if (isLoading) return <Spinner />;

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (status: TaskStatus | '') => {
    setFilterStatus(status);
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('token');
      router.push('/auth/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const filteredTasks = tasks
    .filter((task) => (filterStatus ? task.status === filterStatus : true))
    .filter((task) =>
      searchTerm
        ? task.title.toLowerCase().includes(searchTerm.toLowerCase())
        : true
    );

  return (
    <ProtectedRoute>
      <div className="min-h-screen p-8 pb-20 bg-gray-900 text-gray-100 flex flex-col items-center">
        <div className="absolute top-4 right-4">
          <button
            onClick={handleLogout}
            className="group relative flex items-center justify-center p-2 rounded-full bg-red-600 hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-red-600/50"
          >
            <span className="absolute right-full mr-2 p-1 bg-gray-800 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Cerrar sesión
            </span>
            
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>

        <h1 className="text-3xl font-bold mb-8">Todo List</h1>

        <AddTaskForm />

        <div className="w-full max-w-2xl mt-8 mb-4 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Buscar tareas..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 rounded bg-gray-800 text-gray-100 placeholder-gray-400"
          />
          <select
            value={filterStatus}
            onChange={(e) =>
              handleFilterChange(e.target.value as TaskStatus | '')
            }
            className="px-4 py-2 rounded bg-gray-800 text-gray-100"
          >
            <option value="">Todas</option>
            <option value="OPEN">Pendiente</option>
            <option value="IN_PROGRESS">En Progreso</option>
            <option value="DONE">Completada</option>
          </select>
        </div>

        <TaskList tasks={filteredTasks} />
      </div>
    </ProtectedRoute>
  );
}