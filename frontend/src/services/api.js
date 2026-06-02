import axios from 'axios';
import { STORAGE_KEYS } from '../constants';
import { storage } from '../utils';

// Create standard API client instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Interceptor: Attach authentication token to outgoing requests
apiClient.interceptors.request.use(
  (config) => {
    const token = storage.get(STORAGE_KEYS.AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor: Global response handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const customError = {
      message: 'An unexpected network error occurred.',
      status: error.response?.status || 500,
      originalError: error,
    };

    if (error.response) {
      // Server responded with non-2xx status
      customError.message = error.response.data?.message || `Request failed with status ${error.response.status}`;
      
      // Auto logout if session token is expired / unauthorized
      if (error.response.status === 401) {
        storage.remove(STORAGE_KEYS.AUTH_TOKEN);
        storage.remove(STORAGE_KEYS.USER_DATA);
        // Dispatch custom event to let app trigger route changes if needed
        window.dispatchEvent(new Event('auth_session_expired'));
      }
    } else if (error.request) {
      // Request made but no response received
      customError.message = 'No response from server. Please verify your internet connection.';
    }

    return Promise.reject(customError);
  }
);

/**
 * PRODUCTION MOCK API SERVICES
 * Since there might not be a running backend immediately, we provide high-quality simulated methods
 * that mimic API endpoints with realistic delays, making the application fully interactive and robust!
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  login: async (credentials) => {
    console.log('[API] Request: Login', credentials);
    await delay(1200); // Simulate network latency
    
    // Simple mock logic for demonstration
    if (credentials.email === 'admin@example.com' && credentials.password === 'Password123') {
      const mockUser = {
        id: 'usr_1',
        name: 'Alex Carter',
        email: credentials.email,
        role: 'Administrator',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop',
        createdAt: new Date().toISOString(),
      };
      const mockToken = 'mock_jwt_token_payload_alex_carter';
      return { user: mockUser, token: mockToken };
    }
    
    // Default valid mock for other inputs to allow easy testing, unless specific invalid fields
    if (credentials.password.length < 6) {
      throw { message: 'Password must be at least 6 characters.', status: 400 };
    }

    const mockUser = {
      id: 'usr_rand',
      name: credentials.email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      email: credentials.email,
      role: 'Member',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&auto=format&fit=crop',
      createdAt: new Date().toISOString(),
    };
    const mockToken = 'mock_jwt_token_payload_user_generic';
    return { user: mockUser, token: mockToken };
  },

  register: async (userData) => {
    console.log('[API] Request: Register', userData);
    await delay(1500); // Simulate network latency
    
    if (userData.password !== userData.confirmPassword) {
      throw { message: 'Passwords do not match.', status: 400 };
    }

    const mockUser = {
      id: 'usr_new',
      name: userData.name,
      email: userData.email,
      role: 'Member',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=256&auto=format&fit=crop',
      createdAt: new Date().toISOString(),
    };
    const mockToken = 'mock_jwt_token_payload_new_user';
    return { user: mockUser, token: mockToken };
  },

  getMe: async () => {
    await delay(500);
    const token = storage.get(STORAGE_KEYS.AUTH_TOKEN);
    const cachedUser = storage.get(STORAGE_KEYS.USER_DATA);
    
    if (!token || !cachedUser) {
      throw { message: 'Unauthorized session.', status: 401 };
    }
    
    return { user: cachedUser };
  }
};

export const dashboardService = {
  getStats: async () => {
    await delay(1000);
    return {
      activeUsers: 1420,
      monthlyRevenue: 28450,
      serverUptime: '99.98%',
      conversionRate: '3.42%',
      trends: {
        users: '+12.5%',
        revenue: '+8.3%',
        uptime: '+0.02%',
        conversion: '+1.1%'
      }
    };
  },
  
  getActivities: async () => {
    await delay(800);
    return [
      { id: 'act_1', user: 'Liam Johnson', action: 'Created a new workspace project', time: new Date(Date.now() - 1000 * 60 * 15).toISOString(), type: 'project' },
      { id: 'act_2', user: 'Sophia Miller', action: 'Updated security permissions', time: new Date(Date.now() - 1000 * 60 * 45).toISOString(), type: 'security' },
      { id: 'act_3', user: 'James Davis', action: 'Integrated Slack notifications API', time: new Date(Date.now() - 1000 * 60 * 120).toISOString(), type: 'integration' },
      { id: 'act_4', user: 'Olivia Brown', action: 'Upgraded team subscription to Business', time: new Date(Date.now() - 1000 * 60 * 240).toISOString(), type: 'billing' }
    ];
  }
};

export default apiClient;
