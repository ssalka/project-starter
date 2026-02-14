import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'happy-dom',
      globals: true,
      include: ['src/**/*.spec.{ts,tsx}'],
      setupFiles: './src/test/setup.ts',
    },
  }),
);
