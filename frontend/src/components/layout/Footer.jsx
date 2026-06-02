import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Heart } from 'lucide-react';
import { ROUTES, APP_NAME } from '../../constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg transition-colors py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="flex flex-col gap-3">
            <Link to={ROUTES.HOME} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-500 to-indigo-600 flex items-center justify-center text-white font-extrabold text-sm">
                ✨
              </div>
              <span className="font-extrabold text-md tracking-tight text-gray-900 dark:text-white">
                {APP_NAME}
              </span>
            </Link>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Empowering enterprise scale developers with modern scaffolding layouts, premium design elements, and interactive component ecosystems.
            </p>
          </div>

          {/* Platform Columns */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
              Platform
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to={ROUTES.HOME} className="text-xs text-gray-600 dark:text-gray-300 hover:text-brand-500 transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <a href="#features" className="text-xs text-gray-600 dark:text-gray-300 hover:text-brand-500 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#security" className="text-xs text-gray-600 dark:text-gray-300 hover:text-brand-500 transition-colors">
                  Enterprise Security
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#documentation" className="text-xs text-gray-600 dark:text-gray-300 hover:text-brand-500 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#api" className="text-xs text-gray-600 dark:text-gray-300 hover:text-brand-500 transition-colors">
                  API Status
                </a>
              </li>
              <li>
                <a href="#changelog" className="text-xs text-gray-600 dark:text-gray-300 hover:text-brand-500 transition-colors">
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Panel */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Newsletter
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Get modular architecture updates directly to your inbox.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="you@example.com"
                required
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-white focus:outline-none focus:border-brand-500"
              />
              <button
                type="submit"
                className="px-3 py-1.5 text-xs font-bold rounded-lg bg-brand-600 hover:bg-brand-700 text-white shadow transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 dark:bg-dark-border/50 my-8" />

        {/* Footer bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
            <span>&copy; {currentYear} {APP_NAME}. Made with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current animate-pulse" />
            <span>for enterprise efficiency.</span>
          </p>
          <div className="flex items-center gap-4 text-gray-400 dark:text-gray-500">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
