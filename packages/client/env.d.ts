/// <reference types="vite/client" />

// FIXME Ideally, frontend typecheck should be totally unaware of server-side types and only rely on types from tRPC.
// Necessary for `pnpm typecheck` to work.
import '@ssalka/api/env';

declare module 'react' {
  interface HTMLAttributes extends AriaAttributes, DOMAttributes {
    'cmdk-input-wrapper'?: string;
  }
}

interface ImportMetaEnv {
  readonly VITE_POSTHOG_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
