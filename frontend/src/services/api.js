import axios from 'axios';
import { getToken, clearAuthStorage } from '../utils/tokenStorage';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const customError = {
      message: 'An unexpected network error occurred.',
      status: error.response?.status || 500,
      originalError: error,
    };

    if (error.response) {
      customError.message =
        error.response.data?.message ||
        `Request failed with status ${error.response.status}`;

      if (error.response.status === 401) {
        clearAuthStorage();
        window.dispatchEvent(new Event('auth_session_expired'));
      }
    } else if (error.request) {
      customError.message =
        'No response from server. Please verify your internet connection.';
    }

    return Promise.reject(customError);
  }
);

export default apiClient;
