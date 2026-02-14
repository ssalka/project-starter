import { useQuery } from '@tanstack/react-query';

import { trpcReactQuery } from '@/lib/api';

export const useMaybeLoggedInUser = () =>
  useQuery(trpcReactQuery.user.getIfLoggedIn.queryOptions());

export const useLoggedInUser = () => useQuery(trpcReactQuery.user.get.queryOptions());
