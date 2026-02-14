// @ts-check

import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigArray} */
export default [
  {
    // NOTE Global ignores object - no other properties may be added here
    ignores: ['**/build', '**/dist'],
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      'func-names': ['error', 'always'],
      'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
      'newline-before-return': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-const': ['error', { destructuring: 'all' }],
      'require-await': 'error',
    },
  },
  ...tseslint.config(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    {
      // TypeScript
      files: ['**/*.{ts,tsx}'],
      rules: {
        '@typescript-eslint/consistent-type-imports': ['error', { disallowTypeAnnotations: false }],
        /** NOTE to work around this rule, object keys may be written as strings and wrapped in brackets (e.g. `['Wrong Case']: value`) */
        '@typescript-eslint/naming-convention': [
          'error',
          { selector: 'default', format: ['camelCase'] },
          {
            selector: ['import', 'function'],
            format: ['camelCase', 'PascalCase'],
          },
          // exception for lodash
          { selector: 'import', filter: '_', format: [] },
          {
            selector: ['parameter'],
            format: ['camelCase', 'PascalCase'],
            // for unused parameters
            leadingUnderscore: 'allow',
          },
          {
            selector: ['variable'],
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
            // to accommodate _id
            leadingUnderscore: 'allow',
          },
          {
            selector: ['memberLike'],
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
            filter: { match: false, regex: '^([a-zA-Z0-9]+[-_.])*[a-zA-Z0-9]+$' },
            leadingUnderscore: 'allow',
          },
          {
            // exception for kebab-case (which the rule doesn't support) and other weird properties that need to be passed to libraries
            selector: ['memberLike'],
            format: null,
            filter: { match: true, regex: '^([a-zA-Z0-9]+[-_.])*[a-zA-Z0-9]+$' },
            leadingUnderscore: 'allow',
          },
          {
            selector: ['typeLike', 'enumMember'],
            format: ['PascalCase'],
          },
        ],
        '@typescript-eslint/no-empty-object-type': 'off',
        '@typescript-eslint/no-misused-promises': 'error',
        '@typescript-eslint/no-restricted-imports': [
          'error',
          {
            name: 'uid',
            message: 'Use `uid` from `uid/secure` instead',
          },
          {
            name: 'console',
            message: 'If auto-importing `assert`, use `@sindresorhus/is` instead',
          },
        ],
        '@typescript-eslint/no-unused-expressions': 'error',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            args: 'all',
            argsIgnorePattern: '^_',
            caughtErrors: 'all',
            destructuredArrayIgnorePattern: '^_',
            varsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/unbound-method': 'off',
      },
    },
    {
      files: ['*.config.mjs', '**/*.config.mjs'],
      rules: {
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
      },
    },
    {
      languageOptions: {
        parserOptions: {
          projectService: {
            allowDefaultProject: ['*.config.mjs', 'packages/*/*.config.mjs'],
          },
          tsconfigRootDir: import.meta.dirname,
        },
      },
    },
    // Node
    {
      files: ['**/eslint.config.mjs'],
      languageOptions: {
        globals: {
          ...globals.node,
        },
      },
    },
  ),
];
