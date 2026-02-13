export const BUILTINS = '<BUILTIN_MODULES>';

export const NODE_MODULES = '<THIRD_PARTY_MODULES>';

/** @type {(...arr: string[]) => string[]} */
export const stitch = (...arr) => arr.flatMap(val => [val, '']).slice(0, -1);

/** @type {import('prettier').Config} */
const config = {
  arrowParens: 'avoid',
  trailingComma: 'all',
  printWidth: 100,
  tabWidth: 2,
  semi: true,
  singleQuote: true,

  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrder: stitch(BUILTINS, NODE_MODULES, '^@ssalka/(.*)$', '^@/(.*)$', '^[./]'),
  importOrderParserPlugins: ['typescript'],
  importOrderTypeScriptVersion: '5.9.3',
};

export default config;
