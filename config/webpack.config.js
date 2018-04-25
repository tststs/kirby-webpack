const path = require('path')
const webpack = require('webpack')

const UglifyPlugin = require('uglifyjs-webpack-plugin')

const paths = require('./paths.config')
const env = require('./env.config')
const KirbyPlugin = require(path.resolve(paths.kirby.plugins, 'kirbywebpack/webpack/KirbyWebpackPlugin.js'))

// dev-specific options
const dev = {
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  loaders: {
    style: {
      loader: 'style-loader',
      options: { sourceMap: true }
    }
  },
  devtool: 'eval-source-map'
}

// prod-specific options
const prod = {
  plugins: [
    new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  devtool: 'source-map'
}

const currentEnv = env.IS_DEV ? dev : prod

module.exports = {
  mode: env.IS_DEV ? 'development' : 'production',
  devtool: currentEnv.devtool,

  // Entries and outputs are added by Kirby Webpack
  // See the /scripts folder to see how entries and outputs are generated

  resolve: {
    modules: [paths.node_modules, paths.src]
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: paths.src,
        loader: 'babel-loader',
        options: { cacheDirectory: true }
      },
      {
        test: /\.(css)$/,
        include: paths.src,
        use: (env.IS_DEV ? [dev.loaders.style] : []).concat([
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              url: false,
              minimize: !env.IS_DEV
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: { path: path.join(paths.config, 'postcss.config.js') }
            }
          }
        ])
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      DEV: JSON.stringify(env.IS_DEV),
      'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV)
    }),
    new KirbyPlugin({ paths })
  ].concat(currentEnv.plugins),

  // optimizations are only used in production mode
  optimization: {
    minimizer: [
      new UglifyPlugin({
        sourceMap: true,
        parallel: true,
        uglifyOptions: {
          mangle: true,
          keep_classnames: true,
          keep_fnames: false,
          compress: { inline: false, drop_console: true },
          output: { comments: false }
        }
      })
    ]
  },

  // Turn off performance hints
  performance: {
    hints: false
  }
}
