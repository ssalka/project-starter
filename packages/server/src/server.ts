import { ExpressAuth } from '@auth/express';
import type { Provider } from '@auth/express/providers';
import Credentials from '@auth/express/providers/credentials';
import GitHub from '@auth/express/providers/github';
import { assert } from '@sindresorhus/is';
import * as trpcExpress from '@trpc/server/adapters/express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { type Express } from 'express';

import { config, isProduction } from '@ssalka/common/config';

import { createContext } from './context.js';
import { connectToDatabase, disconnectFromDatabase } from './db/connect.js';
import { User, type UserSchema } from './db/models/User.js';
import { appRouter } from './router.js';

export default async function startServer() {
  await connectToDatabase();

  const app = express();

  // Parse cookies
  app.use(cookieParser());

  // Configure CORS with proper options for Auth.js
  app.use(
    cors({
      origin: config.client.url,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true,
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Cookie',
        'X-CSRF-Token',
        'X-Requested-With',
      ],
      exposedHeaders: ['Set-Cookie'],
    }),
  );

  const authProviders: Provider[] = [GitHub];
  const useWeakAuth = !isProduction;
  if (useWeakAuth) {
    // HACK for e2e tests - allow easy sign-in with test credentials
    authProviders.push(
      Credentials({
        id: 'password',
        name: 'Password',
        credentials: {
          email: { label: 'Email', type: 'email' },
          password: { label: 'Password', type: 'password' },
        },
        authorize(credentials) {
          if (credentials.email === 'ceo@piedpiper.com' && credentials.password === 'password') {
            return {
              email: 'ceo@piedpiper.com',
              name: 'Richard Hendricks',
              image: 'https://avatars.githubusercontent.com/u/67470890?s=200&v=4',
            };
          }

          return null;
        },
      }),
    );
  }

  app.set('trust proxy', true);

  const api = express.Router();

  // Redirect /login to client login page (used by Auth.js pages config)
  // This is needed because Auth.js's `pages` property only accepts relative paths
  // and we need to redirect to the client application to show the login page
  app.get('/login', (req, res) => {
    const queryString = req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : '';
    res.redirect(`${config.client.url}/login${queryString}`);
  });

  // Setup Auth.js endpoint first, before body parsing
  api.use(
    '/auth',
    ExpressAuth({
      providers: authProviders,
      redirectProxyUrl: `${config.server.url}/auth`,
      session: {
        strategy: 'jwt',
      },
      pages: {
        signIn: '/login',
        error: '/login',
      },
      callbacks: {
        async jwt(params) {
          await User.findOrCreate(params.user as UserSchema);

          return params.token;
        },
        redirect({ url, baseUrl }) {
          // Handle error redirects - Auth.js appends error params to baseUrl
          // We need to redirect these to the client login page
          if (url.includes('error=') && url.startsWith(baseUrl)) {
            const urlObj = new URL(url);
            const errorParams = urlObj.search;

            return `${config.client.url}/login${errorParams}`;
          }

          // Handle callbackUrl from form submissions
          if (url.startsWith(config.client.url)) {
            return url;
          }

          // For relative paths, prepend client URL
          if (url.startsWith('/')) {
            return `${config.client.url}${url}`;
          }

          // Default to client URL
          console.warn(`Unrecognized redirect URL "${url}", defaulting to client URL`);

          return config.client.url;
        },
      },
    }),
  );

  // Apply body parsing middleware only to non-auth routes
  app.use((req, res, next) => {
    if (!req.url.includes('/auth/')) {
      bodyParser.json()(req, res, next);
    } else {
      next();
    }
  });

  app.use((req, res, next) => {
    if (!req.url.includes('/auth/')) {
      bodyParser.urlencoded({ extended: true })(req, res, next);
    } else {
      next();
    }
  });

  // Setup the tRPC router for other API routes
  api.use(
    '/',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
      onError({ error, type, path }) {
        console.error(`Error in tRPC ${type} ${path}: ${error.code}`);
      },
    }),
  );

  app.use('/api', api);

  const port = Number(process.env.PORT);
  assert.positiveNumber(port, 'PORT must be an integer');

  return new Promise<Express>(resolve => {
    const server = app.listen(port, () => {
      console.log(`Listening on port ${port}`);
      resolve(app);
    });

    process.on('SIGTERM', () => {
      console.log('SIGTERM signal received: closing HTTP server');
      server.close(() => {
        console.log('HTTP server closed');
        void disconnectFromDatabase();
      });
    });
  });
}
