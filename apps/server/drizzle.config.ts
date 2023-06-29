import type { Config } from 'drizzle-kit';

export default {
  schema: './src/schema/*',
  out: './drizzle',
  driver: 'better-sqlite',
  dbCredentials: {
    url: '.wrangler/state/d1/d1.sqlite3',
  },
} satisfies Config;
