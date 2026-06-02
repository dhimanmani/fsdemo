import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import useAuth from '../hooks/useAuth';
import { ROUTES } from '../constants';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function Register() {
  const { register: signup, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // Auto-redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.DASHBOARD, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const passwordVal = watch('password');

  const onSubmit = async (data) => {
    try {
      await signup(data);
      navigate(ROUTES.DASHBOARD, { replace: true });
    } catch (err) {
      console.error('[Register] Submission error:', err);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-brand-500/10 rounded-full blur-[90px] pointer-events-none" />

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
              Create Account
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Scaffold your access credentials to enter the workspace.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input
              label="Full Name"
              name="name"
              type="text"
              placeholder="Alex Carter"
              icon={User}
              error={errors.name}
              {...register('name', {
                required: 'Full name is required.',
                minLength: {
                  value: 3,
                  message: 'Name must be at least 3 characters.',
                },
              })}
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="alex@example.com"
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

            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              error={errors.confirmPassword}
              {...register('confirmPassword', {
                required: 'Please confirm your password.',
                validate: (value) =>
                  value === passwordVal || 'The passwords do not match.',
              })}
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-2"
              isLoading={isLoading}
              icon={UserPlus}
            >
              Get Started
            </Button>
          </form>

          {/* Divider */}
          <div className="h-px bg-gray-200 dark:bg-dark-border" />

          {/* Footer Navigation */}
          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            Already have an account?{' '}
            <Link to={ROUTES.LOGIN} className="font-bold text-brand-600 dark:text-brand-400 hover:underline">
              Sign in instead
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
