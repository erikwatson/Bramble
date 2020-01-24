const merge = require('webpack-merge')

const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',

  output: {
    filename: 'bramble.min.js',
    publicPath: '/js/'
  }
})
