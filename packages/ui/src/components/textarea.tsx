import * as React from 'react';

import { cn } from '@ssalka/ui/utils';

const Textarea = ({ className, ...props }: React.ComponentProps<'textarea'>) => {
  return (
    <textarea
      className={cn(
        'border-input bg-background ring-offset-background placeholder:text-muted-foreground/70 focus-visible:ring-ring flex min-h-20 w-full rounded-md border px-3 py-2 text-base tracking-tight placeholder:italic focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className,
      )}
      {...props}
    />
  );
};
Textarea.displayName = 'Textarea';

export { Textarea };
