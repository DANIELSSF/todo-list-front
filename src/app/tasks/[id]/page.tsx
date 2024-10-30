'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/services/api';
import { Spinner } from '@/components/Spinner';
import { CalendarDays, Clock, Edit3, ArrowLeft, Trash2 } from 'lucide-react';
import { useTask } from '@/hooks/useTask';
import EditTaskModal from '@/components/EditTaskModal';

interface Task {
  userId: string;
  task: {
    id: string;
    title: string;
    description: string;
    status: string;
    dueDate: string;
    createAt: string;
    updateAt: string;
    isActive: boolean;
  };
}

export default function TaskPage() {
  const { deleteTask } = useTask();

  const params = useParams();
  const router = useRouter();
  const taskId = params.id as string;

  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const loadTask = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          window.location.href = '/auth/login';
          return;
        }

        const response = await api.get(`/task/${taskId}`);
        setTask(response.data);
        setError(null);
      } catch (err) {
        setError('Error al cargar la tarea');
        console.error('Error loading task:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadTask();
  }, [taskId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleDelete = async (taskId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      try {
        await deleteTask(taskId);
        router.push('/tasks');
      } catch (error) {
        console.error('Error al eliminar la tarea:', error);
      }
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen p-4 bg-gray-900 flex items-center justify-center">
        <div className="p-4 bg-red-500/10 text-red-500 rounded-lg max-w-md w-full text-center">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen p-4 bg-gray-900 flex items-center justify-center">
        <div className="p-4 text-gray-400 text-center">
          <p>No se encontró la tarea</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-900 text-gray-100">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.push('/tasks')}
          className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Volver a tareas</span>
        </button>

        <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          {showModal && (
            <EditTaskModal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              task={task.task}
            />
          )}
          <div className="p-6 border-b border-gray-700">
            <div className="flex justify-between items-start gap-4">
              <h1 className="text-2xl font-bold text-white">
                {task.task.title}
              </h1>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowModal(true)}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Edit3 size={20} />
                </button>
                <button
                  onClick={() => handleDelete(taskId)}
                  className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>

            <div className="mt-4">
              {task.task.status === 'OPEN' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-500/10 text-teal-500">
                  <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                  Pendiente
                </span>
              )}
              {task.task.status === 'DONE' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500/10 text-blue-500">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Completada
                </span>
              )}
              {task.task.status === 'IN_PROGRESS' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-500/10 text-yellow-500">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                  En Progreso
                </span>
              )}
              {task.task.status === 'EXPIRED' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-500/10 text-red-500">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                  Vencida
                </span>
              )}
            </div>
          </div>

          <div className="p-6">
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300">{task.task.description}</p>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <CalendarDays size={20} />
                  <span>Fecha de vencimiento</span>
                </div>
                <p className="text-white">{formatDate(task.task.dueDate)}</p>
              </div>

              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <Clock size={20} />
                  <span>Última actualización</span>
                </div>
                <p className="text-white">{formatDate(task.task.updateAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
