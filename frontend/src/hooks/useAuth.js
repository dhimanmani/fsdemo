import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Access the active authentication session and commands.
 * @returns {{
 *   user: any,
 *   token: string|null,
 *   isAuthenticated: boolean,
 *   isLoading: boolean,
 *   login: Function,
 *   register: Function,
 *   logout: Function
 * }}
 */
export default function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be consumed within an <AuthProvider> wrapping the tree.');
  }
  return context;
}
