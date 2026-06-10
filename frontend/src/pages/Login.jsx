import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';
import { ROUTES } from '../constants';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = location.state?.from?.pathname || ROUTES.DASHBOARD;

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
    setIsSubmitting(true);
    try {
      await login(data);
      navigate(ROUTES.VERIFY_LOGIN_OTP, {
        replace: true,
        state: { email: data.email, from: location.state?.from },
      });
    } catch (error) {
      toast.error(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-500/10 rounded-full blur-[80px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass-card p-8 rounded-3xl flex flex-col gap-6">
          <div className="text-center flex flex-col gap-2">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-brand-500/25">
              ✨
            </div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mt-2">
              Welcome Back
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Sign in with your email and password. We will send an OTP to verify login.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="you@example.com"
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

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-2"
              isLoading={isSubmitting}
              icon={LogIn}
            >
              Continue to OTP
            </Button>
          </form>

          <div className="h-px bg-gray-200 dark:bg-dark-border" />

          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            Don&apos;t have an account?{' '}
            <Link to={ROUTES.REGISTER} className="font-bold text-brand-600 dark:text-brand-400 hover:underline">
              Create one now
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
