import router from 'next/router';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { IUpdateUser } from '@/interface/user';

export const login = async (email: string, password: string) => {
  try {
    const res = await axios.post('/api/auth/login', { email, password });
    const token: string | null = res.headers.authorization;
    if (token) {
      Cookies.set('token', token);
      window.location.href = '/profile';
    }
  } catch (error) {
    toast.error('Unable to log in. Please try again.');
  }
};

export const logout = async () => {
  Cookies.remove('token');
  router.push('/');
  toast.success('Logged out successfully.');
};

export const getProfile = async () => {
  const token: string | undefined = Cookies.get('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response: AxiosResponse = await axios.get(`/api/users/profile`);
    return response.data;
  }
};

export const updateUser = async (id: string, data: IUpdateUser) => {
  try {
    const token: string | undefined = Cookies.get('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response: AxiosResponse = await axios.patch(
        `/api/users/${id}`,
        data,
      );
      toast.success('User updated successfully.');
      return response.data;
    }
  } catch (error) {
    toast.error('Unable to update user. Please try again.');
  }
};
