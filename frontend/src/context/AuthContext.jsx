import React, { createContext, useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { authService } from '../services/authService';
import {
  getToken,
  getUser,
  setToken,
  setUser,
  clearAuthStorage,
} from '../utils/tokenStorage';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [token, setTokenState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const saveSession = useCallback((sessionToken, sessionUser) => {
    setTokenState(sessionToken);
    setUserState(sessionUser);
    setToken(sessionToken);
    setUser(sessionUser);
  }, []);

  const handleLogout = useCallback((showToast = true) => {
    setUserState(null);
    setTokenState(null);
    clearAuthStorage();
    if (showToast) {
      toast.success('Signed out successfully.');
    }
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = getToken();
        const storedUser = getUser();

        if (storedToken && storedUser) {
          setTokenState(storedToken);
          setUserState(storedUser);

          try {
            const response = await authService.getProfile();
            if (response.data?.user) {
              saveSession(storedToken, response.data.user);
            }
          } catch (error) {
            console.warn('[AuthContext] Session expired, logging out.');
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

    const handleExpiredSession = () => {
      handleLogout(false);
      toast.error('Your session has expired. Please sign in again.');
    };

    window.addEventListener('auth_session_expired', handleExpiredSession);
    return () => {
      window.removeEventListener('auth_session_expired', handleExpiredSession);
    };
  }, [handleLogout, saveSession]);

  const register = async (userData) => {
    const response = await authService.register({
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });
    toast.success(response.message || 'OTP sent to your email.');
    return response.data;
  };

  const verifyRegisterOtp = async ({ email, otp }) => {
    const response = await authService.verifyRegisterOtp({ email, otp });
    saveSession(response.data.token, response.data.user);
    toast.success(response.message || 'Email verified successfully.');
    return response.data.user;
  };

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    toast.success(response.message || 'Login OTP sent to your email.');
    return response.data;
  };

  const verifyLoginOtp = async ({ email, otp }) => {
    const response = await authService.verifyLoginOtp({ email, otp });
    saveSession(response.data.token, response.data.user);
    toast.success(response.message || 'Login successful.');
    return response.data.user;
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    register,
    verifyRegisterOtp,
    login,
    verifyLoginOtp,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
