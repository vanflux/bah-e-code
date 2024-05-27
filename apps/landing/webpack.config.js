const { resolve } = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { DefinePlugin } = require("webpack");

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: resolve(__dirname, './src/index.tsx'),
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-typescript',
                ['@babel/preset-react', { development: isDevelopment, runtime: 'automatic' }],
              ],
              plugins: [
                isDevelopment && 'react-refresh/babel'
              ].filter(Boolean),
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ],
      },
    ],
  },
  output: {
    filename: '[name].[contenthash].js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true,
    allowedHosts: 'all',
    port: 3000
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
  },
  plugins: [
    new DefinePlugin({
      ENV: JSON.stringify(process.env.ENV),
      API_BASE_URL: JSON.stringify(process.env.API_BASE_URL),
      BUILD_TIME: JSON.stringify(new Date().toISOString())
    }),
    new MiniCssExtractPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, './public/index.html')
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public/assets',
          to: 'assets'
        },
      ],
    }),
  ].filter(Boolean)
}
