import { typography, type TypographyProps } from '@ssalka/ui/styles/typography';
import { cn } from '@ssalka/ui/utils';

export const H1 = ({
  children,
  className,
  ...typographyProps
}: { children: React.ReactNode; className?: string } & TypographyProps) => (
  <h1 className={cn(typography({ weight: 'bold', size: '4xl', ...typographyProps }), className)}>
    {children}
  </h1>
);

export const H2 = ({
  children,
  className,
  ...typographyProps
}: { children: React.ReactNode; className?: string } & TypographyProps) => (
  <h2
    className={cn(typography({ weight: 'semibold', size: '2xl', ...typographyProps }), className)}
  >
    {children}
  </h2>
);

export const H3 = ({
  children,
  className,
  ...typographyProps
}: { children: React.ReactNode; className?: string } & TypographyProps) => (
  <h3 className={cn(className, typography({ weight: 'semibold', size: 'lg', ...typographyProps }))}>
    {children}
  </h3>
);

export const H4 = ({
  children,
  className,
  ...typographyProps
}: { children: React.ReactNode; className?: string } & TypographyProps) => (
  <h4 className={cn(typography({ weight: 'semibold', size: 'md', ...typographyProps }), className)}>
    {children}
  </h4>
);

export const P = ({
  children,
  className,
  ...typographyProps
}: { children: React.ReactNode; className?: string } & TypographyProps) => (
  <p
    className={cn(typography({ variant: 'paragraph', size: 'sm', ...typographyProps }), className)}
  >
    {children}
  </p>
);

export const SmallCapsLabel = ({
  children,
  className,
  htmlFor,
}: {
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <label
    htmlFor={htmlFor}
    className={cn(
      className,
      typography({ caps: 'small', size: 'sm', weight: 'semibold', color: 'muted' }),
    )}
  >
    {children}
  </label>
);
