const path = require('path')
// const { merge } = require('webpack-merge');
const merge = require('webpack-merge');

const common = require('./webpack.common.js')

const port = 5656

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',

  devServer: {
    contentBase: path.join(__dirname, ''),
    compress: true,
    port
  }
})
