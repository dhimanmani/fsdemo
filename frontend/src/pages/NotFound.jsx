import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HelpCircle, ChevronLeft, Home } from 'lucide-react';
import { ROUTES } from '../constants';
import Button from '../components/ui/Button';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background neon glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="text-center max-w-md relative z-10 flex flex-col items-center gap-6">
        {/* Animated Question Symbol */}
        <motion.div
          animate={{
            y: [0, -12, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-20 h-20 rounded-full bg-gradient-to-tr from-brand-500 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-brand-500/20"
        >
          <HelpCircle className="w-10 h-10" />
        </motion.div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-black uppercase tracking-widest text-brand-600 dark:text-brand-400">
            Error Code 404
          </span>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white leading-tight">
            Instance Not Discovered
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mt-1.5 leading-relaxed">
            The page path you are attempting to synchronize does not exist or has been relocated to another route context.
          </p>
        </div>

        {/* Option actions */}
        <div className="flex items-center gap-3">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            size="md"
            icon={ChevronLeft}
          >
            Go Back
          </Button>

          <Link to={ROUTES.HOME}>
            <Button variant="primary" size="md" icon={Home}>
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
