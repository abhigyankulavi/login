import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthState, LoginCredentials, User } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    // Check for existing session
    const authData = sessionStorage.getItem('authData');
    if (authData) {
      const user = JSON.parse(authData) as User;
      setState({ isAuthenticated: true, user, isLoading: false });
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (credentials.email && credentials.password) {
      const user: User = {
        email: credentials.email,
        type: credentials.userType,
        name: 'John Doe', // In a real app, this would come from the API
      };

      sessionStorage.setItem('authData', JSON.stringify(user));
      
      if (credentials.rememberMe) {
        localStorage.setItem('userEmail', credentials.email);
      } else {
        localStorage.removeItem('userEmail');
      }

      setState({ isAuthenticated: true, user, isLoading: false });
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    sessionStorage.removeItem('authData');
    setState({ isAuthenticated: false, user: null, isLoading: false });
  };

  if (state.isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};