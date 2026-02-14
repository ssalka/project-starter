import type { Config } from 'tailwindcss';

import uiPreset from './tailwind-preset';

const config: Config = {
  presets: [uiPreset],
  content: ['./src/**/*.{ts,tsx}'],
  prefix: '',
};

export default config;
