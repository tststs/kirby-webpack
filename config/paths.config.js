const path = require('path')
const fs = require('fs')
const env = require('./env.config')

// The root of your project (no need to change this)
const projectRoot = fs.realpathSync(path.join(__dirname, '..'))
// Use the rootResolve() fn to resolve a path from the root of your project:
const rootResolve = relPath => path.resolve(projectRoot, relPath)

/**
 * BASE URL
 * The absolute path to the root of your site
 * You can change it if you host your site in a sub-folder (e.g., /kirby-site/)
 * Keys are used to specify different envs. (development is used by default)
 *   - `development` is used with the `npm run start` script
 *   - `staging` is used with the `npm run build:staging` script
 *   - `production` is used with the `npm run build` script
 *
 * See env.config.js if you need other deployment environements
 */
const baseUrls = {
  development: '/',
  staging: '/',
  production: '/'
}

/**
 * PROJECT PATHS
 * Paths used by the kirby-webpack workflow.
 */
const projectPaths = {
  // The public folder of your site. This is the only folder to copy to your ftp.
  www: rootResolve('www'),
  // Folder containing your source code.
  // All your webpack entry files have to be in here:
  src: rootResolve('src'),
  // Path used by webpack to bundle your files.
  // This folder is automatically cleaned by webpack when building,
  // so you have to specify a folder containing webpack bundles only.
  // Be sure to put this folder inside the www one.
  build: rootResolve('www/assets/builds'),
}

/**
 * KIRBY PATHS
 * Paths used by kirby
 */
// Use the wwwResolve() fn to resolve a path from your site's public folder
const wwwResolve = relPath => path.resolve(projectPaths.www, relPath)
const kirbyPaths = {
  core: wwwResolve('kirby'),
  panel: wwwResolve('panel'),
  assets: wwwResolve('assets'),
  cache: wwwResolve('site/cache'),
  fields: wwwResolve('site/fields'),
  tags: wwwResolve('site/tags'),
  plugins: wwwResolve('site/plugins'),
  widgets: wwwResolve('site/widgets')
}

// Package all paths into a single object — no need to change this
module.exports = Object.assign({}, { kirby: kirbyPaths }, projectPaths, {
  baseUrl: baseUrls[env.APP_ENV] || baseUrls.development || '/',
  node_modules: rootResolve('node_modules'),
  config: rootResolve('config'),
  rootResolve,
})
