'use client';
import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { TaskContext, taskReducer } from './';
import { CreateTask, ITask, TaskFormData } from '@/types/task';
import {
  createTaskService,
  deleteTaskService,
  fetchTasksService,
  updateTaskService,
  updateTaskStatusService,
} from '@/services';

export interface TaskState {
  tasks: ITask[];
  isLoading: boolean;
}

const TASK_INITIAL_STATE: TaskState = {
  tasks: [],
  isLoading: true,
};

export const TaskProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, TASK_INITIAL_STATE);

  useEffect(() => {
    const fetchTasks = async () => {
      dispatch({ type: '[Task] - Checking' });
      try {
        const tasks = await fetchTasksService();
        dispatch({ type: '[Task] - Load', payload: tasks });
      } catch (error) {
        console.log(error);
        dispatch({ type: '[Task] - Check' });
      }
    };

    fetchTasks();
  }, []);

  const createTask = async (taskData: CreateTask) => {
    dispatch({ type: '[Task] - Checking' });
    try {
      const newTask = await createTaskService(taskData);
      dispatch({ type: '[Task] - Create', payload: newTask });
    } catch (error) {
      console.log(error);
      dispatch({ type: '[Task] - Check' });
    }
  };

  const updateTask = async (task: ITask) => {
    dispatch({ type: '[Task] - Checking' });
    try {
      const updatedTask = await updateTaskService(task.id, task);
      // dispatch({ type: '[Task] - updateState', payload: updatedTask });
    } catch (error) {
      console.log(error);
      dispatch({ type: '[Task] - Check' });
    }
  };

  const updateTaskState = async (id: string, data: TaskFormData) => {
    dispatch({ type: '[Task] - Checking' });
    try {
      const updatedTask = await updateTaskStatusService(id, data);
      console.log(updatedTask);
      dispatch({ type: '[Task] - update', payload: updatedTask });
    } catch (error) {
      console.log(error);
      dispatch({ type: '[Task] - Check' });
    }
  };

  const deleteTask = async (taskId: string) => {
    console.log(taskId);
    dispatch({ type: '[Task] - Checking' });
    try {
      await deleteTaskService(taskId);
      dispatch({ type: '[Task] - delete', payload: taskId });
    } catch (error) {
      console.log(error);
      dispatch({ type: '[Task] - Check' });
    }
  };

  return (
    <TaskContext.Provider
      value={{
        ...state,

        //Methods
        createTask,
        deleteTask,
        updateTask,
        updateTaskState,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
