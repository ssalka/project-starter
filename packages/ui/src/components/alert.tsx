import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { cn } from '@ssalka/ui/utils';

const alertVariants = cva(
  cn(
    'relative grid w-full items-center gap-x-2 gap-y-0.5 rounded-lg text-sm [&>svg]:w-4',
    'has-[>svg]:has-data-[slot=alert-action]:grid-cols-[calc(var(--spacing)*4)_1fr_auto] has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-data-[slot=alert-action]:grid-cols-[1fr_auto] has-[>svg]:gap-x-2',
  ),
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      compact: {
        true: 'px-2 py-1',
        false: 'px-3.5 py-3',
      },
      variant: {
        default: 'bg-muted border-border text-muted-foreground',
        error: 'bg-error-background border-error-border text-error [&>svg]:text-error',
        info: 'bg-info-background border-info-border text-info [&>svg]:text-info',
        success: 'bg-success-background border-success-border text-success [&>svg]:text-success',
        warning: 'bg-warning-background border-warning-border text-warning [&>svg]:text-warning',
        secondary: 'bg-secondary border-border-subtle text-secondary-foreground',
      },
    },
  },
);

function Alert({
  className,
  variant,
  compact = false,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants> & { compact?: boolean }) {
  return (
    <div
      className={cn(alertVariants({ variant, compact }), className)}
      data-slot="alert"
      role="alert"
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('font-medium tracking-tight [svg~&]:col-start-2', className)}
      data-slot="alert-title"
      {...props}
    />
  );
}

function AlertDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('flex flex-col gap-2.5 tracking-tight [svg~&]:col-start-2', className)}
      data-slot="alert-description"
      {...props}
    />
  );
}

function AlertAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex gap-1 max-sm:col-start-2 max-sm:mt-2 sm:row-start-1 sm:row-end-3 sm:self-center sm:[[data-slot=alert-description]~&]:col-start-2 sm:[[data-slot=alert-title]~&]:col-start-2 sm:[svg~&]:col-start-2 sm:[svg~[data-slot=alert-description]~&]:col-start-3 sm:[svg~[data-slot=alert-title]~&]:col-start-3',
        className,
      )}
      data-slot="alert-action"
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription, AlertAction };
