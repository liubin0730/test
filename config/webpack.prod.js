const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const base = require('./webpack.base.js')
const buildConfig = require('./config')
const isPro = process.env.NODE_ENV === "production"
const outputName = isPro ? buildConfig.outputName : buildConfig.outputNameTest;

module.exports = merge(base, {
  mode: 'production',
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: 'vendor',
          name: "vendor",
          chunks: "all"
        }
      }
    },
    runtimeChunk: {
      name: 'runtime'
    },
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        terserOptions: {
          output: {
            comments: false
          }
        }
      }),
      new OptimizeCssAssetsPlugin({})
    ]
  },
  plugins: [
    new CleanWebpackPlugin(outputName, {
      root: process.cwd()
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': isPro ? '"production"' : '"testing"',
        'API_BASE': isPro ? JSON.stringify(buildConfig.apiBase) : JSON.stringify(buildConfig.apiBaseTest)
      }
    }),
    new MiniCssExtractPlugin({
      filename: `${buildConfig.staticName}/[name].css`,
      chunkFilename: `${buildConfig.staticName}/[name].[chunkhash:${buildConfig.hashLength}].css`
    })
  ],
  output: {
    publicPath: isPro ? buildConfig.cdnPublicPath : buildConfig.publicPath,
    filename: `${buildConfig.staticName}/[name].[contenthash:${buildConfig.hashLength}].js`,
    chunkFilename: `${buildConfig.staticName}/[name].[chunkhash:${buildConfig.hashLength}].bundle.js`,
    path: path.resolve(__dirname, `../${outputName}`)
  }
})
