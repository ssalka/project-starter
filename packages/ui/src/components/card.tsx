import * as React from 'react';

import { cn } from '@ssalka/ui/utils';

import { H3 } from './typography';

const Card = ({ className, ...props }: React.ComponentProps<'section'>) => (
  <section
    className={cn('bg-card text-card-foreground rounded-lg border shadow-sm', className)}
    {...props}
  />
);
Card.displayName = 'Card';

const CardHeader = ({ className, ...props }: React.ComponentProps<'div'>) => (
  <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
);
CardHeader.displayName = 'CardHeader';

const CardTitle: React.FC<
  Omit<React.HTMLAttributes<HTMLHeadingElement>, 'color'> & { children: React.ReactNode }
> = ({ className, ...props }) => <H3 className={className} {...props} />;
CardTitle.displayName = 'CardTitle';

const CardDescription = ({ className, ...props }: React.ComponentProps<'p'>) => (
  <p className={cn('text-muted-foreground text-sm', className)} {...props} />
);
CardDescription.displayName = 'CardDescription';

const CardContent = ({ className, ...props }: React.ComponentProps<'div'>) => (
  <div className={cn('p-6 pt-0', className)} {...props} />
);
CardContent.displayName = 'CardContent';

const CardFooter = ({ className, ...props }: React.ComponentProps<'div'>) => (
  <div className={cn('flex items-center p-6 pt-0', className)} {...props} />
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
