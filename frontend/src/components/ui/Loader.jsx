import React from 'react';
import { cn } from '../../utils';

/**
 * Reusable premium loader spinner.
 */
export default function Loader({
  size = 'md',
  color = 'brand',
  className = '',
  fullScreen = false,
}) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  const colors = {
    brand: 'border-brand-500 border-t-transparent',
    white: 'border-white border-t-transparent',
    gray: 'border-gray-300 border-t-transparent dark:border-gray-600',
  };

  const spinner = (
    <div
      className={cn(
        'rounded-full animate-spin',
        sizes[size],
        colors[color],
        className
      )}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50/70 dark:bg-dark-bg/80 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-3">
          {spinner}
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 animate-pulse">
            Loading portal...
          </p>
        </div>
      </div>
    );
  }

  return spinner;
}
