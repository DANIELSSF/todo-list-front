import {
  CreateTask,
  ITask,
  Task,
  TaskFormData,
} from '@/types/task';
import api from './api';

export const fetchTasksService = async (): Promise<ITask[]> => {
  const resp = await api.get('task');
  return resp.data.tasks;
};

export const createTaskService = async (
  taskData: CreateTask
): Promise<ITask> => {
  const resp = await api.post('task', taskData);
  return resp.data;
};

export const updateTaskService = async (
  id: string,
  taskData: TaskFormData
): Promise<Task> => {
  console.log('taskData', taskData);
  console.log('id', id);
  const resp = await api.put(`task/${id}`, taskData);
  return resp.data;
};

export const updateTaskStatusService = async (
  id: string,
  data: TaskFormData
): Promise<ITask> => {
  const resp = await api.put(`task/${id}`, data);
  return resp.data;
};

export const deleteTaskService = async (id: string): Promise<ITask> => {
  const resp = await api.delete(`/task/${id}`);
  return resp.data;
};
