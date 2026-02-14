import type { ComponentProps } from 'react';

import { config } from '@ssalka/common/config';
import { Button } from '@ssalka/ui/components/button';

export interface SignOutButtonProps extends Omit<ComponentProps<typeof Button>, 'type'> {
  csrfToken: string;
  callbackUrl?: string;
}

export function SignOutButton({
  csrfToken,
  callbackUrl = config.client.url,
  children = 'Sign out',
  ...buttonProps
}: SignOutButtonProps) {
  return (
    <form action={`${config.server.url}/auth/signout`} method="POST">
      <input type="hidden" name="csrfToken" value={csrfToken} />
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <Button type="submit" {...buttonProps}>
        {children}
      </Button>
    </form>
  );
}
