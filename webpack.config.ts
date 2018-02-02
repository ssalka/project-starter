import * as path from 'path';
import * as webpack from 'webpack';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const ROOT = path.resolve(__dirname);
const DIST = path.resolve('./dist');
const CLIENT = path.resolve('./src/client');

const config = {
  devtool: 'source-map',
  context: ROOT,
  entry: ['./src/client/index.ts'],
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
    extensions: ['.js', '.ts']
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
  config.plugins.push(
    new ForkTsCheckerWebpackPlugin({
      tsconfig: './config/tsconfig.client.json'
    })
  );
}

export default config;
