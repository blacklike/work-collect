const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
// const opn = require('opn')
const path = require('path')
const webpackBaseConfig = require('./webpack.base')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { getEntrys, getEntryPath } = require('../tools/until')

const entries = getEntrys(getEntryPath())

Object.keys(entries).forEach(name => {
  entries[name] = ['webpack-hot-middleware/client?noInfo=true&reload=true'].concat(entries[name])
})


const plugins = Object.keys(entries).map(name => {
  return new HtmlWebpackPlugin({
    filename: `${name}.html`,
    template: 'index.html',
    inject: true,
    chunks: [name]
  })
})

const devWebpackConfig = {
  mode: "development",
  devtool: 'cheap-module-eval-source-map',
  entry: entries,
  output: {
    pathinfo: true,
    publicPath: `//dev.52shangou.com:4121/`
  },
  plugins: plugins.concat([
    /*设置开发环境*/
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.NamedModulesPlugin(),
    /*设置热更新*/
    new webpack.HotModuleReplacementPlugin()
  ])
}

module.exports = webpackMerge(webpackBaseConfig, devWebpackConfig)