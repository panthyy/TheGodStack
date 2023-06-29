import { publicProcedure, router } from '../trpc';

export const exampleRouter = router({
  hello: publicProcedure.query(async () => {
    return 'Hello World!';
  }),
  getUsers: publicProcedure.query(async ({ ctx: { db } }) => {
    return await db
      .selectFrom('users')
      .select(['id', 'name', 'email'])
      .execute();
  }),
});
