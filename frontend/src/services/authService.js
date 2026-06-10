import apiClient from './api';

export const authService = {
  register: (data) => apiClient.post('/auth/register', data),
  verifyRegisterOtp: (data) => apiClient.post('/auth/verify-register-otp', data),
  login: (data) => apiClient.post('/auth/login', data),
  verifyLoginOtp: (data) => apiClient.post('/auth/verify-login-otp', data),
  getProfile: () => apiClient.get('/auth/profile'),
};
