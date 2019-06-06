process.env.NODE_ENV = 'production';

const webpack = require('webpack')
const ora = require('ora')
const path = require('path')
const rm = require('rimraf')

const webpackConfig = require('../webpack/webpack.prod')

const spinner = ora('building...').start();


rm(path.join(__dirname, '../build'), err => {
  if (err) throw err
  webpack(webpackConfig, function (err1, stats) {
    spinner.stop()
    if (err1) throw err

    process.stdout.write(`${stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    })}\n\n`)
  })
})