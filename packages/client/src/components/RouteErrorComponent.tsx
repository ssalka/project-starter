import { Link, useCanGoBack, useRouter } from '@tanstack/react-router';
import { ArrowLeftIcon, LogInIcon } from 'lucide-react';
import { match } from 'ts-pattern';

import { Button } from '@ssalka/ui/components/button';
import { Code } from '@ssalka/ui/components/code';
import { CodeBlock } from '@ssalka/ui/components/code-block';
import { H3 } from '@ssalka/ui/components/typography';

import { isTRPCClientError } from '@/lib/api';

export function RouteErrorComponent({ error }: { error: Error }) {
  const canGoBack = useCanGoBack();
  const router = useRouter();

  return (
    <div className="flex h-[50vh] flex-col items-center justify-center gap-3 p-4">
      <H3 className="inline-flex items-center gap-1">
        Oops:
        <Code size="md">{(isTRPCClientError(error) && error.data?.code) || 'UNKNOWN_ERROR'}</Code>
        🤔
      </H3>
      <CodeBlock>{String(error)}</CodeBlock>

      {match(isTRPCClientError(error) && error.data)
        .with({ code: 'UNAUTHORIZED' }, () => (
          <Button asChild variant="ghost" size="xs" className="space-x-1">
            <Link to="/login">
              <span>Sign in</span>
              <LogInIcon size={16} />
            </Link>
          </Button>
        ))
        .otherwise(() => {
          if (canGoBack) {
            return (
              <Button
                variant="ghost"
                size="xs"
                className="space-x-1"
                onClick={() => router.history.back()}
              >
                <ArrowLeftIcon size={16} />
                <span>Back</span>
              </Button>
            );
          }
        })}
    </div>
  );
}
