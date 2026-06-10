import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, ShieldCheck, Calendar, RefreshCw } from 'lucide-react';
import { authService } from '../services/authService';
import { formatDate } from '../utils';
import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';
import Button from '../components/ui/Button';

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.getProfile();
      setProfile(response.data.user);
    } catch (err) {
      console.error('[Dashboard] Error fetching profile:', err);
      setError(err.message || 'Could not load your profile.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (isLoading && !profile) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <ErrorMessage message={error} onRetry={fetchProfile} />
      </div>
    );
  }

  const profileItems = [
    { label: 'Full Name', value: profile?.name, icon: User },
    { label: 'Email Address', value: profile?.email, icon: Mail },
    {
      label: 'Email Verified',
      value: profile?.isEmailVerified ? 'Yes' : 'No',
      icon: ShieldCheck,
    },
    {
      label: 'Member Since',
      value: profile?.createdAt ? formatDate(profile.createdAt, 'PPP') : '-',
      icon: Calendar,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-gray-200/50 dark:border-dark-border/50 pb-6">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Your protected profile loaded from the backend API.
          </p>
        </div>

        <Button
          onClick={fetchProfile}
          variant="outline"
          size="sm"
          icon={RefreshCw}
          isLoading={isLoading}
        >
          Refresh Profile
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 rounded-3xl flex flex-col gap-6"
      >
        <div>
          <h2 className="text-lg font-black text-gray-900 dark:text-white">
            Welcome, {profile?.name}
          </h2>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            This page is protected by JWT authentication.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {profileItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="p-4 rounded-2xl bg-gray-50 dark:bg-dark-card/50 border border-gray-100 dark:border-dark-border"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4 text-brand-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    {item.label}
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
