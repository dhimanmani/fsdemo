import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Cpu, Zap, ArrowRight, CheckCircle, Database } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import { ROUTES } from '../constants';
import Button from '../components/ui/Button';

export default function Home() {
  const { isAuthenticated } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const features = [
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Production-ready Axios interceptor layer automatically appending JWT authorization and handling session timeouts.',
      color: 'text-brand-500 bg-brand-50 dark:bg-brand-950/20',
    },
    {
      icon: Cpu,
      title: 'React 19 Core',
      description: 'Fully optimized for React 19 functional rendering, custom context hooks, and standard modern structures.',
      color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/20',
    },
    {
      icon: Zap,
      title: 'Tailwind Styling v3',
      description: 'Stunning light and dark systems with built-in custom scrollbars, gradient text templates, and premium visual components.',
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/20',
    },
    {
      icon: Database,
      title: 'Mock Service Gateways',
      description: 'Integrated local delay simulation and mock network layer enabling zero-backend developer testing of forms.',
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20',
    },
  ];

  return (
    <div className="relative overflow-hidden py-16 sm:py-24">
      {/* Background ambient glowing rings */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center gap-6"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-600 dark:bg-brand-950/40 dark:text-brand-400 border border-brand-200/50 dark:border-brand-900/30"
          >
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            React 19 + Vite Production Scaffolding Active
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl font-black tracking-tight text-gray-900 dark:text-white max-w-4xl"
          >
            Scaffold Modern{' '}
            <span className="bg-gradient-to-r from-brand-500 to-indigo-600 bg-clip-text text-transparent text-glow">
              Enterprise Frontends
            </span>{' '}
            Faster.
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed"
          >
            A high-performance React template styled with Tailwind CSS, secured using persistent state contexts, animated via Framer Motion, and managed by React Hook Form.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mt-4">
            {isAuthenticated ? (
              <Link to={ROUTES.DASHBOARD}>
                <Button size="lg" icon={ArrowRight} iconPosition="right">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to={ROUTES.REGISTER}>
                  <Button size="lg" icon={ArrowRight} iconPosition="right">
                    Get Started Free
                  </Button>
                </Link>
                <Link to={ROUTES.LOGIN}>
                  <Button variant="outline" size="lg">
                    Live Demo Sign In
                  </Button>
                </Link>
              </>
            )}
          </motion.div>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          id="features"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-24"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="glass-card p-6 rounded-2xl flex flex-col gap-4 hover:scale-[1.03] transition-transform duration-300"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${feature.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
