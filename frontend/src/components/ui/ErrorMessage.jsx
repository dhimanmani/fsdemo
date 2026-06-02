import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { cn } from '../../utils';

/**
 * Reusable premium error banner/message component with an optional retry callback.
 */
export default function ErrorMessage({
  message,
  onRetry,
  className = '',
  variant = 'block', // 'block' | 'inline'
}) {
  if (!message) return null;

  if (variant === 'inline') {
    return (
      <div className={cn('flex items-center gap-1.5 text-xs text-red-500 font-medium', className)}>
        <AlertCircle className="w-4 h-4 flex-shrink-0" />
        <span>{message}</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 rounded-xl border border-red-100 dark:border-red-950/30 bg-red-50/50 dark:bg-red-950/10 text-red-600 dark:text-red-400',
        className
      )}
    >
      <div className="flex items-start md:items-center gap-3">
        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 md:mt-0" />
        <div className="text-sm font-medium">
          {message}
        </div>
      </div>
      
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-sm focus:outline-none"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry Request</span>
        </button>
      )}
    </div>
  );
}
