import 'dotenv/config';

import is, { assert } from '@sindresorhus/is';
import { $, type ExecaError } from 'execa';

import { getPostHogClient, getRepoMetadata, isExecaError } from './helpers';

/** Performs typechecking & tracks results for analytics purposes. */
async function typecheck() {
  if (!process.env.CI) {
    return await $`pnpm typecheck`;
  }

  let tsOutput: string[] | undefined;
  let error: ExecaError<{ lines: true }> | undefined;
  try {
    const { stdout } = await $({
      lines: true,
      stdout: ['pipe', 'inherit'],
    })`pnpm typecheck --diagnostics`;
    tsOutput = stdout;
  } catch (e) {
    if (isExecaError(e)) {
      tsOutput = e.stdout;
      error = e;
    }
  } finally {
    assert.truthy(tsOutput);
    tsOutput = tsOutput.filter(is.truthy);
  }

  const [packageLine, command, ...rest] = tsOutput.filter(is.truthy);
  const packageName = packageLine.split(/(\\|\/)/).at(-1);
  const errors = rest.filter(line => line.includes(': error TS'));
  const diagnostics = rest.filter(line => /^[a-zA-Z/\s]+:\s+\d/.test(line));

  const posthog = getPostHogClient();
  const gitMetadata = await getRepoMetadata();

  const diagnosticEventProperties = Object.fromEntries(
    diagnostics.map(line => {
      const [propertyName, propertyValue] = line.split(/:\s+/);

      if (propertyValue.endsWith('s')) {
        return [`${propertyName} (s)`, Number(propertyValue.slice(0, -1))];
      }
      if (propertyValue.endsWith('K')) {
        return [`${propertyName} (MB)`, Number(propertyValue.slice(0, -1)) / 1024];
      }

      return [propertyName, Number(propertyValue)];
    }),
  );

  posthog.capture({
    distinctId: 'dev',
    event: 'Typechecking Completed',
    properties: {
      Branch: gitMetadata.branch,
      Commit: gitMetadata.commitSha,
      Author: gitMetadata.author,
      Package: packageName,
      Command: command.replace(/^>\s/, ''),
      ['Has Errors']: errors.length > 0,
      Errors: errors,
      ['Error Count']: errors.length,
      ...diagnosticEventProperties,
    },
  });

  if (error) {
    throw error as Error;
  }
}

void typecheck();
