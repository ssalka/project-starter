import path from 'path';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { webpackPort } from 'src/server/config';

const ROOT = path.resolve(__dirname);
const DIST = path.resolve('./dist');
const CLIENT = path.resolve('./src/client');

const config = {
  mode: 'development',
  devtool: 'source-map',
  context: ROOT,
  entry: ['./src/client/index.tsx'],
  output: {
    path: DIST,
    filename: 'client.js',
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      include: CLIENT,
      loader: 'ts-loader',
      options: {
        configFile: path.resolve('./config/tsconfig.client.json'),
        transpileOnly: true
      }
    }]
  },
  resolve: {
    alias: {
      src: path.resolve('./src')
    },
    extensions: ['.js', '.ts', '.tsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: !['production', 'test'].includes(process.env.NODE_ENV)
    }),
    new CopyWebpackPlugin([
      { from: 'src/client/index.html' }
    ])
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  );
} else if (process.env.NODE_ENV !== 'test') {
  config.entry.unshift(
    `webpack-dev-server/client?http://localhost:${webpackPort}/`,
    'webpack/hot/dev-server'
  );

  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: './config/tsconfig.client.json',
      tslint: './config/tslint.json'
    })
  );
}

export default config;
