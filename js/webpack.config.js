// @ts-check
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: './lib/index.js',
  experiments: {
    outputModule: true,
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
    library: { type: 'module' },
    clean: true,
  },
  cache: {
    type: 'filesystem',
    cacheDirectory: path.resolve(__dirname, '../build/.cache/webpack'),
  },
  module: {
    rules: [{ test: /\.js$/, loader: 'source-map-loader', enforce: 'pre' }],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    new webpack.ids.HashedModuleIdsPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: 'async',
      minChunks: 3,
    },
    minimize: true,
    minimizer: [new TerserPlugin({ extractComments: 'all' })],
  },
};
