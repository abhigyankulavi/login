import { useState, useCallback } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    email: string;
    type: 'patient' | 'admin' | null;
  } | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });

  const login = useCallback(async (email: string, password: string, userType: 'patient' | 'admin') => {
    // In a real app, this would be an API call
    // Simulating an API call with basic validation
    if (email && password) {
      // Store auth data in sessionStorage (more secure than localStorage for auth)
      const authData = {
        email,
        type: userType,
        token: 'mock-jwt-token',
      };
      
      sessionStorage.setItem('authData', JSON.stringify(authData));
      
      setAuthState({
        isAuthenticated: true,
        user: {
          email,
          type: userType,
        },
      });

      return { success: true };
    }
    
    throw new Error('Invalid credentials');
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem('authData');
    setAuthState({
      isAuthenticated: false,
      user: null,
    });
  }, []);

  return {
    ...authState,
    login,
    logout,
  };
};