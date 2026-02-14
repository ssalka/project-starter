import React from 'react';

import { cn } from '@ssalka/ui/utils';

export interface InputProps extends React.ComponentProps<'input'> {
  onEnter?: (e: React.KeyboardEvent<HTMLInputElement>, value: string) => void;
}

const Input = ({ className, type, onKeyDown: onKeyDownProp, onEnter, ...props }: InputProps) => {
  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    onKeyDownProp?.(e);

    if (e.key === 'Enter') {
      onEnter?.(e, (e.target as HTMLInputElement).value);
    }
  }

  return (
    <input
      type={type}
      className={cn(
        'border-input bg-background ring-offset-background flex h-10 w-full rounded-md border px-3 py-2 text-sm',
        'file:border-0 file:bg-transparent file:text-sm file:font-medium',
        'placeholder:text-muted-foreground',
        'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      onKeyDown={onKeyDown}
      {...props}
    />
  );
};
Input.displayName = 'Input';

export { Input };
