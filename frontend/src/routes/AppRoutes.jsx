import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '../constants';
import ProtectedRoute from './ProtectedRoute';

// Pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';

// Layout wrapper helpers
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

function LayoutWrapper({ children }) {
  return (
    <div className="flex flex-col min-h-screen gradient-bg">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route
        path={ROUTES.HOME}
        element={
          <LayoutWrapper>
            <Home />
          </LayoutWrapper>
        }
      />
      <Route
        path={ROUTES.LOGIN}
        element={
          <LayoutWrapper>
            <Login />
          </LayoutWrapper>
        }
      />
      <Route
        path={ROUTES.REGISTER}
        element={
          <LayoutWrapper>
            <Register />
          </LayoutWrapper>
        }
      />

      {/* Protected Pages */}
      <Route
        path={ROUTES.DASHBOARD}
        element={
          <ProtectedRoute>
            <LayoutWrapper>
              <Dashboard />
            </LayoutWrapper>
          </ProtectedRoute>
        }
      />

      {/* Fallback 404 Page */}
      <Route
        path="*"
        element={
          <LayoutWrapper>
            <NotFound />
          </LayoutWrapper>
        }
      />
    </Routes>
  );
}
