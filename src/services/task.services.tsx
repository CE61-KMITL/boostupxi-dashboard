import axios from 'axios';
import { ParsedUrlQuery } from 'querystring';
import { FormType } from '@/interface/upload';

export interface TaskPageQuery extends ParsedUrlQuery {
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

export const UpdateTaskById = async (data: FormType, id: string) => {
  const token: string | null = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const res = await axios.patch(`/api/tasks/${id}`, data);
    return res.data;
  }
};

export const handleApproveReject = async ({
  id,
  data,
}: {
  id: string;
  data: any;
}) => {
  const token: string | null = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.patch(`/api/tasks/audit/${id}`, data);
    return response.data;
  }
};
