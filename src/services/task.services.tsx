import axios from 'axios';
import { ParsedUrlQuery } from 'querystring';
import { IForm } from '@/interface/upload';
import { IData } from '@/interface/task';
import Cookies from 'js-cookie';

export interface TaskPageQuery extends ParsedUrlQuery {
  id: string;
}

export const getTasksData = async (page: number) => {
  const token: string | undefined = Cookies.get('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.get(`/api/tasks?page=${page}&limit=10`);
    return response.data;
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

export const createTask = async (data: IForm) => {
  const token: string | undefined = Cookies.get('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const res = await axios.post(`/api/tasks/`, data);
    return res.data;
  }
};

export const UpdateTaskById = async (data: IForm, id: string) => {
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
  data: IData;
}) => {
  const token: string | undefined = Cookies.get('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.patch(`/api/tasks/audit/${id}`, data);
    return response.data;
  }
};

export const createComment = async (id: string, data: { message: string }) => {
  const token: string | undefined = Cookies.get('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.post(`/api/tasks/${id}/comment`, data);
    return response.data;
  }
};

export const editComment = async (
  id: string,
  taskId: string,
  data: { message: string },
) => {
  const token: string | undefined = Cookies.get('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.patch(
      `/api/tasks/${taskId}/comment/${id}`,
      data,
    );
    return response.data;
  }
};

export const deleteComment = async (id: string, taskId: string) => {
  const token: string | undefined = Cookies.get('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.delete(`/api/tasks/${taskId}/comment/${id}`);
    return response.data;
  }
};
