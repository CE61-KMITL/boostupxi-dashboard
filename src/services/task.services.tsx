import { IData } from '@/interface/task';
import { IForm } from '@/interface/upload';
import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { ParsedUrlQuery } from 'querystring';

export interface TaskPageQuery extends ParsedUrlQuery {
  id: string;
}

export const getTasksData = async (page: number) => {
  const token: string | undefined = Cookies.get('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response: AxiosResponse = await axios.get(
      `/api/tasks?page=${page}&limit=10`,
    );
    return response.data;
  }
};

export const getTaskById = async ({ id }: TaskPageQuery) => {
  const token: string | undefined = Cookies.get('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response: AxiosResponse = await axios.get(`/api/tasks/${id}`);
    return response.data;
  }
};

export const createTask = async (data: IForm) => {
  const token: string | undefined = Cookies.get('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response: AxiosResponse = await axios.post(`/api/tasks/`, data);
    return response.data;
  }
};

export const UpdateTaskById = async (data: IForm, id: string) => {
  const token: string | undefined = Cookies.get('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response: AxiosResponse = await axios.patch(`/api/tasks/${id}`, data);
    return response.data;
  }
};

export const deleteTaskById = async (id: string) => {
  const token: string | undefined = Cookies.get('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response: AxiosResponse = await axios.delete(`/api/tasks/${id}`);
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
    const response: AxiosResponse = await axios.patch(
      `/api/tasks/${id}/audit`,
      data,
    );
    return response.data;
  }
};

export const adminHandleApproveReject = async ({
  id,
  data,
}: {
  id: string;
  data: { draft: boolean };
}) => {
  const token: string | undefined = Cookies.get('token');
  if (token) {
    const response: AxiosResponse = await axios.patch(
      `/api/tasks/${id}/draft`,
      data,
    );
    return response.data;
  }
};

export const createComment = async (id: string, data: { message: string }) => {
  const token: string | undefined = Cookies.get('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response: AxiosResponse = await axios.post(
      `/api/tasks/${id}/comment`,
      data,
    );
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
    const response: AxiosResponse = await axios.patch(
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
    const response: AxiosResponse = await axios.delete(
      `/api/tasks/${taskId}/comment/${id}`,
    );
    return response.data;
  }
};
