'use client';
import { createContext } from 'react';
import { TaskState } from './TaskProvider';
import { CreateTask, ITask, TaskFormData } from '@/types/task';

interface ContextProps extends TaskState {
  createTask: (taskData: CreateTask) => void;
  deleteTask: (id: string) => void;
  updateTask: (task: ITask) => void;
  updateTaskState: (id: string, status: TaskFormData) => void;
}

export const TaskContext = createContext({} as ContextProps);
