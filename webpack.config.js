//
// Copyright 2018 Wireline, Inc.
//

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');

module.exports = {
  target: 'node',

  mode: 'develpment',

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
      'wireline.yml',
      { from: './src/hbs', to: './hbs'  }
    ]),
    new ZipPlugin({
      path: '../',
      filename: 'webpack.zip'
    })
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
