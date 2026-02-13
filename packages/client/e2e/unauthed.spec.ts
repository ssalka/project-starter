import { expect, test } from '@playwright/test';

test('Viewing a protected page redirects to login', async ({ page }) => {
  await page.goto('/dashboard');

  await page.waitForURL('**/login');
  await expect(page.getByRole('button', { name: 'Sign in with GitHub' })).toBeVisible();
});
