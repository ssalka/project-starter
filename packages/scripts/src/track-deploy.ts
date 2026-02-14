import 'dotenv/config';

import { getPostHogClient, getRepoMetadata } from './helpers';

/** Tracks the results of a deployment for analytics purposes. */
async function trackDeploy() {
  if (!process.env.CI) {
    return console.log('Deploy scripts should only be run in CI');
  }

  const posthog = getPostHogClient();
  const gitMetadata = await getRepoMetadata();

  posthog.capture({
    distinctId: 'dev',
    event: 'Deployment Completed',
    properties: {
      Environment: process.env.NODE_ENV,
      Commit: gitMetadata.commitSha,
      Branch: gitMetadata.branch,
      Author: gitMetadata.author,
    },
  });
}

void trackDeploy();
