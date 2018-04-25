const path = require('path')
const paths = require('../../config/paths.config')
const kirby = require(path.resolve(paths.config, 'kirbywebpack.config.js'))
const env = require(path.resolve(paths.config, 'env.config.js'))

module.exports = function processConfig (config) {
  const entries = Array.isArray(kirby.entries)
    ? kirby.entries.reduce((a, b) => { a[b] = b; return a }, {})
    : kirby.entries

  if (!config.entry) config.entry = {}
  if (!config.output) config.output = {}

  // setup entries
  for (let id in entries) {
    config.entry[id] = Array.isArray(entries[id]) ? entries[id] : [entries[id]]
  }


  const buildPath = env.IS_DEV
    ? path.resolve(paths.build, '.kirbywebpack-devbuilds')
    : paths.build

  const relDist = path.relative(paths.www, buildPath)

  config.output.path = paths.www
  config.output.publicPath = paths.baseUrl
  config.output.filename = path.join(relDist, '[name]-[hash].js')
  config.output.chunkFilename = path.join(relDist, 'chunk-[chunkhash].js')


  if (env.IS_DEV) {
    config.output.hotUpdateMainFilename = path.join(relDist, '[hash].hot-update.json')
    config.output.hotUpdateChunkFilename = path.join(relDist, '[id].[hash].hot-update.js')
  }

  console.log(config)

  return config
}