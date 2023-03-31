import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Errors, Loading } from '@/components';
import { login, logout, getProfile } from '@/services/user.services';

const AuthContext = createContext({});

export const AuthProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getProfile();
        setUser(response);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const ProtectRoute = ({ children }: any) => {
  const { isAuthenticated, isLoading }: any = useAuth();
  const router = useRouter();

  if (isLoading) {
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
