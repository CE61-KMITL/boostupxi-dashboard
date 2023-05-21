import { TaskForm } from './task';

export interface IUserProfile {
  _id: string;
  username: string;
  email: string;
  role: string;
  tasks: TaskForm[];
}

export interface IUpdateUser {
  username?: string;
  password?: string | undefined;
}
