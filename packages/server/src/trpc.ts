import { initTRPC, TRPCError } from '@trpc/server';
import { pick, pickBy } from 'lodash-es';
import superjson from 'superjson';
import { uid } from 'uid/secure';

import type { AuthenticatedContext, Context } from './context.js';

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const middleware = t.middleware;

export const publicProcedure = t.procedure.use(async opts => {
  const meta: Record<string, string | number> = {
    requestId: uid(),
    ...pickBy(pick(opts, ['type', 'path', 'input'])),
  };

  console.log('Request Started', meta);
  const start = Date.now();

  const result = await opts.next();

  meta.duration = Date.now() - start;

  if (result.ok) {
    console.log('Request Finished', meta);
  } else {
    console.error('Request Failed', {
      ...meta,
      errorCode: result.error.code,
      errorMessage: result.error.message,
    });
  }

  return result;
});

// Protected procedure that requires authentication
export const protectedProcedure = publicProcedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to access this resource',
    });
  }

  return next({
    ctx: ctx as AuthenticatedContext,
  });
});
