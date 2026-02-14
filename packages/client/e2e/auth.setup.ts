import { expect, test } from '@playwright/test';

import { signIn } from './util.auth';

test('Log in & out of the app', async ({ page }) => {
  // NOTE Login state will be cached to `./.auth/user.json` for reuse across tests
  await signIn(page);

  // (the user is now signed in, the `signIn` function verifies that)

  // Click sign out
  await page.getByRole('button', { name: 'Sign out' }).click();

  // Verify we're back to the sign in state
  await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
});
