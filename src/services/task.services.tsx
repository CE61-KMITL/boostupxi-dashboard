import axios from 'axios';

import { ParsedUrlQuery } from 'querystring';
import { FormType } from '@/interface/upload';
interface TaskPageQuery extends ParsedUrlQuery {
  id: string;
}

export const getTasksData = async () => {
  const token: string | null = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.get(`/api/tasks`);
    return response.data;
  }
};

export const getTaskById = async ({ id }: TaskPageQuery) => {
  const token: string | null = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.get(`/api/tasks/${id}`);
    return response.data;
  }
};

export const createTask = async (data: FormType) => {
  const token: string | null = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const res = await axios.post(`/api/tasks/`, data);
    return res.data;
  }
};

//TODO MOCK UP MUST CHANGE THIS CODE================================================================
// TODO MOCK UP MUST CHANGE THIS CODE================================================================
import TaskList from '../constants/task';

export const getTaskbyUserId = async (id: string) => {
  id = id;
  return TaskList as [];
};
//=========================================
