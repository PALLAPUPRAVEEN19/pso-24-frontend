import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8010',
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && !config.url.includes('/auth/login') && !config.url.includes('/auth/register')) {
      config.headers.Authorization = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
