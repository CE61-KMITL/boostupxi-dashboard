import { IAuthor } from './task';

export interface IComment {
  message: string;
  author: IAuthor;
  createdAt: string;
  updatedAt: string;
  taskId: string;
  id: string;
}

export interface IMessage {
  message: string;
}
