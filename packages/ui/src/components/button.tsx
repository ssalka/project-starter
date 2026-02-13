import { Slot, Slottable } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@ssalka/ui/utils';

const buttonVariants = cva(
  [
    'inline-flex cursor-pointer items-center justify-center rounded-md text-sm font-medium whitespace-nowrap',
    'transition-colors duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      intent: {
        success: 'bg-success text-white hover:bg-success/90',
        warning: 'bg-warning text-white hover:bg-warning/90',
        info: 'bg-info text-white hover:bg-info/90',
        error: 'bg-error text-white hover:bg-error/90',
      },
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive-hover active:bg-destructive-active',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground active:bg-accent-active',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary-hover active:bg-secondary-active',
        ghost:
          'hover:bg-accent-hover hover:text-accent-foreground active:bg-accent-active/25 data-[active=true]:bg-accent-active/50 data-[active=true]:text-accent-foreground',
        link: 'text-link underline-offset-4 hover:text-link-hover hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        xs: 'h-6 px-2 text-xs',
        sm: 'h-8 px-3',
        lg: 'h-11 px-8',
        icon: 'h-10 w-10',
        'icon-sm': 'h-8 w-8',
        'icon-xs': 'h-6 w-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
    compoundVariants: [
      {
        variant: 'link',
        size: 'default',
        className: 'p-0 h-auto',
      },
      {
        intent: 'success',
        variant: 'default',
        className: 'bg-success text-white hover:bg-success/90',
      },
      {
        intent: 'warning',
        variant: 'default',
        className: 'bg-warning text-white hover:bg-warning/90',
      },
      {
        intent: 'info',
        variant: 'default',
        className: 'bg-info text-white hover:bg-info/90',
      },
      {
        intent: 'error',
        variant: 'default',
        className: 'bg-error text-white hover:bg-error/90',
      },
      {
        intent: 'success',
        variant: 'ghost',
        className:
          'bg-success/10 text-success hover:bg-success/20 hover:text-success active:bg-success/35! data-[active=true]:bg-success/45!0',
      },
      {
        intent: 'warning',
        variant: 'ghost',
        className:
          'bg-warning/10 text-warning hover:bg-warning/20 hover:text-warning active:bg-warning/35! data-[active=true]:bg-warning/45!0',
      },
      {
        intent: 'info',
        variant: 'ghost',
        className:
          'bg-info/10 text-info hover:bg-info/20 hover:text-info active:bg-info/35! data-[active=true]:bg-info/45!0',
      },
      {
        intent: 'error',
        variant: 'ghost',
        className:
          'bg-error/10 text-error hover:bg-error/20 hover:text-error active:bg-error/35! data-[active=true]:bg-error/45!0',
      },
    ],
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = ({
  children,
  className,
  intent,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp className={cn(buttonVariants({ intent, variant, size, className }))} {...props}>
      <Slottable>{children}</Slottable>
    </Comp>
  );
};
Button.displayName = 'Button';

export { Button, buttonVariants };
