export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  EXPIRED = 'EXPIRED',
}

export interface CreateTask {
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
}

export interface Task {
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
  createAt: string;
  updateAt: string;
  isActive: boolean;
}

export interface ITask extends Task {
  id: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  status: string;
  dueDate: string;
}

export interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: {
    title: string;
    description: string;
    status: string;
    dueDate: string;
    createAt: string;
    updateAt: string;
    isActive: boolean;
  };
}
