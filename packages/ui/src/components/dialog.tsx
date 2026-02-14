'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import * as React from 'react';

import { cn } from '@ssalka/ui/utils';

import { typography } from '../styles/typography';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = ({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) => (
  <DialogPrimitive.Overlay
    className={cn(
      'z-modal-backdrop bg-overlay fixed inset-0 backdrop-blur-sm',
      'data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out',
      className,
    )}
    {...props}
  />
);
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName!;

const DialogContent = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      className={cn(
        'bg-surface-overlay z-modal border-border fixed top-[50%] left-[50%] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-xl',
        'sm:rounded-lg',
        'data-[state=open]:animate-scale-in data-[state=closed]:animate-scale-out',
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="focus-visible:ring-ring focus-visible:ring-offset-background data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
);
DialogContent.displayName = DialogPrimitive.Content.displayName!;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = ({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) => (
  <DialogPrimitive.Title
    className={cn('text-lg leading-none font-semibold tracking-tight', className)}
    {...props}
  />
);
DialogTitle.displayName = DialogPrimitive.Title.displayName!;

const DialogDescription = ({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) => (
  <DialogPrimitive.Description
    className={cn(typography({ color: 'muted', variant: 'paragraph', size: 'sm' }), className)}
    {...props}
  />
);
DialogDescription.displayName = DialogPrimitive.Description.displayName!;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
