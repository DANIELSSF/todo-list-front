import { useTask } from '@/hooks/useTask';
import { TaskStatus } from '@/types/task';
import { useState } from 'react';

export default function AddTaskForm() {
  const { createTask } = useTask();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');

  const handleSubmit = () => {
    if (title && description && dueDate) {
      createTask({ description, dueDate, title, status: TaskStatus.OPEN });
      setTitle('');
      setDescription('');
      setDueDate('');
    }
  };

  return (
    <div className="w-full max-w-2xl p-4 bg-gray-800 rounded">
      <h2 className="text-xl font-semibold mb-4">Añadir Tarea</h2>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-2 px-4 py-2 rounded bg-gray-700 text-gray-100 placeholder-gray-400"
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full mb-2 px-4 py-2 rounded bg-gray-700 text-gray-100 placeholder-gray-400"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full mb-4 px-4 py-2 rounded bg-gray-700 text-gray-100"
      />
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Añadir Tarea
      </button>
    </div>
  );
}
