import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_APP_BASE_URL}/v1`
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response.status === 401) {
      localStorage.removeItem('ACCESS_TOKEN');
      window.location.href = '/login';
    }
    throw error;
  }
);
