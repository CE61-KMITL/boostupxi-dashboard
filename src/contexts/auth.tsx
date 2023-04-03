import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import { NextRouter, useRouter } from 'next/router';
import { Errors, Loading } from '@/components';
import { login, logout, getProfile } from '@/services/user.services';
import { IUserProfile } from '@/interface/user';
import { IAuthContext } from '@/interface/auth';

const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  isLoading: false,
  user: null,
  login: async () => {},
  logout: async () => {},
  isAuditor: false,
});

interface ChildrenProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuditor, setIsAuditor] = useState<boolean>(false);
  const [user, setUser] = useState<IUserProfile | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getProfile();
        setUser(response);
        setIsLoading(false);
        response.role === 'auditor' ? setIsAuditor(true) : setIsAuditor(false);
      } catch (err) {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        login,
        logout,
        isAuditor,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

const ProtectRoute = ({ children }: ChildrenProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router: NextRouter = useRouter();

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

  return <>{children}</>;
};

export default ProtectRoute;
