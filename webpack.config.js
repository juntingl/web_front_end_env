const WebpackDeepScopeAnalysisPlugin = require("webpack-deep-scope-plugin").default;
const path = require("path");
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurifyCSSPlugin = require("purifycss-webpack");
const merge = require("webpack-merge");
const argv = require("yargs-parser")(process.argv.slice(2)); // 解析器
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const _mode = argv.mode || "development";
const prod = _mode === "production" ? true : false;
const _mergeConfig = require(`./build/webpack.${_mode}.config.js`);

// 对 iterm2 背景天加独有文字
const setIterm2Badge = require('set-iterm2-badge');
setIterm2Badge('SPA Web Webpack');

const webpackConfig = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
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
    // 不支持 module.exports 的方式, 只支持 ES6
    // 注意：
    // 1. babel 设置 module: false
    // 2. package.json 中定义 sideEffect: false
    new WebpackDeepScopeAnalysisPlugin(),
    // 此插件使用PurifyCSS从CSS中删除未使用的选择器。将它与// extract-text-webpack-plugin一起使用。
    new PurifyCSSPlugin({
      paths: glob.sync(path.join(__dirname, "./src/*.html"))
    }),
    new MiniCssExtractPlugin({
      filename: prod ? "css/[name].[hash:5].css" : "css/[name].css",
      chunkFilename: prod ? "css/[id].[hash:5].css" : "css/[id].css"
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin([ 'dist' ])
  ]
};

module.exports = merge(_mergeConfig, webpackConfig);
