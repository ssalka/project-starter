import { cva } from 'class-variance-authority';
import { fromPairs } from 'lodash-es';

import { colors } from './colors';

export type TypographyProps = Parameters<typeof typography>[0];

export type TypographyVariant = NonNullable<NonNullable<TypographyProps>['variant']>;

const colorVariants = fromPairs(colors.map(color => [color, `text-${color}-600`])) as Record<
  (typeof colors)[number],
  string
>;

const colorCompoundVariants = colors.map(color => ({
  variant: 'code' as const,
  color,
  className: `bg-${color}-100`,
}));

export const typography = cva('leading-none tracking-tight text-foreground', {
  variants: {
    variant: {
      code: 'rounded-md bg-accent p-1 font-mono tracking-normal text-accent-active',
      // NOTE should be used with `cn` because it overrides tracking-tight
      codeBlock: 'rounded bg-muted p-2 font-mono tracking-normal',
      paragraph: 'leading-tight',
      placeholder: 'italic text-muted-foreground/70',
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    size: {
      '7xl': 'text-7xl',
      '6xl': 'text-6xl',
      '5xl': 'text-5xl',
      '4xl': 'text-4xl',
      '3xl': 'text-3xl',
      '2xl': 'text-2xl',
      xl: 'text-xl',
      lg: 'text-lg',
      md: 'text-base',
      sm: 'text-sm',
      xs: 'text-xs',
    },
    caps: {
      normal: 'caps-normal',
      small: 'small-caps tracking-wider',
    },
    color: {
      muted: 'text-muted-foreground',
      ...colorVariants,
    },
    wrap: {
      true: 'whitespace-pre-wrap',
    },
  },
  compoundVariants: [...colorCompoundVariants],
});

const eltToVariantProps = {
  h1: {
    size: 'xl',
  },
  h2: {
    size: 'lg',
  },
} as Record<string, TypographyProps>;

export const elementStyles = (elt: string) => typography(eltToVariantProps[elt] || {});
