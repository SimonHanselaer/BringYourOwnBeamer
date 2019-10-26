const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, {mode}) => {
  console.log(mode);
  const isDevelopment = mode === 'development';
  return {
    output: {
      filename: '[name].[hash].js'
    },
    devServer: {
      overlay: true,
      hot: true
    },
    devtool: isDevelopment ? '#eval-source-map' : 'source-map', // For production
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-srcsets-loader',
              options: {
                attrs: [':src', ':srcset']
              }
            }
          ]
        },
        {
          test: /\.(jpe?g|png|svg|webp|mp3|ogg)$/,
          use: {
            loader: 'file-loader',
            options: {
              // limit: 1,
              context: './src',
              name: '[path][name].[ext]'
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            mode === 'production'
              ? MiniCssExtractPlugin.loader
              : 'style-loader',
            'css-loader',
            'resolve-url-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: [
                  require('postcss-import'),
                  postcssPresetEnv({stage: 0})
                ]
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: './src/index.html',
        filename: './index.html'
      }),
      new MiniCssExtractPlugin({
        filename: 'style.[contenthash].css'
      }),
      new OptimizeCSSAssetsPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ]
  };
};
