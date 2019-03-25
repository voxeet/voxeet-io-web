const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

try {
  require('os').networkInterfaces()
} catch (e) {
  require('os').networkInterfaces = () => ({})
}

module.exports = {
  entry: [
    './src/index.js',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /.js?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
        include: path.resolve(__dirname),
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"]
      },
      {
        test: /.jsx?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
        include: path.resolve(__dirname),
      },
      {
        test: /.less$/,
        loader: "style-loader!css-loader!less-loader"
      },
      {
        test: /\.mp3$/,
        loader: 'file-loader',
        options: {
          name: 'sounds/[name].[ext]',
        }
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff",
        options: {
          name: 'fonts/[name].[ext]',
        }
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff",
        options: {
          name: 'fonts/[name].[ext]',
        }
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/octet-stream",
        options: {
          name: 'fonts/[name].[ext]',
        }
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader",
        options: {
          name: 'fonts/[name].[ext]',
        }
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=image/svg+xml",
        options: {
          name: 'images/[name].[ext]',
        }
      }, {
        test: /\.(jpg|jpeg|gif|png)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=65000&name=images/[name].[ext]'
      }
    ] 
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': `"production"`
      }
    }),
    new CopyWebpackPlugin(
      [
        { from: './src/static',ignore: [ '*.html' ]},
        "./public/manifest.json"
      ]
    ),
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      js: process.env.ELECTRON ? ["renderer.js"] : [],
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
