import { defineConfig, devices } from '@playwright/test';

import { config, isCI } from '@ssalka/common/config';

const baseURL = config.client.url;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './e2e',
  /* Run tests in files in parallel (local only) */
  fullyParallel: !isCI,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!isCI,
  /* Retry on CI only */
  retries: isCI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: isCI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    ...(isCI &&
      {
        // FIXME `space3d.spec.ts` tests always fail in CI, even with these either of these args
        // launchOptions: {
        //   args: ['--use-gl=swiftshader'],
        //   args: ['--use-gl=angle', '--use-angle=swiftshader-webgl'],
        // },
      }),
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    video: {
      mode: isCI ? 'on-first-retry' : 'off',
      // arbitrary choice to fit sidebar + space for ~4 entities
      size: { width: 750, height: 510 },
    },
  },

  projects: [
    {
      name: 'unauthed',
      use: { ...devices['Desktop Chrome'], storageState: undefined },
      testMatch: /unauthed\.spec\.ts/,
    },
    {
      name: 'auth',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /auth\.setup\.ts/,
    },
    {
      name: 'authenticated-tests',
      dependencies: ['auth'],
      testMatch: /^(?!.*unauthed).*\.spec\.ts$/,
      use: {
        ...devices['Desktop Chrome'],
        /* Store authentication state between tests */
        storageState: './e2e/.auth/user.json',
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: [
    {
      command: 'cross-env NODE_ENV=test PORT=3001 pnpm --filter=server dev',
      url: `${config.server.url}/healthcheck`,
      reuseExistingServer: !isCI,
      name: 'server',
    },
    {
      url: baseURL,
      // in CI, a production-ready build (using `--mode=staging`) is used to avoid waiting for vite to optimize deps
      command: 'pnpm --filter=client start',
      reuseExistingServer: !isCI,
      name: 'client',
    },
  ],
});
