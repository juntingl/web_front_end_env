const WebpackDeepScopeAnalysisPlugin = require("webpack-deep-scope-plugin")
  .default;
const path = require("path");
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurifyCSSPlugin = require("purifycss-webpack");

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: "../"
            }
          },
          {
            loader: "css-loader",
            // Css modules，在 css shaking 的插件上还不支持
            options: {
            //   modules: true,
            //   localIdentName: "[name]_[local]--[hash:base64:5]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new WebpackDeepScopeAnalysisPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new PurifyCSSPlugin({
      // Give paths to parse for rules. These should be absolute!
      paths: glob.sync(path.join(__dirname, "./dist/*.html"))
    })
  ]
};
