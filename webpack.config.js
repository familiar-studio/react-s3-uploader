const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');


module.exports = {
  entry: './src/react-uploader/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'react-uploader.js',
    library: 'ReactUploader'
  },

  resolve: {
    alias: {
      'jquery-ui': 'jquery-ui-dist/jquery-ui.js',
      modules: path.join(__dirname, 'node_modules')
    }
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-2', 'react']
        }
      },
      {
        test: /\.scss$|.css$/,
        use: extractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader'
        })
      },
      {
        test: /\.png$/,
        loader: 'url-loader'
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'window.jQuery' :'jquery'
    }),

    new htmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html')
    }),

    new extractTextWebpackPlugin({
      filename: 'react-uploader.css',
      disable: false
    })
  ],

  devServer: {
    port: 8080,
    compress: true,
    contentBase: path.resolve(__dirname, 'src')
  }
};