import { clsx, type ClassValue } from 'clsx';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

export { ClassValue as MaybeClassName, toast };

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const prefersReducedMotion =
  typeof window !== 'undefined' &&
  (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    process.env.NODE_ENV === 'test');

export const isMobile =
  typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
