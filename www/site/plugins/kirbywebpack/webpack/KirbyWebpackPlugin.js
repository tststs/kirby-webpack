const path = require('path')
const fs = require('fs-extra')

module.exports = class KirbyWebpackPlugin {
  constructor ({ paths } = {}) {
    this.filepath = path.resolve(paths.kirby.plugins, 'kirbywebpack/manifest.php')
    fs.ensureFileSync(this.filepath)
  }

  apply (compiler) {
    console.log('wesh')
    compiler.plugin('emit', async (compilation, next) => {
      console.log(compilation.chunks)
      await fs.writeFile(this.filepath, 'yo')
      next()
    })
  }
}