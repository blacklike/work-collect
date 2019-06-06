const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackMerge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpackBaseConfig = require('./webpack.base')
const { getEntrys, getEntryPath } = require('../tools/until')

const entries = getEntrys(getEntryPath())

const plugins = Object.keys(entries).map(name => {
  return new HtmlWebpackPlugin({
    filename: `${name}.html`,
    template: 'index.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    },
    chunks: [name]
  })
})

const prodWebpackConfig = {
  mode: 'production',
  entry: entries,
  output: {
    path: path.join(__dirname, '..', 'build'),// 出口文件的目录
    filename: '[name].js',// 文件的名称
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[local]__[hash:base64:5]',
              sourceMap: false
            }
          },
          {
            loader: 'less-loader',
            options: {
                sourceMap: false
            }
          }
        ],
      include: [path.join(__dirname, '../src')]
      },
      {
        test: /\.less$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: false,
              localIdentName: '[local]__[hash:base64:5]',
              sourceMap: true
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourcemap: false,
              javascriptEnabled: true
            }
          }
        ],
        include: [path.join(__dirname, '../node_modules/')]
      },
    ]
  },
  plugins: plugins.concat([
    new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[name].css',
        // allChunks: true // 将按需加载里的css提取出来
    })
  ])
}

module.exports = webpackMerge(webpackBaseConfig, prodWebpackConfig)