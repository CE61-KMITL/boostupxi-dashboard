import { TaskForm } from './task';

export interface UserProfile {
  _id: string;
  username: string;
  email: string;
  role: string;
  tasks: TaskForm[];
}
