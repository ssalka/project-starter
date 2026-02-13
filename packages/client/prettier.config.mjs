import rootConfig from '../../prettier.config.mjs';

/** @type {import('prettier').Config} */
const config = {
  ...rootConfig,
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    /**
     * NOTE tailwind plugin *must* be loaded last
     * @see https://github.com/tailwindlabs/prettier-plugin-tailwindcss?tab=readme-ov-file#compatibility-with-other-prettier-plugins
     */
    'prettier-plugin-tailwindcss'
  ],
  importOrderParserPlugins: ['typescript', 'jsx']
};

export default config;
