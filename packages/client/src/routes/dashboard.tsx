import { useQuery } from '@tanstack/react-query';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { CheckCircleIcon, XCircleIcon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@ssalka/ui/components/card';

import { RouteErrorComponent } from '@/components/RouteErrorComponent';
import { SignOutButton } from '@/components/SignOutButton';
import { trpcReactQuery } from '@/lib/api';
import { useLoggedInUser } from '@/lib/hooks/users';
import { fetchCsrfToken } from '@/lib/utils/auth';

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
  errorComponent: RouteErrorComponent,
  async loader({ context }) {
    const csrfToken = await fetchCsrfToken();
    if (!context.user) {
      throw redirect({ to: '/login' });
    }

    return { csrfToken };
  },
});

function DashboardPage() {
  const { csrfToken } = Route.useLoaderData();
  const { data: user } = useLoggedInUser();
  const { data: health } = useQuery(trpcReactQuery.healthcheck.queryOptions());

  return (
    <div className="mx-auto max-w-2xl p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-foreground text-2xl font-bold">Dashboard</h1>
        <SignOutButton csrfToken={csrfToken} variant="outline" size="sm" />
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {user ? (
              <>
                <p>
                  <span className="text-muted-foreground">Name:</span> {user.name}
                </p>
                <p>
                  <span className="text-muted-foreground">Email:</span> {user.email}
                </p>
                <p>
                  <span className="text-muted-foreground">Role:</span> {user.role}
                </p>
              </>
            ) : (
              <p className="text-muted-foreground">Loading...</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {health?.ok ? (
                <>
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  <span>API is healthy</span>
                </>
              ) : (
                <>
                  <XCircleIcon className="h-5 w-5 text-red-500" />
                  <span>API is unreachable</span>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
