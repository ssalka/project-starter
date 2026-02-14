// @ts-check

import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import globals from 'globals';
import { mapValues } from 'lodash-es';

import baseConfig from '../../eslint.config.mjs';

/** @typedef {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigArray} ConfigArray  */
/** @typedef {import('@typescript-eslint/utils').TSESLint.FlatConfig.Plugins} Plugins  */

/** @type {ConfigArray} */
export default [
  ...baseConfig,
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      'no-console': 'error',
    },
  },

  // React
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      /** @type {Plugins[string]} */
      react,
      'react-hooks': reactHooks,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      formComponents: ['Form'],
      linkComponents: [
        { name: 'Link', linkAttribute: 'to' },
        { name: 'NavLink', linkAttribute: 'to' },
      ],
    },
    rules: {
      ...mapValues(reactRecommended.rules, () => 'error'),
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
];
