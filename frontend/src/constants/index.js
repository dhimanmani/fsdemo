export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Enterprise Portal';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'ep_auth_token',
  USER_DATA: 'ep_user_data',
  THEME: 'ep_theme',
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
  },
  DASHBOARD: {
    STATS: '/dashboard/stats',
    ACTIVITIES: '/dashboard/activities',
  },
};

export const THEME_OPTIONS = {
  LIGHT: 'light',
  DARK: 'dark',
};
