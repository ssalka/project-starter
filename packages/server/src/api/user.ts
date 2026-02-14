import { toJSON } from '../db/helpers.js';
import { protectedProcedure, publicProcedure, router } from '../trpc.js';

export const userRouter = router({
  /** Returns the user if logged in, null otherwise */
  getIfLoggedIn: publicProcedure.query(({ ctx }) => (ctx.user ? toJSON(ctx.user) : null)),
  /** Returns the user if logged in, throws an error otherwise */
  get: protectedProcedure.query(({ ctx }) => toJSON(ctx.user)),
});
