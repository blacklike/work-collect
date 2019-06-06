
const path = require('path')


module.exports = {
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, '../src/assets'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@pages': path.resolve(__dirname, '../src/pages'),
      '@utils': path.resolve(__dirname, '../src/utils'),
      '@styles': path.resolve(__dirname, '../src/styles')
    },
    extensions: ['.js','.jsx']  // 默认文件后缀。在app.js中，直接引入App，而不是App.jsx。所有的js和jsx文件在引入时均可省略后缀
  },
  externals: {
    'react': 'window.React',
    'react-dom': 'window.ReactDOM'
  },
  module: {
    rules: [
      {
        test: /\.js|.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'less-loader', options: {
            sourceMap: true
          } }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
            }
          }
        ]
      }
    ]
  }
}