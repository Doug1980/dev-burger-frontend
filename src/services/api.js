import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://dev-burger-backend.onrender.com',
});

api.interceptors.request.use((config) => {
  const userData = localStorage.getItem('devburguer:userData');
  const token = userData && JSON.parse(userData).token;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
