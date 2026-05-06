import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges class strings with Tailwind conflict resolution.
 * @param  {...any} inputs
 * @returns {string}
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
