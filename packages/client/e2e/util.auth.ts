import { mkdir, writeFile } from 'fs/promises';
import path from 'path';

import { expect, type Page } from '@playwright/test';

import { config } from '@ssalka/common/config';

export async function signIn(page: Page) {
  // Start at the home page and wait for it to load
  await page.goto(config.client.url);

  // Wait for the page to be fully loaded and interactive
  await page.waitForLoadState('domcontentloaded');
  await page.waitForLoadState('load');

  // Check if already logged in by looking for the sign out button
  try {
    const signOutButton = page.getByRole('button', { name: 'Sign out' });
    if (await signOutButton.isVisible()) {
      return; // Already logged in, no need to proceed
    }
  } catch {
    // Button not found, proceed with sign in
  }

  // Initialize login state for the remaining tests
  const authDir = 'e2e/.auth';
  const fileName = 'user.json';
  await ensureStorageStateExists(authDir, fileName);

  // Click the sign in button and wait for navigation
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL(`/login`);

  // Enter the test credentials (see `Credentials` provider in `server.ts`)
  await page.getByRole('textbox', { name: 'Email' }).fill('ceo@piedpiper.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('password');
  await page.getByRole('button', { name: 'Sign in with Password' }).click();

  // Wait for the callback to complete and redirect to /dashboard
  await page.waitForURL('**/dashboard');
  await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible();

  // Store signed-in state to './.auth/user.json'
  await page.context().storageState({ path: path.join(authDir, fileName) });
}

async function ensureStorageStateExists(authDir: string, fileName: string) {
  const authPath = path.join(authDir, fileName);

  // Ensure the storage state file exists
  await mkdir(authDir, { recursive: true });

  // Create an empty auth file if it doesn't exist
  try {
    await writeFile(authPath, '{}', { flag: 'wx' });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'EEXIST') {
      throw error;
    }
  }
}
