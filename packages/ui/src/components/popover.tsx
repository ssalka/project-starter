'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';

import { cn } from '@ssalka/ui/utils';

const Popover = PopoverPrimitive.Root;

const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = ({
  className,
  align = 'center',
  sideOffset = 6,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'bg-popover text-popover-foreground z-popover border-border w-72 rounded-md border p-4 shadow-lg outline-none',
        'data-[state=open]:animate-scale-in data-[state=closed]:animate-scale-out',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName!;

export { Popover, PopoverAnchor, PopoverTrigger, PopoverContent };
