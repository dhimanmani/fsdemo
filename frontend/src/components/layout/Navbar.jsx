import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, LogOut, LayoutDashboard, Home, User, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
import { ROUTES, STORAGE_KEYS } from '../../constants';
import { cn, storage } from '../../utils';
import Button from '../ui/Button';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(() => storage.get(STORAGE_KEYS.THEME, 'light'));

  // Sync theme to root HTML element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    storage.set(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleLogoutClick = () => {
    logout();
    navigate(ROUTES.HOME);
    setIsOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { label: 'Home', path: ROUTES.HOME, icon: Home },
    ...(isAuthenticated ? [{ label: 'Dashboard', path: ROUTES.DASHBOARD, icon: LayoutDashboard }] : []),
  ];

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-gray-200/50 dark:border-dark-border/50 bg-white/75 dark:bg-dark-bg/85 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Brand */}
          <div className="flex items-center">
            <Link to={ROUTES.HOME} className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-500 to-indigo-600 flex items-center justify-center text-white font-black shadow-lg shadow-brand-500/25 group-hover:scale-105 transition-transform duration-300">
                ✨
              </div>
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-brand-600 to-indigo-600 dark:from-brand-400 dark:to-indigo-400 bg-clip-text text-transparent group-hover:text-glow">
                Enterprise
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all hover:bg-gray-100 dark:hover:bg-gray-800',
                      isActive(link.path)
                        ? 'text-brand-600 dark:text-brand-400 bg-brand-50/50 dark:bg-brand-950/20'
                        : 'text-gray-600 dark:text-gray-300'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Middle divider */}
            <div className="h-4 w-px bg-gray-200 dark:bg-dark-border" />

            {/* Utility Toggles */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
            </button>

            {/* Session Links */}
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full border border-brand-500 bg-brand-50 dark:bg-brand-950/30 flex items-center justify-center">
                    <User className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">{user?.name}</span>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500">{user?.email}</span>
                  </div>
                </div>
                
                <Button
                  onClick={handleLogoutClick}
                  variant="outline"
                  size="sm"
                  icon={LogOut}
                  className="!py-1.5 border-red-200 hover:bg-red-50 text-red-600 hover:text-red-700 dark:border-red-950/30 dark:hover:bg-red-950/20 dark:text-red-400 dark:hover:text-red-300"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link to={ROUTES.LOGIN}>
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to={ROUTES.REGISTER}>
                  <Button variant="primary" size="sm">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu trigger button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg transition-colors"
          >
            <div className="px-2 pt-2 pb-4 space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-base font-semibold',
                      isActive(link.path)
                        ? 'text-brand-600 dark:text-brand-400 bg-brand-50/50 dark:bg-brand-950/20'
                        : 'text-gray-600 dark:text-gray-300'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}

              <div className="h-px bg-gray-200 dark:bg-dark-border my-2 mx-3" />

              {isAuthenticated ? (
                <div className="p-3">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full border border-brand-500 bg-brand-50 dark:bg-brand-950/30 flex items-center justify-center">
                      <User className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">{user?.name}</span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">{user?.email}</span>
                    </div>
                  </div>
                  <Button
                    onClick={handleLogoutClick}
                    variant="danger"
                    size="md"
                    icon={LogOut}
                    className="w-full"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 p-2">
                  <Link to={ROUTES.LOGIN} onClick={() => setIsOpen(false)} className="w-full">
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link to={ROUTES.REGISTER} onClick={() => setIsOpen(false)} className="w-full">
                    <Button variant="primary" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
