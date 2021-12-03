const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var PrettierPlugin = require("prettier-webpack-plugin");

// Try the environment variable, otherwise use root
const ASSET_PATH = process.env.ASSET_PATH || "";
// Try the environment variable, otherwise use localhost
const AUTH_SERVER = process.env.AUTH_SERVER || "";

try {
  require("os").networkInterfaces();
} catch (e) {
  require("os").networkInterfaces = () => ({});
}

module.exports = {
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: ASSET_PATH,
  },
  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: "all",
      maxSize: 3000000,
      minSize: 1000000,
    },
  },
  module: {
    rules: [
      {
        test: /.js?$/,
        loaders: ["babel-loader"],
        include: path.resolve(__dirname),
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"],
      },
      {
        test: /.jsx?$/,
        loaders: ["babel-loader"],
        include: path.resolve(__dirname),
      },
      {
        test: /.less$/,
        loader: "style-loader!css-loader!less-loader",
      },
      {
        test: /\.mp3$/,
        loader: "file-loader",
        options: {
          name: "sounds/[name].[ext]",
        },
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff",
        options: {
          name: "fonts/[name].[ext]",
        },
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff",
        options: {
          name: "fonts/[name].[ext]",
        },
      },
      {
        test: /\.wasm$/,
        loader: "url-loader?mimetype=application/wasm",
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/octet-stream",
        options: {
          name: "fonts/[name].[ext]",
        },
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader",
        options: {
          name: "fonts/[name].[ext]",
        },
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=image/svg+xml",
        options: {
          name: "images/[name].[ext]",
        },
      },
      {
        test: /\.(jpg|jpeg|gif|png)$/,
        loader: "url-loader?limit=65000&name=images/[name].[ext]",
      },
      {
        test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/octet-stream",
        options: {
          name: "fonts/[name].[ext]",
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: `"production"`,
        ASSET_PATH: JSON.stringify(ASSET_PATH),
        AUTH_SERVER: JSON.stringify(AUTH_SERVER),
      },
    }),
    new PrettierPlugin(),
    new CopyWebpackPlugin([
      { from: "./src/static", ignore: ["*.html"] },
      "./public/manifest.json",
    ]),
    new CopyWebpackPlugin([
      { from: "./node_modules/@voxeet/voxeet-web-sdk/dist/dvwc_impl.wasm" },
      { from: "./node_modules/@voxeet/voxeet-web-sdk/dist/voxeet-dvwc-worker.js" },
      { from: "./node_modules/@voxeet/voxeet-web-sdk/dist/voxeet-worklet.js" },
    ]),
    new HtmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
      js: /*process.env.ELECTRON ? ["preload.js"] :*/ [],
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};
