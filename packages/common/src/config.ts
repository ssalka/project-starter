import { match } from 'ts-pattern';

import { getEnv } from './env.js';

// Get the environment variables
export const env = getEnv();

/** True when running in the CI environment (GitHub Actions) */
export const isCI = env.CI;

/** True when running `pnpm dev` */
export const isDev = env.MODE === 'development';

/** True when using a Vite build with `--mode=staging` */
export const isStaging = env.MODE === 'staging';

/** True when using a Vite build with `--mode=production` */
export const isProduction = env.MODE === 'production';

/** True when running test commands prefixed with `NODE_ENV=test` or when running playwright tests */
export const isTest = env.TEST;

/** True when running end-to-end Playwright tests */
export const isE2E = env.E2E;

/** True when running on localhost */
export const isLocalhost = env.HOST.startsWith('localhost:');

/** In CI, `vite preview` is used, which defaults to port 4173. Otherwise, Vite defaults to port 5173. */
const devClient = isCI ? 'http://localhost:4173' : 'http://localhost:5173';
/** The port that the server runs on locally */
const devServer = 'http://localhost:3001/api';

// TODO replace with real staging/production URLs when deploying
const stagingClient = 'https://staging.example.com';
const stagingServer = `${stagingClient}/api`;

const productionClient = 'https://app.example.com';
const productionServer = `${productionClient}/api`;

export const config = {
  client: {
    loadDevTools: isDev && !isTest,
    url: match({ env: env.NODE_ENV, isTest })
      .with({ isTest: true }, () => devClient)
      .with({ env: 'production' }, () => productionClient)
      .with({ env: 'staging' }, () => stagingClient)
      .otherwise(() => devClient),
  },
  server: {
    url: match({ env: env.NODE_ENV, isTest })
      .with({ isTest: true }, () => devServer)
      .with({ env: 'production' }, () => productionServer)
      .with({ env: 'staging' }, () => stagingServer)
      .otherwise(() => devServer),
  },
};
