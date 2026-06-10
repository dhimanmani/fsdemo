export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Enterprise Portal';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  VERIFY_REGISTER_OTP: '/verify-register-otp',
  VERIFY_LOGIN_OTP: '/verify-login-otp',
  DASHBOARD: '/dashboard',
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'ep_auth_token',
  USER_DATA: 'ep_user_data',
  THEME: 'ep_theme',
};

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    VERIFY_REGISTER_OTP: '/auth/verify-register-otp',
    LOGIN: '/auth/login',
    VERIFY_LOGIN_OTP: '/auth/verify-login-otp',
    PROFILE: '/auth/profile',
  },
};

export const THEME_OPTIONS = {
  LIGHT: 'light',
  DARK: 'dark',
};
