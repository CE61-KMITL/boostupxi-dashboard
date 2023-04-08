import axios from 'axios';
import { toast } from 'react-hot-toast';
import router from 'next/router';
import Cookies from 'js-cookie';

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
    const res = await axios.get(`/api/user/profile`);
    return res.data;
  }
};
