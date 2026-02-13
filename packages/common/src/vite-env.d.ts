/// <reference types="vite/client" />

declare global {
  interface ImportMetaEnv {
    // Values are parsed in config.ts
    readonly VITE_CI?: string;
    readonly VITE_E2E?: string;
    readonly VITE_USER_NODE_ENV?: string;
  }
}

export {};
