import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loader from '../components/ui/Loader';
import { ROUTES } from '../constants';

/**
 * Route protection wrapper. Redirects to login if session is absent.
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <Loader fullScreen />;
  }

  if (!isAuthenticated) {
    // Preserve requested page so they return there after authenticating
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  // Render direct children if provided, or Outlet for nested routing
  return children ? children : <Outlet />;
}
