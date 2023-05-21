import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import { NextRouter, useRouter } from 'next/router';
import { Errors, LoadingFile } from '@/components';
import { IUserProfile } from '@/interface/user';
import { IAuthContext } from '@/interface/auth';
import { login, logout, getProfile } from '@/services/user.services';

const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  isLoading: false,
  user: null,
  login: async () => {},
  logout: async () => {},
  isAuditor: false,
  isAdmin: false,
  isLogged: false,
  setUser: () => {},
});

interface ChildrenProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isAuditor, setIsAuditor] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [user, setUser] = useState<IUserProfile | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getProfile();
        if (
          response.role === 'auditor' ||
          response.role === 'staff' ||
          response.role === 'admin'
        ) {
          setUser(response);
          setIsLogged(true);
          setIsLoading(false);
        } else {
          setUser(null);
          setIsLogged(false);
          setIsLoading(false);
        }
        response.role === 'auditor' ? setIsAuditor(true) : setIsAuditor(false);
        response.role === 'admin' ? setIsAdmin(true) : setIsAdmin(false);
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
        isAdmin,
        isLogged,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

const ProtectRoute = ({ children }: ChildrenProps) => {
  const { isAuthenticated, isLoading, isLogged } = useAuth();
  const router: NextRouter = useRouter();

  if (isLoading) {
    return <LoadingFile />;
  }

  if (
    !isAuthenticated &&
    !isLogged &&
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
