import { createContext, useState, useContext, useEffect } from 'react';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import Errors from '@/components/Errors';
import Loading from '@/components/Loading';

import { toast } from 'react-hot-toast';
import api from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
    await api
      .post('auth/login', { email, password })
      .then(async (res) => {
        const { token } = res.data;
        if (token) {
          setCookie('token', token, {
            maxAge: 86400,
            path: '*',
          });
          window.location.href = '/dashboard';
          toast.success('Logged in successfully');
        }
      })
      .catch((err) => {
        toast.error('Invalid credentials');
      });
  };

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = await getCookie('token');
      if (token) {
        await api
          .get('user/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setUser(res.data);
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      setLoading(false);
    }
    loadUserFromCookies();
  }, []);

  const logout = () => {
    deleteCookie('token');
    window.location.href = '/';
    toast.custom((t) => (
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
  } else if (
    router.pathname !== '/dashboard' &&
    router.pathname !== '/login' &&
    router.pathname !== '/upload-task'
  ) {
    if (typeof window !== 'undefined') {
      router.push('/404');
    }
  }
  return children;
};
