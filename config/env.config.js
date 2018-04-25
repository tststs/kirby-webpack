const path = require('path')

/**
 *
 * When using the script/start.js node script, NODE_ENV is set to development.
 * script/build.js set NODE_ENV to production.
 *
 * You can pass a specific app environement using `--app_env=ENVIRONEMENT`
 * when you call the start or build script.
 * e.g: node start.js --app_env=testing
 *
 * The APP_ENV variable is used for setting the baseUrl.
 *
 * All variables (NODE_ENV, APP_ENV, IS_DEV) can be accessed globally in your
 * javascript files.
 *
 */

const FORCED_APP_ENV = process.argv
  .slice(2)
  .reduce((out, v) => v.split(('--app_env=').trim())[1] || out, undefined)

const NODE_ENV = process.env.NODE_ENV || 'development'
const APP_ENV = FORCED_APP_ENV || process.env.APP_ENV || process.env.NODE_ENV || 'development'
const IS_DEV = (NODE_ENV === 'development')

module.exports = {
  APP_ENV,
  NODE_ENV,
  IS_DEV
}
