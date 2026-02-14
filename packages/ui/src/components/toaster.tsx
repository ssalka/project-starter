'use client';

import {
  CircleCheckIcon,
  InfoIcon,
  LoaderCircleIcon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react';
import { Toaster as Sonner } from 'sonner';

type ToastProps = React.ComponentProps<typeof Sonner>;

/** Used to show non-interruptive pop-up notifications to the user in the corner of the screen */
const Toaster: React.FC<ToastProps> = props => (
  <Sonner
    data-testid="toaster"
    theme="light"
    className="toast group"
    icons={{
      success: <CircleCheckIcon className="text-success size-4" />,
      info: <InfoIcon className="text-info size-4" />,
      warning: <TriangleAlertIcon className="text-warning size-4" />,
      error: <OctagonXIcon className="text-error size-4" />,
      loading: <LoaderCircleIcon className="size-4 animate-spin" />,
    }}
    toastOptions={{
      classNames: {
        toast:
          'group toast group-[.toast]:bg-background group-[.toast]:text-foreground group-[.toast]:border-border group-[.toast]:shadow-lg font-normal',
        description: 'group-[.toast]:text-muted-foreground',
        actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
        cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
      },
    }}
    {...props}
  />
);

export { Toaster };
