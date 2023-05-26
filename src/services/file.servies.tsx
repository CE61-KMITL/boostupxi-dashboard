import { IFiles } from '@/interface/task';
import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

export const uploadFiles = async (files: File[]) => {
  const token: string | undefined = Cookies.get('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const formDatax: FormData = new FormData();
    files.forEach((file) => {
      formDatax.append('files', file as Blob, file.name);
    });
    try {
      const response: AxiosResponse = await axios.post(
        `/api/files`,
        formDatax,
        {
          headers: {
            'Content-Type': 'application/form-data',
          },
        },
      );

      return response.data;
    } catch (error) {
      return;
    }
  }
};

export const deleteFiles = async (files: IFiles[]) => {
  const token: string | undefined = Cookies.get('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response: AxiosResponse = await axios.delete(`/api/files`, {
      data: files,
    });
    return response.data;
  }
};
