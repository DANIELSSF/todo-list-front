import { useContext } from 'react';

import { TaskContext } from '@/context/tasks';

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask debe ser usado dentro de un TaskProvider');
  }
  return context;
};
