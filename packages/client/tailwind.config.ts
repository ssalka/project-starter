import type { Config } from 'tailwindcss';

import uiPreset from '@ssalka/ui/tailwind-preset';

const config: Config = {
  presets: [uiPreset],
  content: [
    './src/**/*.{ts,tsx}',
    '../ui/src/**/*.{ts,tsx}', // Include UI package components
  ],
};

export default config;
