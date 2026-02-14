import * as SliderPrimitive from '@radix-ui/react-slider';
import is from '@sindresorhus/is';
import { times } from 'lodash-es';
import { XIcon } from 'lucide-react';
import React from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@ssalka/ui/components/tooltip';
import { cn } from '@ssalka/ui/utils';

type SliderProps = Omit<React.ComponentProps<typeof SliderPrimitive.Root>, 'onValueChange'> & {
  allowUnset?: boolean;
  onValueChange?: (value: number | null) => void;
  showTooltip?: boolean;
  skipInterval?: number;
  tooltipContent?: (value: number) => React.ReactNode;
};

function Slider({
  allowUnset = false,
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  onValueChange,
  showTooltip = false,
  skipInterval = 1,
  tooltipContent,
  ...props
}: SliderProps) {
  const initialValue = value ?? defaultValue;
  const [internalValues, setInternalValues] = React.useState<number[]>(
    !is.nullOrUndefined(initialValue) ? initialValue : [min, max],
  );

  React.useEffect(() => {
    if (value !== undefined) {
      setInternalValues(Array.isArray(value) ? value : [value]);
    }
  }, [value]);

  const handleValueChange = React.useCallback(
    (newValue: number[]) => {
      setInternalValues(newValue);
      // NOTE by returning only the 1st value, this slider does not support multiple values
      onValueChange?.(newValue[0]);
    },
    [onValueChange],
  );

  const [showTooltipState, setShowTooltipState] = React.useState(false);

  const handlePointerDown = () => {
    if (showTooltip) {
      setShowTooltipState(true);
    }
  };

  const handlePointerUp = React.useCallback(() => {
    if (showTooltip) {
      setShowTooltipState(false);
    }
  }, [showTooltip]);

  React.useEffect(() => {
    if (showTooltip) {
      document.addEventListener('pointerup', handlePointerUp);

      return () => {
        document.removeEventListener('pointerup', handlePointerUp);
      };
    }
  }, [showTooltip, handlePointerUp]);

  const renderThumb = (value: number) => {
    const thumb = (
      <SliderPrimitive.Thumb
        data-slot="slider-thumb"
        className="border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] outline-none hover:ring-4 focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50"
        onPointerDown={handlePointerDown}
      />
    );

    if (!showTooltip) return thumb;
    const isUnset = value === min - 1;

    const label = isUnset ? 'Unset' : value;

    return (
      <TooltipProvider>
        <Tooltip open={showTooltipState}>
          <TooltipTrigger asChild>{thumb}</TooltipTrigger>
          <TooltipContent
            className="px-2 py-1 text-xs"
            sideOffset={8}
            side={props.orientation === 'vertical' ? 'right' : 'top'}
          >
            <p>{tooltipContent ? tooltipContent(value) : label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  const ticks = times(max + 1);

  return (
    <div>
      <SliderPrimitive.Root
        data-slot="slider"
        defaultValue={defaultValue}
        value={value}
        min={min - +allowUnset}
        max={max}
        className={cn(
          'relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
          className,
        )}
        onValueChange={handleValueChange}
        {...props}
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className={cn(
            'bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5',
          )}
        >
          <SliderPrimitive.Range
            data-slot="slider-range"
            className={cn(
              'bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full',
            )}
          />
        </SliderPrimitive.Track>
        {Array.from({ length: +allowUnset + internalValues.length }, (_, index) => (
          <React.Fragment key={index}>{renderThumb(internalValues[index])}</React.Fragment>
        ))}
      </SliderPrimitive.Root>
      <span
        className="text-muted-foreground mt-3 flex w-full items-center justify-between gap-1 px-2 text-xs font-medium"
        aria-hidden="true"
      >
        {allowUnset && (
          // if true, expand range by 1
          <span className="flex w-0 flex-col items-center justify-center gap-2">
            <span className={cn('bg-muted-foreground/70 h-2 w-px')} />
            <XIcon size={12} className="my-0.5" />
          </span>
        )}
        {ticks.map((_, i) => (
          <span key={i} className="flex w-0 flex-col items-center justify-center gap-2">
            <span
              className={cn('bg-muted-foreground/70 h-2 w-px', i % skipInterval !== 0 && 'h-0.5')}
            />
            <span className={cn(i % skipInterval !== 0 && 'opacity-0')}>{i}</span>
          </span>
        ))}
      </span>
    </div>
  );
}

export { Slider };
