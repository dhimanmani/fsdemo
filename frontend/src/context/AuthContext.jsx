import React, { createContext, useState, useEffect, useCallback } from 'react';
import { STORAGE_KEYS } from '../constants';
import { storage } from '../utils';
import { authService } from '../services/api';
import toast from 'react-hot-toast';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = storage.get(STORAGE_KEYS.AUTH_TOKEN);
        const storedUser = storage.get(STORAGE_KEYS.USER_DATA);

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(storedUser);
          
          // Verify session in background
          try {
            const response = await authService.getMe();
            if (response.user) {
              setUser(response.user);
              storage.set(STORAGE_KEYS.USER_DATA, response.user);
            }
          } catch (error) {
            console.warn('[AuthContext] Session expired on backend, logging out.');
            handleLogout();
          }
        }
      } catch (err) {
        console.error('[AuthContext] Error initializing authentication:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen to unauthorized/expired API calls
    const handleExpiredSession = () => {
      handleLogout();
      toast.error('Your session has expired. Please sign in again.');
    };

    window.addEventListener('auth_session_expired', handleExpiredSession);
    return () => {
      window.removeEventListener('auth_session_expired', handleExpiredSession);
    };
  }, []);

  // Login handler
  const handleLogin = async (credentials) => {
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);
      
      setUser(response.user);
      setToken(response.token);
      
      storage.set(STORAGE_KEYS.AUTH_TOKEN, response.token);
      storage.set(STORAGE_KEYS.USER_DATA, response.user);
      
      toast.success(`Welcome back, ${response.user.name}!`);
      return response.user;
    } catch (error) {
      toast.error(error.message || 'Login failed. Please check your credentials.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register handler
  const handleRegister = async (userData) => {
    setIsLoading(true);
    try {
      const response = await authService.register(userData);
      
      setUser(response.user);
      setToken(response.token);
      
      storage.set(STORAGE_KEYS.AUTH_TOKEN, response.token);
      storage.set(STORAGE_KEYS.USER_DATA, response.user);
      
      toast.success(`Account created! Welcome, ${response.user.name}!`);
      return response.user;
    } catch (error) {
      toast.error(error.message || 'Registration failed.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout handler
  const handleLogout = useCallback(() => {
    setUser(null);
    setToken(null);
    storage.remove(STORAGE_KEYS.AUTH_TOKEN);
    storage.remove(STORAGE_KEYS.USER_DATA);
    toast.success('Signed out successfully.');
  }, []);

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
