import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { createContext } from './context';
import { exampleRouter } from './routers';
import { router } from './trpc';
import { Router, createCors, error, json } from 'itty-router';

export type ENV = {
  NODE_ENV: 'development' | 'production';
  d1: D1Database;
};

const { preflight, corsify } = createCors({
  origins: ['http://localhost:3000'],
  methods: ['GET', 'PATCH', 'POST'],
  headers: ['Content-Type'],
});

const appRouter = router({
  example: exampleRouter,
});

export default {
  async fetch(
    request: Request,
    env: ENV,
    ctx: ExecutionContext
  ): Promise<Response> {
    const router = Router();

    // CORS
    router.all('*', preflight);

    router.get('/api/hello', () => new Response('Hello worker!'));

    router.post('/trpc', (req) => {
      const f = fetchRequestHandler({
        endpoint: '/trpc',
        req,
        router: appRouter,
        createContext: createContext(env),
      });

      return new Promise((resolve, reject) => {
        try {
          f.then((res) => {
            res.headers.set('Access-Control-Allow-Origin', '*');
            resolve(res);
          }).catch((err) => {
            reject(err);
          });
        } catch (error) {
          reject(
            new Response('Internal Server Error', {
              status: 500,
            })
          );
        }
      });
    });

    router.all('*', () => error(404));

    return router.handle(request, ctx).then(json).catch(error).then(corsify);
  },
};

export type AppRouter = typeof appRouter;
