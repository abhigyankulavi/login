export type UserType = 'patient' | 'admin';

export interface User {
  email: string;
  type: UserType;
  name?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  userType: UserType;
  rememberMe: boolean;
}