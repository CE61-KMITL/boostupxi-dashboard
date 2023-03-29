import React from 'react';
import { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Errors, Loading } from '@/components';
import axios from 'axios';
import { login, logout } from '@/services/user.services';

const AuthContext = createContext({});

export const AuthProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem('token');
      try {
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await axios.get('/api/user/profile');
          setUser(response.data);
        }
      } catch (error) {
        logout();
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, loading, login, logout }}
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
  }

  if (
    !isAuthenticated &&
    router.pathname !== '/' &&
    router.pathname !== '/login'
  ) {
    return (
      <Errors
        status={401}
        title="Unauthorized Access"
        description={`Sorry, you don't have permission to access this page. Please log in to view this content.`}
      />
    );
  }

  return children;
};
