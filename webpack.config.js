//
// Copyright 2018 Wireline, Inc.
//

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');

module.exports = {
  target: 'node',

  mode: 'development',

  stats: 'errors-only',

  entry: {
    handler: [
      path.resolve('./handler.js')
    ]
  },

  output: {
    path: path.resolve('./dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },

  // https://webpack.js.org/configuration/devtool/
  devtool: 'source-map',

  devServer: {
    compress: true,
    publicPath: '/assets/',
    port: 8080
  },

  plugins: [
    new CopyWebpackPlugin([
      'wireline.yml'
    ]),
    new ZipPlugin({
      path: '../',
      filename: 'webpack.zip'
    }),

    // Issue with got https://github.com/sindresorhus/got/issues/345.
    new webpack.IgnorePlugin(/^electron$/),
    // The pg-native bindings are not needed.
    new webpack.IgnorePlugin(/\.\/native/, /\/pg\//),
    // The Swagger autogenerated API clients misbehave without this due to a problem with superagent.
    new webpack.DefinePlugin({ 'global.GENTLY': false })

  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,    // Don't transpile deps.
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  }
};
