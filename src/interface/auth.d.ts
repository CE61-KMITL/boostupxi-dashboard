export interface IAuthContext {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserProfile | null;
  // eslint-disable-next-line no-unused-vars
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuditor: boolean;
  isLogged: boolean;
}
