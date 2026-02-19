import { getSession, type ExpressAuthConfig } from '@auth/express';
import GitHub from '@auth/express/providers/github';
import { assert } from '@sindresorhus/is';
import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { pick } from 'lodash-es';

import { User } from './db/models/User.js';

// Auth config that matches the ExpressAuth configuration in server.ts
const authConfig: ExpressAuthConfig = {
  providers: [GitHub],
  session: {
    strategy: 'jwt',
  },
};

export const createContext = async (opts: CreateExpressContextOptions) => {
  // Get the user session from Auth
  let user = null;
  try {
    const isAuthEnabled = !!process.env.AUTH_SECRET;
    const session = isAuthEnabled ? await getSession(opts.req, authConfig) : null;
    if (session?.user) {
      user = await User.findOne(pick(session.user, ['name', 'email']));
    }
  } catch (error) {
    console.error('Error getting user session:', error);
  }

  return {
    user,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

// Type for authenticated context where user is guaranteed to exist
export type AuthenticatedContext = Context & {
  user: NonNullable<Context['user']>;
};
