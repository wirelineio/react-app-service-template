//
// Copyright 2018 Wireline, Inc.
//

const path = require('path');

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  target: 'web',

  mode: 'development',
  
  stats: 'errors-only',

  // Source map shows the original source and line numbers (and works with hot loader).
  // https://webpack.github.io/docs/configuration.html#devtool
  devtool: '#source-map',


  // https://webpack.js.org/configuration/resolve
  resolve: {
    extensions: ['.js'],

    // Resolve imports/requires.
    modules: ['node_modules'],
  },

  entry: {
    app: [path.resolve('./src/app/index.js')]
  },

  output: {
    path: path.resolve('./dist/assets/'),
    filename: '[name].js',
    publicPath: '/assets/'
  },

  devServer: {
    compress: true,
    publicPath: '/assets/',
    port: 8080
  },

  // https://www.npmjs.com/package/html-webpack-plugin
  plugins: [
    new CopyWebpackPlugin([
      'assets'
    ]),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      )
    }),
    // process.env.NODE_ENV && new webpack.optimize.UglifyJsPlugin({ compress: true })
  ].filter(Boolean),

  module: {
    rules: [
      // See .babelrc for the presets.
      // https://github.com/babel/babel-loader
      {
        test: /\.js$/,
        exclude: /node_modules/, // Don't transpile deps.
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015', 'stage-0']
          }
        }
      },

      // https://github.com/webpack/json-loader
      {
        test: /\.json$/,
        use: {
          loader: 'json-loader'
        }
      },

      // https://github.com/webpack/css-loader
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },

      // https://github.com/webpack-contrib/url-loader
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      }
    ]
  }
};
