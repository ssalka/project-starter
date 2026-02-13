import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
  type ResolveParams,
} from '@tanstack/react-router';
import { act, render } from '@testing-library/react';
import ObjectID from 'bson-objectid';
import { HttpResponse } from 'msw';
import { http } from 'msw/core/http';
import React from 'react';
import { vi } from 'vitest';

import type { GetRouterOutput } from '@ssalka/api/types';
import { config } from '@ssalka/common/config';

import { queryClient, type RouterKeys } from '@/lib/api';
import { toAppUrl, type AppPathname, type RouterPathnameArgs } from '@/lib/routing';
import { getUserActions } from '@/state/user';

import { routeTree } from '../routeTree.gen';

export async function renderPage<T extends AppPathname>(...args: RouterPathnameArgs<T>) {
  const pageUrl = toAppUrl(...(args as [T, ResolveParams<T>]));
  const history = createMemoryHistory({ initialEntries: [pageUrl] });
  const router = createRouter({
    routeTree,
    history,
    origin: config.client.url,
    defaultPendingMinMs: 0,
  });

  const app = render(<RouterProvider<typeof router> router={router} />);

  await act(() => router.load());

  // Check if any route match ended up with an error (caught by error boundaries)
  // and throw it so the test fails appropriately
  for (const match of router.state.matches) {
    if (match.status === 'error' && match.error) {
      throw match.error as Error;
    }
  }

  return { app, router };
}

/** Strongly typed mock responses mapping procedure keys to their output types */
type MockTRPCResponses = {
  [K in RouterKeys]?: GetRouterOutput<K>;
};

/**
 * Mock tRPC procedure responses for tests.
 *
 * @example
 * ```ts
 * mockTRPC({
 *   'user.getIfLoggedIn': { _id: 'user-1', name: 'Test User' },
 * });
 * ```
 */
export function mockTRPC(responses: MockTRPCResponses) {
  queryClient.clear();

  for (const [procedure, response] of Object.entries(responses)) {
    const queryKey = procedure.split('.');
    queryClient.setQueryData(queryKey, response);
  }

  const findMockResponse = (options: unknown) => {
    const opts = options as { queryKey?: unknown[] };
    const key = opts.queryKey?.map(String).join('.') ?? '';

    for (const [procedure, response] of Object.entries(responses)) {
      if (key.includes(procedure)) {
        return { found: true, response, key };
      }
    }

    return { found: false, response: undefined, key };
  };

  const handleQueryWithData = (options: unknown) => {
    const { found, response, key } = findMockResponse(options);

    if (found) {
      return Promise.resolve(response);
    }

    throw new Error(
      `\n\ntRPC Call Not Mocked: ${key}\n\n` +
        `Add this procedure to your mockTRPC() call:\n` +
        `mockTRPC({ '${key}': <your mock response> })\n`,
    );
  };

  const handlePrefetch = (options: unknown): Promise<void> => {
    const { found, key } = findMockResponse(options);

    if (!found) {
      return Promise.reject(
        new Error(
          `\n\ntRPC Call Not Mocked: ${key}\n\n` +
            `Add this procedure to your mockTRPC() call:\n` +
            `mockTRPC({ '${key}': <your mock response> })\n`,
        ),
      );
    }

    // Data is already in cache from setQueryData, nothing to return
    return Promise.resolve();
  };

  vi.spyOn(queryClient, 'ensureQueryData').mockImplementation(handleQueryWithData);
  vi.spyOn(queryClient, 'prefetchQuery').mockImplementation(handlePrefetch);
  vi.spyOn(queryClient, 'fetchQuery').mockImplementation(handleQueryWithData);
}

/** Default test user for authenticated test scenarios */
export const testUser = {
  _id: new ObjectID().toHexString(),
  email: 'test@example.com',
  name: 'Test User',
  createdAt: new Date(),
  updatedAt: new Date(),
  role: 'user' as const,
};

/** Default MSW handlers for tRPC batch requests */
export const defaultMswHandlers = [
  http.post(`${config.server.url}/*`, () => {
    return HttpResponse.json([
      { result: { data: { json: null, meta: { values: ['undefined'], v: 1 } } } },
    ]);
  }),
];

export { getUserActions };
