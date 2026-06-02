import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Users, DollarSign, Activity, Server, ArrowUpRight, TrendingUp, RefreshCw, Calendar, Sparkles } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import { dashboardService } from '../services/api';
import { formatDate, formatRelativeTime } from '../utils';
import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';
import Button from '../components/ui/Button';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [statsData, activitiesData] = await Promise.all([
        dashboardService.getStats(),
        dashboardService.getActivities(),
      ]);
      setStats(statsData);
      setActivities(activitiesData);
    } catch (err) {
      console.error('[Dashboard] Error retrieving workspace data:', err);
      setError(err.message || 'Could not synchronize dashboard state metrics.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Card items configurations
  const statCards = stats
    ? [
        {
          title: 'Active Users',
          value: stats.activeUsers.toLocaleString(),
          change: stats.trends.users,
          trendUp: true,
          icon: Users,
          color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/20',
        },
        {
          title: 'Monthly Revenue',
          value: `$${stats.monthlyRevenue.toLocaleString()}`,
          change: stats.trends.revenue,
          trendUp: true,
          icon: DollarSign,
          color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20',
        },
        {
          title: 'Conversion Rate',
          value: stats.conversionRate,
          change: stats.trends.conversion,
          trendUp: true,
          icon: TrendingUp,
          color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/20',
        },
        {
          title: 'Server Status',
          value: stats.serverUptime,
          change: stats.trends.uptime,
          trendUp: true,
          icon: Server,
          color: 'text-violet-500 bg-violet-50 dark:bg-violet-950/20',
        },
      ]
    : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">
      {/* Upper header section */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-gray-200/50 dark:border-dark-border/50 pb-6">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👋</span>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white leading-none">
              Welcome back, {user?.name}
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-brand-50 text-brand-600 dark:bg-brand-950/30 dark:text-brand-400">
              <Sparkles className="w-3 h-3" />
              {user?.role}
            </span>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1.5 mt-0.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>Today is {formatDate(new Date(), 'PPPP')}</span>
          </p>
        </div>

        <Button
          onClick={fetchDashboardData}
          variant="outline"
          size="sm"
          icon={RefreshCw}
          isLoading={isLoading}
        >
          Sync Records
        </Button>
      </div>

      {/* Loading & Error Overlays */}
      {isLoading && !stats ? (
        <div className="min-h-[40vh] flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader size="lg" />
            <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 animate-pulse">
              Retrieving reporting metrics...
            </span>
          </div>
        </div>
      ) : error ? (
        <ErrorMessage message={error} onRetry={fetchDashboardData} />
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-8"
        >
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="glass-card p-6 rounded-2xl flex flex-col gap-4"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                      {card.title}
                    </span>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${card.color}`}>
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between mt-2">
                    <span className="text-2xl font-black text-gray-900 dark:text-white">
                      {card.value}
                    </span>
                    <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 px-1.5 py-0.5 rounded">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      {card.change}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Detailed Workspace Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Overview Panel */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 glass-card p-6 rounded-3xl flex flex-col gap-6"
            >
              <div>
                <h2 className="text-lg font-black text-gray-900 dark:text-white">
                  Active Deployments
                </h2>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                  Real-time synchronization instances on cloud endpoints.
                </p>
              </div>

              {/* Graphic Mock Block */}
              <div className="h-64 rounded-2xl bg-gray-50 dark:bg-dark-card/50 border border-gray-100 dark:border-dark-border flex flex-col items-center justify-center p-6 text-center">
                <Activity className="w-8 h-8 text-brand-500 animate-pulse mb-3" />
                <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">
                  Analytics Visualization Loading
                </h3>
                <p className="text-xs text-gray-400 dark:text-gray-500 max-w-xs mt-1.5 leading-relaxed">
                  Charts are currently operating on virtual mocks. To customize details, bind live database REST routes to services.
                </p>
              </div>
            </motion.div>

            {/* Activities Panel */}
            <motion.div
              variants={itemVariants}
              className="glass-card p-6 rounded-3xl flex flex-col gap-6"
            >
              <div>
                <h2 className="text-lg font-black text-gray-900 dark:text-white">
                  Workspace Audit Log
                </h2>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                  Recent activities across team members.
                </p>
              </div>

              <div className="flex flex-col gap-4 overflow-y-auto max-h-[17.5rem] pr-1.5">
                {activities.map((act) => (
                  <div key={act.id} className="flex gap-3 items-start">
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-500 mt-1.5 flex-shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                        {act.user}
                      </span>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                        {act.action}
                      </p>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
                        {formatRelativeTime(act.time)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
