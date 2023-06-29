import { initTRPC, TRPCError } from '@trpc/server';
import { Context } from './context';

export const t = initTRPC.context<Context>().create({
  isDev: false,
});

export const middleware = t.middleware;

export const ProtectedProcedure = middleware(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to do this',
    });
  }
  return next();
});
export const router = t.router;
export const publicProcedure = t.procedure;
