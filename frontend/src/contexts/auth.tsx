import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  birthDate: string;
}

interface SignUpData {
  name: string;
  email: string;
  password: string;
  birthDate: string;
}

interface AuthContextData {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('auth_token');
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      // Carregar dados do usuário
      api.get('/auth/me')
        .then(response => {
          setUser(response.data.user);
        })
        .catch(() => {
          Cookies.remove('auth_token');
          delete api.defaults.headers.Authorization;
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user: userData } = response.data;
      
      Cookies.set('auth_token', token, { expires: 7 }); // Token expira em 7 dias
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setUser(userData);
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (data: SignUpData) => {
    try {
      await api.post('/auth/register', data);
      // Não fazemos login automático após registro
      // O usuário precisa fazer login explicitamente
    } catch (error) {
      throw error;
    }
  };

  const signOut = () => {
    setUser(null);
    Cookies.remove('auth_token');
    delete api.defaults.headers.Authorization;
    // Opcional: redirecionar para página de login
    window.location.href = '/signin';
  };

  if (loading) {
    return <div>Carregando...</div>; // Ou seu componente de loading
  }

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        signIn, 
        signUp, 
        signOut, 
        isAuthenticated: !!user,
        loading 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};