'use client';

import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as React from 'react';

import { cn } from '@ssalka/ui/utils';

const Progress = ({
  className,
  value,
  color = 'bg-primary',
  ...props
}: Omit<React.ComponentProps<typeof ProgressPrimitive.Root>, 'color'> & {
  color?: `bg-${string}`;
}) => (
  <ProgressPrimitive.Root
    className={cn('bg-muted relative h-4 w-full overflow-hidden rounded-full', className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn('h-full w-full flex-1 transition-all duration-300', color)}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
);
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
