import axios from 'axios';
import { ParsedUrlQuery } from 'querystring';
import { FormType } from '@/interface/upload';
import Cookies from 'js-cookie';

export interface TaskPageQuery extends ParsedUrlQuery {
  id: string;
}

export const getTasksData = async () => {
  try {
    const token: string | undefined = Cookies.get('token');
    if (token) {
      const response = await fetch('/api/tasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const getTaskById = async ({ id }: TaskPageQuery) => {
  const token: string | undefined = Cookies.get('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.get(`/api/tasks/${id}`);
    return response.data;
  }
};

export const createTask = async (data: FormType) => {
  const token: string | undefined = Cookies.get('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const res = await axios.post(`/api/tasks/`, data);
    return res.data;
  }
};

export const UpdateTaskById = async (data: FormType, id: string) => {
  const token: string | undefined = Cookies.get('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const res = await axios.patch(`/api/tasks/${id}`, data);
    return res.data;
  }
};

export const deleteTaskById = async (id: string) => {
  const token: string | undefined = Cookies.get('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.delete(`/api/tasks/${id}`);
    return response.data;
  }
};

export const handleApproveReject = async ({
  id,
  data,
}: {
  id: string;
  data: any;
}) => {
  const token: string | undefined = Cookies.get('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.patch(`/api/tasks/audit/${id}`, data);
    return response.data;
  }
};
