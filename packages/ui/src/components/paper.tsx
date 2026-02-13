import type { ComponentProps, FC } from 'react';

import { cn } from '@ssalka/ui/utils';

/** A container with a textured background similar to paper. */
export const Paper: FC<ComponentProps<'div'>> = ({ children, className, ...props }) => {
  const paperTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paperFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paperFilter)'/%3E%3C/svg%3E")`;

  return (
    <div className={cn('relative w-full overflow-hidden rounded-lg p-3', className)} {...props}>
      <div
        className="absolute inset-0 opacity-10 mix-blend-exclusion"
        style={{ backgroundImage: paperTexture }}
      />

      {children}
    </div>
  );
};
