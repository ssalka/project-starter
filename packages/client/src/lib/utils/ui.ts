import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export { ClassValue as MaybeClassName };

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
