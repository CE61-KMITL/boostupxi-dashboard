import React from 'react';
import { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Errors, Loading } from '@/components';

import { toast } from 'react-hot-toast';

import axios from 'axios';

const AuthContext = createContext({});

export const AuthProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  const router = useRouter();

  const login = async (email: string, password: string) => {
    await axios
      .post('/api/auth/login', { email, password })
      .then((res) => {
        const { token } = res.data;
        if (token) {
          localStorage.setItem('token', token);
          window.location.href = '/dashboard';
        }
      })
      .catch(() => {
        toast.error('Invalid credentials');
      });
  };

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/');
    toast.custom(() => (
      <div
        className="rounded-lg bg-white p-4 shadow-lg"
        style={{
          color: '#713200',
          border: '1px solid #713200',
        }}
      >
        <div className="flex">
          <p className="text-sm font-medium">Good bye! 🖐️</p>
        </div>
      </div>
    ));
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get('/api/user/profile').then((res) => {
        setUser(res.data);
      });
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: user, user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const ProtectRoute = ({ children }: any) => {
  const { isAuthenticated, loading }: any = useAuth();
  const router = useRouter();

  if (loading) {
    return <Loading />;
  } else if (
    !isAuthenticated &&
    router.pathname !== '/' &&
    router.pathname !== '/login' &&
    router.pathname !== '/404'
  ) {
    return (
      <Errors
        status={401}
        title="No Authorized"
        description="Sorry You need to login First."
      />
    );
  }

  return children;
};
