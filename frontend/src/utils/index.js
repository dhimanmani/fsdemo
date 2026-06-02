import { format, formatDistanceToNow, parseISO } from 'date-fns';

/**
 * Merges CSS class names conditionally.
 * @param {...string} classes 
 * @returns {string}
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Formats a date string into a standard readable format.
 * @param {string|Date} date 
 * @param {string} formatStr 
 * @returns {string}
 */
export function formatDate(date, formatStr = 'PPP') {
  if (!date) return '';
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  try {
    return format(parsedDate, formatStr);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
}

/**
 * Formats a date into a human-readable relative time (e.g., "3 days ago").
 * @param {string|Date} date 
 * @returns {string}
 */
export function formatRelativeTime(date) {
  if (!date) return '';
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  try {
    return formatDistanceToNow(parsedDate, { addSuffix: true });
  } catch (error) {
    console.error('Error formatting relative time:', error);
    return '';
  }
}

/**
 * Helper to get/set local storage values safely.
 */
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    } catch (e) {
      console.error(`Error reading from localStorage: ${key}`, e);
      return defaultValue;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error writing to localStorage: ${key}`, e);
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error(`Error removing from localStorage: ${key}`, e);
    }
  },
};
