// add custom matchers from jest-dom
import '@testing-library/jest-dom';

import { vi } from 'vitest';

import type * as ApiModule from '../lib/api';

// Mock the tRPC API. To provide mock responses, use `mockTRPC` from `@/test/utils.tsx`.
vi.mock('../lib/api', async importOriginal => {
  const actual = await importOriginal<typeof ApiModule>();

  return {
    ...actual,
    trpcReactQuery: createTRPCMockProxy(actual.queryClient),
  };
});

/**
 * Creates a recursive proxy that mimics the trpcReactQuery structure.
 *
 * The proxy works with `mockTRPC` from `@/test/utils.tsx`:
 * - `queryOptions` returns options where `queryFn` reads from cache (set by mockTRPC)
 * - `mutationOptions` returns options with a no-op mutation function
 *
 * If a procedure is called but not mocked, an error will be thrown.
 */
function createTRPCMockProxy(queryClient: ApiModule.QueryClient, path: string[] = []): unknown {
  return new Proxy(() => {}, {
    get(_target, prop: string) {
      if (prop === 'queryOptions') {
        return (input?: unknown) => {
          const queryKey = [...path, input].filter(Boolean);

          return {
            queryKey,
            // Read from cache if available (set by mockTRPC), otherwise throw
            queryFn: () => {
              const cached = queryClient.getQueryData(queryKey);

              if (cached !== undefined) {
                return Promise.resolve(cached);
              }

              const procedurePath = path.join('.');
              throw new Error(
                `tRPC Call Not Mocked: ${procedurePath}\n` +
                  `You must mock this tRPC procedure in your test using mockTRPC().\n` +
                  `Example: mockTRPC({ '${procedurePath}': <your mock response> })`,
              );
            },
          };
        };
      }

      if (prop === 'queryKey') {
        return (input?: unknown) => {
          return [...path, input].filter(Boolean);
        };
      }

      if (prop === 'mutationOptions') {
        return (input?: unknown) => ({
          mutationKey: [...path, input].filter(Boolean),
          mutationFn: () => {
            const procedurePath = path.join('.');
            throw new Error(
              `tRPC Mutation Not Mocked: ${procedurePath}\n` +
                `You must mock this tRPC mutation in your test.`,
            );
          },
        });
      }

      // Continue building the path for nested access
      return createTRPCMockProxy(queryClient, [...path, prop]);
    },

    apply() {
      // Handle direct function calls on the proxy
      const procedurePath = path.join('.');
      throw new Error(
        `tRPC Call Not Mocked: ${procedurePath}\n` +
          `You must mock this tRPC procedure in your test.`,
      );
    },
  });
}
