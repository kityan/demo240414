/* eslint @typescript-eslint/no-var-requires: 0 */
/* eslint-env node */

const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")
const { webpack, DefinePlugin } = require("webpack")

module.exports = (env, argv) => {

  const isProduction = argv.mode === "production"

  const config = {
    context: path.resolve(__dirname, "src"),
    entry: "./index.tsx",
    devtool: isProduction ? undefined : "source-map",
    output: {
      publicPath: "/",
      path: path.join(__dirname, "/dist"),
      filename: isProduction ? "[name].[chunkhash].js" : "[name].js",
      clean: true,
    },
    devServer: {
      open: true,
      liveReload: false,
      static: "./dist",
      port: 8080,
      host: "127.0.0.1",
      client: {
        progress: true,
      },
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: "babel-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.tsx?$/,
          use: ["babel-loader", "ts-loader"], // 'babel-loader' (reason: i18n plugin)
          exclude: /node_modules/,
        },
        {
          test: /\.module\.(scss|sass)$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                sourceMap: !isProduction,
                importLoaders: 1,
                modules: {
                  localIdentName: isProduction ? "[local]_[hash:base64:5]" : "[name]_[local]_[hash:base64:5]",
                },
              },
            },
            "sass-loader",
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.(scss|sass)$/,
          use: [
            "style-loader",
            "css-loader",
            "sass-loader",
          ],
          exclude: [
            /\.module\.(scss|sass)$/,
            /node_modules/,
          ],
        },
        {
          test: /\.(css)$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
          exclude: [
            /\.module\.(css)$/,
          ],
        },
        {
          test: /\.(png|svg)$/i,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 8192,
                esModule: false,
              },
            },
          ],
          type: "javascript/auto",
        },
      ],
    },
    resolve: {
      extensions: [".jsx", ".ts", ".js", ".tsx"],
    },

    plugins: [
      new DefinePlugin({
        webpack_isProduction: isProduction ? "true" : "false",
        webpack_appVersion: JSON.stringify(require("./package.json").version),
      }),
      // new BundleAnalyzerPlugin(),
      new HtmlWebpackPlugin({
        template: "./assets/index.html",
      }),
      new MiniCssExtractPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          { from: "./assets/favicon.png", to: "./favicon.png" },
        ],
      }),

    ],
  }

  return config

}
