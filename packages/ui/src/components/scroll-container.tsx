import { cn } from '@ssalka/ui/utils';

import './scroll-container.css';

export interface ScrollContainerProps extends React.ComponentProps<'div'> {
  /**
   * The scroll direction(s) to enable gradients for.
   * - `vertical`: overflow-y with top/bottom gradients
   * - `horizontal`: overflow-x with left/right gradients
   * - `both`: both directions enabled
   * @default 'vertical'
   */
  direction?: 'vertical' | 'horizontal' | 'both';

  /**
   * The size of the gradient fade effect.
   * @default '3rem'
   */
  gradientSize?: string;

  /**
   * Custom gradient color. Should be the solid color to fade from.
   * Defaults to the CSS variable `--background` if not provided.
   */
  gradientColor?: string;
}

/**
 * A container that shows gradient overlays on edges where there's more content to scroll to.
 * Optimized for performance with CSS scroll-driven animations - no ResizeObserver required.
 *
 * The gradients automatically appear/disappear based on scroll position:
 * - At the start: gradient shows on the end edge
 * - In the middle: gradients show on both edges
 * - At the end: gradient shows on the start edge
 * - No overflow: no gradients shown
 *
 * NOTE By default, the rendered element is not height-constrained.
 * The choice of how to best constrain the height is left to the parent component.
 *
 * @example
 * ```tsx
 * <ScrollContainer className="h-64">
 *   <div className="space-y-4">
 *     {items.map(item => <Item key={item.id} {...item} />)}
 *   </div>
 * </ScrollContainer>
 * ```
 */
const ScrollContainer: React.FC<ScrollContainerProps> = ({
  direction = 'vertical',
  gradientSize = '3rem',
  gradientColor = 'var(--background)',
  children,
  className,
  style,
  ...props
}) => {
  const showVertical = direction === 'vertical' || direction === 'both';
  const showHorizontal = direction === 'horizontal' || direction === 'both';

  return (
    <div
      className={cn('scroll-container relative min-h-0', className)}
      style={
        {
          ...style,
          ['--scroll-gradient-size']: gradientSize,
          ...(gradientColor && { ['--scroll-gradient-color']: gradientColor }),
        } as React.CSSProperties
      }
      data-scroll-vertical={showVertical || undefined}
      data-scroll-horizontal={showHorizontal || undefined}
      {...props}
    >
      <div
        className={cn(
          'scroll-container-content h-full w-full',
          showVertical && 'overflow-y-auto',
          showHorizontal && 'overflow-x-auto',
        )}
      >
        {/* Sentinel elements for view timeline detection */}
        {showVertical && (
          <div className="scroll-sentinel-block-start pointer-events-none" aria-hidden="true" />
        )}
        {showHorizontal && (
          <div className="scroll-sentinel-inline-start pointer-events-none" aria-hidden="true" />
        )}

        {children}

        {showVertical && (
          <div className="scroll-sentinel-block-end pointer-events-none" aria-hidden="true" />
        )}
        {showHorizontal && (
          <div className="scroll-sentinel-inline-end pointer-events-none" aria-hidden="true" />
        )}
      </div>

      {/* Gradient overlays */}
      {showVertical && (
        <>
          <div
            className="scroll-gradient-top pointer-events-none absolute inset-x-0 top-0 z-10"
            aria-hidden="true"
          />
          <div
            className="scroll-gradient-bottom pointer-events-none absolute inset-x-0 bottom-0 z-10"
            aria-hidden="true"
          />
        </>
      )}
      {showHorizontal && (
        <>
          <div
            className="scroll-gradient-left pointer-events-none absolute inset-y-0 left-0 z-10"
            aria-hidden="true"
          />
          <div
            className="scroll-gradient-right pointer-events-none absolute inset-y-0 right-0 z-10"
            aria-hidden="true"
          />
        </>
      )}
    </div>
  );
};
ScrollContainer.displayName = 'ScrollContainer';

export { ScrollContainer };
