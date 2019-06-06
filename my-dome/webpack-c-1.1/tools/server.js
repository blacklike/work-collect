const webpack = require('webpack')
const express = require('express')
const bodyParser = require('body-parser')
const webpackConfig = require('../webpack/webpack.dev')

const app = express()
const compiler = webpack(webpackConfig)

const port = 4121

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, { log: () => { } })

// html5 router
app.use(require('connect-history-api-fallback')())

app.use(devMiddleware)
app.use(hotMiddleware)

app.use(bodyParser.json()) // 解析application/json
app.use(bodyParser.urlencoded({ extended: false })) // 解析 application/x-www-form-urlencoded

const url = `http://localhost:${port}`

devMiddleware.waitUntilValid(function () {
  console.log(`url=${url} \n`)
})

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
})
