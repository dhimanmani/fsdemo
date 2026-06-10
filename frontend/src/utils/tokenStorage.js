import { STORAGE_KEYS } from '../constants';
import { storage } from './index';

export const getToken = () => storage.get(STORAGE_KEYS.AUTH_TOKEN);

export const setToken = (token) => storage.set(STORAGE_KEYS.AUTH_TOKEN, token);

export const removeToken = () => storage.remove(STORAGE_KEYS.AUTH_TOKEN);

export const getUser = () => storage.get(STORAGE_KEYS.USER_DATA);

export const setUser = (user) => storage.set(STORAGE_KEYS.USER_DATA, user);

export const removeUser = () => storage.remove(STORAGE_KEYS.USER_DATA);

export const clearAuthStorage = () => {
  removeToken();
  removeUser();
};
