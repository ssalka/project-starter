import { assert } from '@sindresorhus/is';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import type { RouterOutput } from '@ssalka/api/types';

type User = RouterOutput['user']['get'];

interface UserActions {
  setUser(user: User | null): void;
}

export interface UserStoreState {
  user: User | null;
}

interface UserStore extends UserStoreState {
  actions: UserActions;
}

export const useUserStore = create<UserStore>()(
  persist(
    immer(set => ({
      user: null,

      actions: {
        setUser(user: User | null) {
          set({ user });
        },
      },
    })),
    {
      name: 'app-user',
      partialize: state => ({ user: state.user }),
    },
  ),
);

export const getUserActions = () => useUserStore.getState().actions;

export const getUser = () => {
  const { user } = useUserStore.getState();

  assert.truthy(user, 'User is not logged in');

  return user;
};
