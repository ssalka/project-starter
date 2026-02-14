'use client';

import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@ssalka/ui/utils';

// TODO replace with Button styles
const toggleVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 gap-2',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-10 px-3 min-w-10',
        sm: 'h-6 px-2 min-w-6',
        lg: 'h-11 px-5 min-w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const Toggle = ({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>) => (
  <TogglePrimitive.Root className={cn(toggleVariants({ variant, size, className }))} {...props} />
);

Toggle.displayName = TogglePrimitive.Root.displayName!;

export { Toggle, toggleVariants };
