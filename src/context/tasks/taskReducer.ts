import { ITask, TaskStatus } from '@/types/task';
import { TaskState } from './';

type TaskActionType =
  | { type: '[Task] - Load'; payload: ITask[] }
  | { type: '[Task] - Create'; payload: ITask }
  | { type: '[Task] - Checking' }
  | { type: '[Task] - Check' }
  | { type: '[Task] - delete'; payload: string }
  | {
      type: '[Task] - updateState';
      payload: { id: string; status: TaskStatus };
    }
  | {
      type: '[Task] - update';
      payload: ITask;
    };

export const taskReducer = (
  state: TaskState,
  action: TaskActionType
): TaskState => {
  switch (action.type) {
    case '[Task] - Load':
      return {
        ...state,
        isLoading: false,
        tasks: action.payload,
      };
    case '[Task] - Create':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        isLoading: false,
      };
    case '[Task] - Checking':
      return {
        ...state,
        isLoading: true,
      };
    case '[Task] - Check':
      return {
        ...state,
        isLoading: false,
      };
    case '[Task] - delete':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
        isLoading: false,
      };
    case '[Task] - updateState':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, status: action.payload.status }
            : task
        ),
        isLoading: false,
      };
    case '[Task] - update':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
        isLoading: false,
      };
    default:
      return state;
  }
};
