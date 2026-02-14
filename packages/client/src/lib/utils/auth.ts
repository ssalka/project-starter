import { config } from '@ssalka/common/config';

export async function fetchCsrfToken() {
  const res = await fetch(`${config.server.url}/auth/csrf`, {
    credentials: 'include',
    cache: 'no-cache',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch CSRF token');
  }

  const { csrfToken } = (await res.json()) as { csrfToken: string };

  return csrfToken;
}
