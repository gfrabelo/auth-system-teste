import axios from 'axios';
import Cookies from 'js-cookie';

export const api = axios.create({
  baseURL: 'http://localhost:5000',
});

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use((config) => {
  const token = Cookies.get('auth_token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Limpar cookies e redirecionar para login
      Cookies.remove('auth_token');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export default api;