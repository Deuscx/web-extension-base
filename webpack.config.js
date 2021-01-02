const path = require("path");
const paths = require("./config/paths");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const resolve = (relativePath) => path.resolve(__dirname, relativePath);
const isEnvDevelopment = process.env.NODE_ENV === "development";
const isEnvProduction = process.env.NODE_ENV === "production";

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

module.exports = {
  watch: isEnvDevelopment ? true : false,
  devtool: false,
  entry: {
    popup: paths.popupIndex,
    options: paths.optionsIndex,
    background: paths.backgroundJs,
  },
  output: {
    filename: "[name].js",
    path: paths.appBuild,
    chunkFilename: "[name].bundle.js",
  },
  resolve: {
    extensions: [
      ".tsx",
      ".ts",
      ".js",
      ".jsx",
      ".json",
      ".scss",
      ".css",
      ".sass",
    ],
    alias: {
      components: resolve("src/components"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        include: [paths.appSrc],
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        // For module CSS 
        test: [sassModuleRegex,cssModuleRegex],
        use: [
          isEnvDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              // Run `postcss-loader` on each CSS `@import`, do not forget that `sass-loader` compile non CSS `@import`'s into a single file
              // If you need run `sass-loader` and `postcss-loader` on each CSS `@import` please set it to `2`
              importLoaders: 1,
              // Automatically enable css modules for files satisfying `/\.module\.\w+$/i` RegExp.
              modules: {
                auto: true,
              },
            },
          },
          "postcss-loader",
          "sass-loader"
        ],
      },
      {
        // For Sass/SCSS - /\.((c|sa|sc)ss)$/i,
        test: sassRegex,
        exclude: sassModuleRegex,
        use: [
          isEnvDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                compileType: "icss",
              },
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        // For pure CSS - /\.css$/i,
        test: cssRegex,
        exclude: cssModuleRegex,
        use: [
          isEnvDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              // Run `postcss-loader` on each CSS `@import`, do not forget that `sass-loader` compile non CSS `@import`'s into a single file
              // If you need run `sass-loader` and `postcss-loader` on each CSS `@import` please set it to `2`
              importLoaders: 1,
            },
          },
          "postcss-loader",
          // Can be `less-loader`
          "sass-loader"
        ],
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
    ],
  },
  optimization: {
    splitChunks: {
      minChunks: 2, //当一个模块至少引入多少次，才进行代码分割
      cacheGroups: {
        vendors: {
          name: "vendors",
          test: /[\\/](node_modules|src\/_locales)[\\/]/,
          chunks: "all",
          minChunks: 1,
        },
      },
    },
    nodeEnv: "production",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].chunk.css",
    }),
    new HtmlWebpackPlugin({
      filename: "popup.html",
      template: paths.popupHtml,
      chunks: ["popup"],
    }),
    new HtmlWebpackPlugin({
      filename: "options.html",
      template: paths.optionsHtml,
      chunks: ["options"],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/manifest.json",
          to: "[name].[ext]",
        },
        {
          from: path.resolve(__dirname, "src", "assets"),
          to({ context, absoluteFilename }) {
            return `assets/${path.relative(context, absoluteFilename)}`;
          },
        },
        {
          from: 'node_modules/webextension-polyfill/dist/browser-polyfill.js',
          to: 'assets/js/',
        },
      ],
    }),
  ],
};
