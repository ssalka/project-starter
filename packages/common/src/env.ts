import { assert } from '@sindresorhus/is';

export interface EnvVariables {
  CI: boolean;
  HOST: string;
  MODE: string;
  NODE_ENV: string;
  TEST: boolean;
  E2E: boolean;
}

/** Returns true for 'true' or any string parseable as a non-zero number; false otherwise */
export const envVarToBoolean = (value: string | undefined): boolean =>
  !!Number(value?.replace('true', '1'));

/**
 * Safely gets environment variables across both Vite and Node.js environments
 *
 * For Vite, we use `import.meta.env`
 *
 * For Node.js, we use `process.env`
 */
export function getEnv(): EnvVariables {
  const isBrowser = typeof window !== 'undefined';

  if (isBrowser) {
    const { MODE, VITE_CI, VITE_E2E, VITE_USER_NODE_ENV: NODE_ENV } = import.meta.env;
    assert.nonEmptyStringAndNotWhitespace(NODE_ENV, 'NODE_ENV is required');

    return {
      CI: envVarToBoolean(VITE_CI),
      HOST: location.host,
      MODE,
      NODE_ENV,
      TEST: NODE_ENV === 'test',
      E2E: envVarToBoolean(VITE_E2E),
    };
  }

  // For Node.js

  const CI = envVarToBoolean(process.env.CI);
  const NODE_ENV = process.env.NODE_ENV || 'development';

  return {
    CI,
    // HOST is not really needed for the server, but it's here for consistency
    HOST: process.env.HOST ?? '',
    // MODE is not really needed for the server, but it's here for consistency
    MODE: NODE_ENV === 'production' ? 'production' : 'development',
    NODE_ENV,
    TEST: CI || NODE_ENV === 'test',
    E2E: envVarToBoolean(process.env.VITE_E2E),
  };
}
