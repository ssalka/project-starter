import * as path from 'path';

export default {
  resolve: {
    alias: {
      ['@ssalka/common']: path.resolve(__dirname, './src'),
    },
  },
  test: {
    include: ['src/**/*.spec.ts'],
  },
};
