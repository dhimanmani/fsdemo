import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, LogIn, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import useAuth from '../hooks/useAuth';
import { ROUTES } from '../constants';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function Login() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirect path from route state, defaulting to dashboard
  const from = location.state?.from?.pathname || ROUTES.DASHBOARD;

  // Auto-redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.DASHBOARD, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      await login(data);
      navigate(from, { replace: true });
    } catch (err) {
      console.error('[Login] Submission error:', err);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-500/10 rounded-full blur-[80px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass-card p-8 rounded-3xl flex flex-col gap-6">
          {/* Header */}
          <div className="text-center flex flex-col gap-2">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-brand-500/25">
              ✨
            </div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mt-2">
              Welcome Back
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Sign in to manage your enterprise dashboard portal.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="admin@example.com"
              icon={Mail}
              error={errors.email}
              {...register('email', {
                required: 'Email address is required.',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address.',
                },
              })}
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              error={errors.password}
              {...register('password', {
                required: 'Password is required.',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters.',
                },
              })}
            />

            {/* Quick Demo Assist */}
            <div className="p-3 rounded-xl bg-brand-50/50 dark:bg-brand-950/10 border border-brand-100/50 dark:border-brand-900/10 text-[11px] text-gray-500 dark:text-gray-400">
              <span className="font-bold text-brand-600 dark:text-brand-400">Demo Account: </span>
              Use <code className="bg-white dark:bg-dark-card px-1 py-0.5 rounded border">admin@example.com</code> and{' '}
              <code className="bg-white dark:bg-dark-card px-1 py-0.5 rounded border">Password123</code> for testing.
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-2"
              isLoading={isLoading}
              icon={LogIn}
            >
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <div className="h-px bg-gray-200 dark:bg-dark-border" />

          {/* Footer Navigation */}
          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            Don't have an account?{' '}
            <Link to={ROUTES.REGISTER} className="font-bold text-brand-600 dark:text-brand-400 hover:underline">
              Create one now
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
