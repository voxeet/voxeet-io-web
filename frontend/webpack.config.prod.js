const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


// Try the environment variable, otherwise use root
const ASSET_PATH = process.env.ASSET_PATH || '';
// Try the environment variable, otherwise use localhost
const AUTH_SERVER = process.env.AUTH_SERVER || '';

try {
  require("os").networkInterfaces();
} catch (e) {
  require("os").networkInterfaces = () => ({});
}

module.exports = {
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    path: path.join(__dirname, "dist"),
    filename: '[name].bundle.js',
    // chunkFilename: '[id].[chunkhash].js',
    publicPath: ASSET_PATH,
  },
  mode: 'production',
  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: 'all',
      maxSize:5000000,
      minSize:1000000,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "initial",
        },
      },
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /.js?$/,
        use: ["babel-loader"],
        include: path.resolve(__dirname),
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ],
      },
      {
        test: /.jsx?$/,
        use: ["babel-loader"],
        include: path.resolve(__dirname),
      },
      {
        test: /\.mp3$/,
        // use: "file-loader",
        type: 'asset/resource',
        generator: {
          filename: "sounds/[name].[ext]",
        },
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        // use: "url-loader?limit=10000&mimetype=application/font-woff",
        type: 'asset/resource',
        generator: {
          filename: "fonts/[name].[ext]",
        },
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        // use: "url-loader?limit=10000&mimetype=application/font-woff",
        type: 'asset/resource',
        generator: {
          filename: "fonts/[name].[ext]",
        },
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        // use: "url-loader?limit=10000&mimetype=application/octet-stream",
        type: 'asset/resource',
        generator: {
          filename: "fonts/[name].[ext]",
        },
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        // use: "file-loader",
        type: 'asset/resource',
        generator: {
          filename: "fonts/[name].[ext]",
        },
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        // use: "url-loader?limit=10000&mimetype=image/svg+xml",
        type: 'asset/resource',
        generator: {
          filename: "images/[name].[ext]",
        },
      },
      {
        test: /\.(jpg|jpeg|gif|png)$/,
        type: 'asset/resource',
        generator: {
          filename: "images/[name].[ext]",
        },
        // use: "url-loader?limit=65000&name=images/[name].[ext]",
      },
      {
        test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
        // use: "url-loader?limit=10000&mimetype=application/octet-stream",
        type: 'asset/resource',
        generator: {
          filename: "fonts/[name].[ext]",
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
    new CopyPlugin({
      patterns: [
        { from: "./src/static"},
        { from: "./node_modules/@voxeet/react-components/dist/fonts", to:'./fonts'},
        { from: "./node_modules/@voxeet/react-components/dist/images", to:'./images'},
        { from: "./node_modules/@voxeet/react-components/dist/sounds", to:'./sounds'},
        "./public/manifest.json",
      ]
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
      js: /*process.env.ELECTRON ? ["preload.js"] :*/ [],
    }),
    // new webpack.NoEmitOnErrorsPlugin(),
  ],
};
