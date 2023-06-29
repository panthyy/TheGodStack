import { inferAsyncReturnType } from '@trpc/server';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { ENV } from '.';
import { drizzle } from 'drizzle-orm/d1';
import { Kysely } from 'kysely';
import { D1Dialect } from 'kysely-d1';
import { DB } from 'kysely-codegen';

export const createContext =
  (env: ENV) =>
  async ({ req }: FetchCreateContextFnOptions) => {
    const db = new Kysely<DB>({
      dialect: new D1Dialect({ database: env.d1 }),
    });

    const user = {
      id: 1,
      name: 'test',
      email: 'a test email',
    };

    return {
      req,
      kv: env.kv,
      user,
      env,
      db,
    };
  };
// get return type of a function
const temp = createContext({} as any);

export type Context = inferAsyncReturnType<typeof temp>;
