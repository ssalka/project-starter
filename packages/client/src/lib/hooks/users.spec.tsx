import { QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import ObjectID from 'bson-objectid';
import { describe, expect, it } from 'vitest';

import { queryClient } from '@/lib/api';
import { mockTRPC } from '@/test/utils';

import { useLoggedInUser, useMaybeLoggedInUser } from './users';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('user hooks with mockTRPC', () => {
  const mockUser = {
    _id: new ObjectID().toHexString(),
    email: 'test@example.com',
    name: 'Test User',
    createdAt: new Date(),
    updatedAt: new Date(),
    role: 'user' as const,
  };

  it('useMaybeLoggedInUser receives mock data via useQuery', () => {
    mockTRPC({
      'user.getIfLoggedIn': mockUser,
    });

    const { result } = renderHook(() => useMaybeLoggedInUser(), { wrapper });
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual(mockUser);
  });

  it('useMaybeLoggedInUser returns null when user is not logged in', () => {
    mockTRPC({
      'user.getIfLoggedIn': null,
    });

    const { result } = renderHook(() => useMaybeLoggedInUser(), { wrapper });
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toBeNull();
  });

  it('useLoggedInUser receives mock data via useQuery', () => {
    mockTRPC({
      'user.get': mockUser,
    });

    const { result } = renderHook(() => useLoggedInUser(), { wrapper });
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual(mockUser);
  });
});
