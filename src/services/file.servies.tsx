import axios from 'axios';
import { IFiles } from '@/interface/task';
import Cookies from 'js-cookie';

export const uploadFiles = async (files: File[]) => {
  const token: string | undefined = Cookies.get('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    const response = await axios.post(`/api/files`, formData);
    return response.data;
  }
};

export const deleteFiles = async (files: IFiles) => {
  const token: string | undefined = Cookies.get('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.delete(`/api/files`, { data: [files] });
    return response.data;
  }
};
