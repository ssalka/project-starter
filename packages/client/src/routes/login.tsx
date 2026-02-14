import { createFileRoute, Link, useLoaderData } from '@tanstack/react-router';
import { ArrowRightIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { config, isLocalhost } from '@ssalka/common/config';
import { Button } from '@ssalka/ui/components/button';
import { Particles } from '@ssalka/ui/components/effects/particles';
import { Input } from '@ssalka/ui/components/input';
import { SmallCapsLabel } from '@ssalka/ui/components/typography';

import { useMaybeLoggedInUser } from '@/lib/hooks/users';
import { fetchCsrfToken } from '@/lib/utils/auth';

export const Route = createFileRoute('/login')({
  component: LoginPage,
  loader: async () => {
    const csrfToken = await fetchCsrfToken();

    return { csrfToken };
  },
});

function LoginPage() {
  const { csrfToken } = useLoaderData({ from: '/login' });
  // NOTE the user is excluded from the loader as it's secondary to the critical path (unauthenticated users)
  const { data: user } = useMaybeLoggedInUser();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get error from URL if present
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const errorParam = urlParams.get('error');
    if (errorParam) {
      setError(errorParam);
    }
  }, []);

  return (
    <div className="mx-auto mt-10 flex max-w-md flex-col items-center gap-4">
      <div className="bg-background z-10 w-full space-y-4 rounded-md border p-6">
        {/* GitHub login option */}
        <form action={`${config.server.url}/auth/signin/github`} method="POST" className="w-full">
          <input type="hidden" name="csrfToken" value={csrfToken} />
          <input type="hidden" name="callbackUrl" value={`${config.client.url}/dashboard`} />
          <Button
            type="submit"
            className="bg-brand-github hover:bg-brand-github/90 active:bg-brand-github/95 w-full gap-2 text-white"
          >
            <img
              src="https://authjs.dev/img/providers/github.svg"
              alt="GitHub"
              className="h-5 w-5 invert"
            />
            Sign in with GitHub
          </Button>
        </form>

        <hr />

        {isLocalhost && (
          <form
            action={`${config.server.url}/auth/callback/password`}
            method="POST"
            onSubmit={() => setIsLoading(true)}
            className="space-y-4"
          >
            <input type="hidden" name="csrfToken" value={csrfToken} />
            <input type="hidden" name="callbackUrl" value={`${config.client.url}/dashboard`} />

            <SmallCapsLabel>Email</SmallCapsLabel>
            <Input name="email" aria-label="Email" />
            <SmallCapsLabel>Password</SmallCapsLabel>
            <Input name="password" type="password" aria-label="Password" />

            <Button
              type="submit"
              variant="secondary"
              tabIndex={0}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Signing in...' : 'Sign in with Password'}
            </Button>
          </form>
        )}

        {error && (
          <div
            role="alert"
            className="mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
          >
            <p>Error: {error}</p>
          </div>
        )}
      </div>

      {user && (
        // TODO support user avatar
        <Button asChild variant="link" className="flex items-center gap-1">
          <Link to="/">
            <span>Continue as {user.name}</span> <ArrowRightIcon size={16} />
          </Link>
        </Button>
      )}
      <Particles className="absolute inset-0" color="#666666" ease={20} quantity={120} />
    </div>
  );
}
