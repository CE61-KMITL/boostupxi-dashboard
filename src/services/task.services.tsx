import axios from 'axios';

import { ParsedUrlQuery } from 'querystring';

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
    const res = await axios.get(`/api/tasks/${id}`);
    return res.data;
  }
};
