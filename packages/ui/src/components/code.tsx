import { typography, type TypographyProps } from '@ssalka/ui/styles/typography';
import { cn } from '@ssalka/ui/utils';

export const Code: React.FC<
  TypographyProps & {
    children: React.ReactNode;
    className?: string;
  }
> = ({ children, className, wrap = false, ...typographyProps }) => {
  return (
    <code className={cn(className, typography({ variant: 'code', wrap, ...typographyProps }))}>
      {children}
    </code>
  );
};
