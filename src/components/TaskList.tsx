import { useTask } from '@/hooks/useTask';
import { ITask } from '@/types/task';
import { useRouter } from 'next/navigation';

interface TaskListProps {
  tasks: ITask[];
}

export default function TaskList({ tasks }: TaskListProps) {
  const { deleteTask } = useTask();
  const router = useRouter();

  const handleTaskClick = (taskId: string) => {
    router.push(`/tasks/${taskId}`);
  };

  return (
    <div className="w-full max-w-2xl space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex justify-between items-center p-4 bg-gray-800 rounded shadow cursor-pointer hover:bg-gray-700 transition-colors"
          onClick={() => handleTaskClick(task.id)}
        >
          <div>
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p className="text-gray-400 text-sm">{task.description}</p>
            <p className="text-gray-500 text-xs">Due: {task.dueDate}</p>
          </div>
          <div
            className="flex items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            {task.status === 'OPEN' && (
              <span className="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3">
                <span className="flex w-2.5 h-2.5 bg-teal-500 rounded-full me-1.5 flex-shrink-0"></span>
                Pendiente
              </span>
            )}
            {task.status === 'DONE' && (
              <span className="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3">
                <span className="flex w-2.5 h-2.5 bg-blue-500 rounded-full me-1.5 flex-shrink-0"></span>
                Completada
              </span>
            )}
            {task.status === 'IN_PROGRESS' && (
              <span className="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3">
                <span className="flex w-2.5 h-2.5 bg-yellow-500 rounded-full me-1.5 flex-shrink-0"></span>
                En Progreso
              </span>
            )}
            {task.status === 'EXPIRED' && (
              <span className="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3">
                <span className="flex w-2.5 h-2.5 bg-red-500 rounded-full me-1.5 flex-shrink-0"></span>
                Vencida
              </span>
            )}
            <button
              onClick={() => deleteTask(task.id)}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600 z-50"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
