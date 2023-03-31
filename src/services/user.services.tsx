import axios from 'axios';
import { toast } from 'react-hot-toast';
import router from 'next/router';

export const login = async (email: string, password: string) => {
  try {
    const res = await axios.post('/api/auth/login', { email, password });
    const token: string | null = res.headers.authorization;
    if (token) {
      localStorage.setItem('token', token);
      window.location.href = '/profile';
    }
  } catch (error) {
    toast.error('Unable to log in. Please try again.');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  router.push('/');
  toast.custom(() => (
    <div
      className="rounded-lg bg-white p-4 shadow-lg"
      style={{ color: '#713200', border: '1px solid #713200' }}
    >
      <div className="flex">
        <p className="text-sm font-medium">Logout Succesfully 🖐️</p>
      </div>
    </div>
  ));
};

export const getUser = async () => {
  const token: string | null = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.get('/api/user/profile');
    return response.data;
  }
};
