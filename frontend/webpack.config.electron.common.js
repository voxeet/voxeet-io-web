const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var PrettierPlugin = require("prettier-webpack-plugin");

try {
  require("os").networkInterfaces();
} catch (e) {
  require("os").networkInterfaces = () => ({});
}

// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = path.resolve(__dirname, "src");

module.exports = configuration => {
  return [
    {
      mode: configuration.environment === 'production' ? 'production' : 'development',
      devtool: configuration.environment === 'production' ? 'source-map' : 'inline-source-map',
      entry: ["@babel/polyfill", "./src/index.js"],
      output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: configuration.asset_path
      },
      target: "electron-renderer",
      module: {
        rules: [
          {
            test: /.js?$/,
            loaders: ["babel-loader"],
            include: path.resolve(__dirname)
          },
          {
            test: /\.css$/,
            loaders: ["style-loader", "css-loader"]
          },
          {
            test: /.jsx?$/,
            loaders: ["babel-loader"],
            include: path.resolve(__dirname)
          },
          {
            test: /.less$/,
            loader: "style-loader!css-loader!less-loader"
          },
          {
            test: /\.mp3$/,
            loader: "file-loader",
            options: {
              name: "sounds/[name].[ext]"
            }
          },
          {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url-loader?limit=10000&mimetype=application/font-woff",
            options: {
              name: "fonts/[name].[ext]"
            }
          },
          {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url-loader?limit=10000&mimetype=application/font-woff",
            options: {
              name: "fonts/[name].[ext]"
            }
          },
          {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url-loader?limit=10000&mimetype=application/octet-stream",
            options: {
              name: "fonts/[name].[ext]"
            }
          },
          {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file-loader",
            options: {
              name: "fonts/[name].[ext]"
            }
          },
          {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url-loader?limit=10000&mimetype=image/svg+xml",
            options: {
              name: "images/[name].[ext]"
            }
          },
          {
            test: /\.(jpg|jpeg|gif|png)$/,
            loader: "url-loader?limit=65000&name=images/[name].[ext]"
          },
          {
            test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url-loader?limit=10000&mimetype=application/octet-stream",
            options: {
              name: "fonts/[name].[ext]"
            }
          }
        ]
      },
      plugins: [
        new webpack.DefinePlugin({
          "process.env": {
            NODE_ENV: JSON.stringify(configuration.environment),
            ASSET_PATH: JSON.stringify(configuration.asset_path),
            AUTH_SERVER: JSON.stringify(configuration.auth_server)
          }
        }),
        new PrettierPlugin(),
        new CopyWebpackPlugin([
          { from: "./src/static", ignore: ["*.html"] },
          "./public/favicon.ico",
          "./public/icon.png",
          "./public/manifest.json"
        ]),
        new HtmlWebpackPlugin({
          cache: false,
          showErrors: true,
          template: "./public/index.html",
          js: []
        }),
        new webpack.NoEmitOnErrorsPlugin()
      ]
    }
  ];
};
