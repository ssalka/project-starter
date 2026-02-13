import { QueryClient } from '@tanstack/react-query';
import { createTRPCClient, httpBatchLink, TRPCClientError } from '@trpc/client';
import { createTRPCContext, createTRPCOptionsProxy } from '@trpc/tanstack-react-query';
import superjson from 'superjson';

//     👇 **type-only** import
import type { AppRouter, RouterInput, RouterKeys, RouterOutput } from '@ssalka/api/types';
import { config } from '@ssalka/common/config';

//     👇 **type-only** export
export type { RouterInput, RouterKeys, RouterOutput };

export const queryClient = new QueryClient();

export type { QueryClient };

const links = [
  httpBatchLink({
    url: `${config.server.url}/api`,
    transformer: superjson,
    // Include credentials (cookies) with every request
    // This is necessary for session cookies
    fetch(url, options) {
      return fetch(url, {
        ...(options as RequestInit),
        credentials: 'include',
      });
    },
  }),
];

export const trpc = createTRPCClient<AppRouter>({ links });

export const trpcReactQuery = createTRPCOptionsProxy<AppRouter>({
  client: trpc,
  queryClient,
});

export const { TRPCProvider, useTRPC, useTRPCClient } = createTRPCContext<AppRouter>();

export function isTRPCClientError(cause: unknown): cause is TRPCClientError<AppRouter> {
  return cause instanceof TRPCClientError;
}

export type TRPCErrorCode = NonNullable<TRPCClientError<AppRouter>['data']>['code'];
