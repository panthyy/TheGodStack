import type { AppRouter } from '../../server/src';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
      // You can pass any HTTP headers you wish here
      async headers() {
        return {};
      },
    }),
  ],
});
