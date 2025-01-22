import api from './api';
import Cookies from 'js-cookie';

export const authService = {
  register: async (data: {
    name: string;
    email: string;
    password: string;
    birthDate: string;
  }) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await api.post('/auth/login', data);
    if (response.data.token) {
      Cookies.set('auth_token', response.data.token);
    }
    return response.data;
  },

  logout: () => {
    Cookies.remove('auth_token');
  }
};