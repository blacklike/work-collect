const path = require('path')
const webpack = require('webpack')

// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const env = process.env.NODE_ENV
const devMode = env !== 'production'
const vendorPkg = [
  // 'react',
  // 'react-dom',
  // 'redux',
  // 'redux-thunk',
  // 'react-redux',
  // 'react-router-dom',
  // 'react-router-redux',
  // 'history',
  // 'prop-types',
  // 'react-loadable',
]

module.exports = {
  mode: 'production',
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    minimize: true,
    // minimizer: [
    //   // manifest文件是将每次打包都会更改的东西单独提取出来，保证没有更改的代码无需重新打包，这样可以加快打包速度
    //   new UglifyJsPlugin({
    //     cache: true,
    //     parallel: true,
    //     sourceMap: true 
    //   })
    // ],
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'all',
          priority: 2,
          // reuseExistingChunk: false,
          test: /node_modules\/(.*)\.js/
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  entry: {
    app: './app/index.js',
    // common: './app/common.js'
    // vendor: vendorPkg,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkname].js'
  },
  module: {
    rules: [
      {
        // js 文件中才能使用babel
        test: /\.js$/,
        // 使用哪个loader
        use: [{
          loader: 'babel-loader?cacheDirectory=true',
          options: {
            presets: ['@babel/preset-env'], // 配合.babelrc文件配置
            plugins: ['@babel/plugin-transform-runtime']
          }
        }],
        include: [
          path.resolve(__dirname, 'app')
        ],
        // 不包括的路径
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ]
      },
      {
        // 图片格式正则
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            // 配置url-loader的可选项
            options: {
              // 限制图片大小 10000B, 小于限制会将图片转换为 base64格式
              limit: 10000,
              // 超出限制, 创建的文件格式
              // build/assets/[图片名].[hash].[图片格式]
              name: 'assets/[name].[hash].[ext]'
            }
          }
        ]
      },
      {
        // css导入
        test: /\.(le|c)ss$/,
        // 将 CSS 代码整合进 JS 文件也是有弊端的，大量的 CSS 代码会造成 JS 文件的大小变大，操作 DOM 也会造成性能上的问题, 因此我们需要把css文件单独打一个包出来
        // 必须按照以下方式去书写
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  // 插件列表
  plugins: [
    // 输出文件路径
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? 'css/[name].css' : 'css/[name].[hash].css',
      chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[hash].css'
    }),
    // 清除不必要的文件
    new CleanWebpackPlugin(['dist/bundle.*.js','dist/manifest.*.js'], {
      // 打印 log
      verbose: true,
      // 删除文件
      dry: false
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      hash: true
    })
  ],
  // devServer: {
  //   // contentBase: path.join(__dirname, 'dist'),
  //   // compress: true,
  //   // port: 8082,
  //   host: 'dev.52shangou.com',
  //   historyApiFallback: true,
  //   overlay: true
  // }
}