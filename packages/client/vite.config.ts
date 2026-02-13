import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { analyzer } from 'vite-bundle-analyzer';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import tsconfigPaths from 'vite-tsconfig-paths';

/**
 * This is set by the `analyze:build` script
 * NOTE the ANALYZE environment variable should only be used locally, as the process never self-terminates
 */
const shouldOpenBuildAnalyzer = process.env.ANALYZE === '1';

export default defineConfig({
  build: {
    rollupOptions: {
      // packages used in the app but not included in the production build
      external: ['@tanstack/react-router-devtools'],
    },
    sourcemap: true,
  },

  plugins: [
    tsconfigPaths(),
    tanstackRouter(),
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: '../ui/public/fonts/*',
          dest: 'fonts',
        },
      ],
    }),
    shouldOpenBuildAnalyzer ? analyzer() : null,
  ],
});
