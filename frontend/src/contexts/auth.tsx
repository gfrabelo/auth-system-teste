import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextData {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = Cookies.get('auth_token');
    if (token) {
      // Carregar dados do usuário
      api.get('/users/me').then(response => {
        setUser(response.data);
      }).catch(() => {
        Cookies.remove('auth_token');
      });
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/signin', { email, password });
      const { token, user: userData } = response.data;
      
      Cookies.set('auth_token', token, { expires: 7 }); // Token expira em 7 dias
      setUser(userData);
      
      api.defaults.headers.Authorization = `Bearer ${token}`;
    } catch (error) {
      throw new Error('Falha na autenticação');
    }
  };

  const signOut = () => {
    setUser(null);
    Cookies.remove('auth_token');
    delete api.defaults.headers.Authorization;
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};