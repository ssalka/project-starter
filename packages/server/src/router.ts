import { userRouter } from './api/user.js';
import { publicProcedure, router } from './trpc.js';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => ({ ok: true })),
  user: userRouter,
});

export type AppRouter = typeof appRouter;

export { appRouter as router };
