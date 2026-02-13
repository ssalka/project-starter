import rootConfig, { BUILTINS, NODE_MODULES, stitch } from '../../prettier.config.mjs';

/** @type {import('prettier').Config} */
const config = {
  ...rootConfig,
  importOrder: stitch(BUILTINS, NODE_MODULES, '^@ssalka/common/(.*)$', '^[./]'),
};

export default config;
