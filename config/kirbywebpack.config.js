const path = require('path')
const paths = require('./paths.config')

/**
 * BUNDLE ENTRY FILES
 * All files will be passed to your webpack config.
 * /!\ Paths have to be relative to your src folder.
 * Kirby-webpack automaticaly take care of the output path.
*/
const entries = [
  'index.js',
  'index.scss'
]

/**
 * DEVELOPMENT CONFIGURATION
 * All files will be passed to your webpack config
 * Kirby-webpack take care of the output path
*/
const development = {
  // Your server url (e.g., kirby.local)
  // Set this to false to make kirby-webpack uses the PHP built-in server
  server: false,

  // Do not livereload specific files
  watchIgnore: [
    path.resolve(paths.kirby.plugins, 'page-lock')
  ],

  // PHP built-in options. Used when development.server is set to false.
  builtInOpts: {
    // The php binary called by kirby-webpack
    binary: 'php',
    // The host used by the PHP built-in server:
    // (0.0.0.0 is a good choice to serve your site both on localhost and LAN)
    host: '0.0.0.0',
    // The port used by the PHP built-in server:
    port: 8080,
    // Display PHP logs in your terminal:
    log: true
  }
}

/**
 * PATHS CONFIGURATION
 * You can edit kirby and kirby-webpack paths from ./paths.config.js
 * Also edit paths.config.js if you plan to host your site on a subfolder
*/

module.exports = { entries, development }
