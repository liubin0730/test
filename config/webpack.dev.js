const merge = require('webpack-merge')
const base = require('./webpack.base.js')
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const ip = require('ip')
// const mockRouter = require('../mock/router')
const buildConfig = require('./config')
const pages = require('./pages')
let host = buildConfig.host === '0.0.0.0' ? ip.address() : buildConfig.host

function createDevHistoryApiFallback () {
  if(!pages || !pages.length){
    return true
  }
  let reg = new RegExp('^' + buildConfig.publicPath + '(' + pages.join('|') + ')(\\/|$)')
  return {
    rewrites: [
      {
        from: reg,
        to(context) {
          return `${buildConfig.publicPath}${context.match[1]}.html`;
        }
      }
    ]
  }
}

let config = merge(base, {
  mode: 'development',
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"development"',
        'API_BASE': JSON.stringify(buildConfig.apiBaseTest)
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css'
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://${host}:${buildConfig.port}${buildConfig.publicPath}`],
      }
    })
  ],
  devtool: 'inline-source-map',
  output: {
    publicPath: buildConfig.publicPath,
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, `../${buildConfig.outputName}`)
  },
  devServer: {
    contentBase: [path.resolve(__dirname, `../${buildConfig.outputName}`)],
    // hot: true,
    host: host,
    port: buildConfig.port,
    historyApiFallback: createDevHistoryApiFallback(),
    quiet: true,
    // before: mockRouter,
    publicPath: buildConfig.publicPath,
    watchOptions         : {
        aggregateTimeout : 300,
        poll             : 1000,
    }
  }
})

module.exports = config
