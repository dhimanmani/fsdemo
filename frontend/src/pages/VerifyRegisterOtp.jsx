import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Mail, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';
import { ROUTES } from '../constants';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function VerifyRegisterOtp() {
  const { verifyRegisterOtp, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: location.state?.email || '',
      otp: '',
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.DASHBOARD, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (location.state?.email) {
      setValue('email', location.state.email);
    }
  }, [location.state?.email, setValue]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await verifyRegisterOtp(data);
      navigate(ROUTES.DASHBOARD, { replace: true });
    } catch (error) {
      toast.error(error.message || 'OTP verification failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass-card p-8 rounded-3xl flex flex-col gap-6">
          <div className="text-center flex flex-col gap-2">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">
              Verify Registration
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Enter the 6-digit OTP sent to your email.
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
                required: 'Email is required.',
              })}
            />

            <Input
              label="OTP Code"
              name="otp"
              type="text"
              placeholder="123456"
              icon={ShieldCheck}
              error={errors.otp}
              {...register('otp', {
                required: 'OTP is required.',
                pattern: {
                  value: /^\d{6}$/,
                  message: 'OTP must be a 6-digit number.',
                },
              })}
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={isSubmitting}
              icon={ShieldCheck}
            >
              Verify Email
            </Button>
          </form>

          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            Wrong email?{' '}
            <Link to={ROUTES.REGISTER} className="font-bold text-brand-600 dark:text-brand-400 hover:underline">
              Register again
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
