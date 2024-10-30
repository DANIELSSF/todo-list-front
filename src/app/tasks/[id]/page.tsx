'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Spinner } from '@/components/Spinner';
import { CalendarDays, Clock, Edit3, ArrowLeft, Trash2 } from 'lucide-react';
import { useTask } from '@/hooks/useTask';
import EditTaskModal from '@/components/EditTaskModal';


export default function TaskPage() {
  const { deleteTask } = useTask();

  const params = useParams();
  const router = useRouter();
  const taskId = params.id as string;

  const [showModal, setShowModal] = useState<boolean>(false);

  const {tasks, isLoading}= useTask();

  const task = tasks.find((task) => task.id === taskId);

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
              task={task}
            />
          )}
          <div className="p-6 border-b border-gray-700">
            <div className="flex justify-between items-start gap-4">
              <h1 className="text-2xl font-bold text-white">
                {task.title}
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
              {task.status === 'OPEN' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-500/10 text-teal-500">
                  <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                  Pendiente
                </span>
              )}
              {task.status === 'DONE' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500/10 text-blue-500">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Completada
                </span>
              )}
              {task.status === 'IN_PROGRESS' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-500/10 text-yellow-500">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                  En Progreso
                </span>
              )}
              {task.status === 'EXPIRED' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-500/10 text-red-500">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                  Vencida
                </span>
              )}
            </div>
          </div>

          <div className="p-6">
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300">{task.description}</p>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <CalendarDays size={20} />
                  <span>Fecha de vencimiento</span>
                </div>
                <p className="text-white">{formatDate(task.dueDate)}</p>
              </div>

              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <Clock size={20} />
                  <span>Última actualización</span>
                </div>
                <p className="text-white">{formatDate(task.updateAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
