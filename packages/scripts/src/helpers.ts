import { assert } from '@sindresorhus/is';
import { $, ExecaError } from 'execa';
import { once } from 'lodash-es';
import { PostHog } from 'posthog-node';

async function getBranch(): Promise<string> {
  if (process.env.CI) {
    const { BRANCH_NAME } = process.env;
    assert.string(BRANCH_NAME, 'BRANCH_NAME not found');

    return BRANCH_NAME;
  }

  const { stdout } = await $`git rev-parse --abbrev-ref HEAD`;

  return stdout;
}

async function getCommitSha(): Promise<string> {
  if (process.env.CI) {
    const { COMMIT_SHA } = process.env;
    assert.string(COMMIT_SHA, 'COMMIT_SHA not found');

    return COMMIT_SHA;
  }

  const { stdout } = await $`git rev-parse HEAD`;

  return stdout;
}

async function getCommitAuthor(): Promise<string> {
  const { stdout } = await $`git log -1 --pretty=%an`;

  return stdout;
}

export async function getRepoMetadata(): Promise<{
  branch: string;
  commitSha: string;
  author: string;
}> {
  const [branch, commitSha, author] = await Promise.all([
    getBranch(),
    getCommitSha(),
    getCommitAuthor(),
  ]);

  return { branch, commitSha, author };
}

export const getPostHogClient = once(() => {
  const { VITE_POSTHOG_API_KEY } = process.env;
  if (!VITE_POSTHOG_API_KEY) {
    // Occurs in CI if the variable is not set, but shouldn't issue requests without a key
    console.warn('VITE_POSTHOG_API_KEY not found');

    return { capture() {}, init() {} } as unknown as PostHog;
  }

  return new PostHog(VITE_POSTHOG_API_KEY, {
    host: 'https://us.i.posthog.com',
    flushAt: 1,
    disableGeoip: true,
  });
});

export const isExecaError = (e: unknown): e is ExecaError<{ lines: true }> =>
  e instanceof ExecaError;
