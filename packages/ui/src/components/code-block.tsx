import { typography } from '@ssalka/ui/styles/typography';
import { cn } from '@ssalka/ui/utils';

export const CodeBlock: React.FC<{
  children: React.ReactNode;
  className?: string;
  wrap?: boolean;
}> = ({ children, className, wrap = false }) => {
  return (
    <pre
      role="code"
      className={cn(className, typography({ variant: 'codeBlock', size: 'xs', wrap }))}
    >
      {children}
    </pre>
  );
};
