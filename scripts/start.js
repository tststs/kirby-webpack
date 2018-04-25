process.env.NODE_ENV = 'development'

const path = require('path')
const php = require('@pqml/node-php-server')
const env = require('../config/env.config')
const paths = require('../config/paths.config')
const webpackConfig = require('../config/webpack.config')
const processConfig = require('./utils/processConfig')
const webpack = require('webpack')

const server = php({
  root: paths.www,
  host: '0.0.0.0',
  port: '8080',
  verbose: true
})

const compiler = webpack(processConfig(webpackConfig))

server.once('start', data => {
  compiler.watch({
    aggregateTimeout: 300,
    poll: undefined
  }, onCompile)
})

server.start()


function onCompile(err, stats) {
  console.log(stats.compilation.errors[0])
}