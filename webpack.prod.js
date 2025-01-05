// const { merge } = require('webpack-merge');
const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',

  output: {
    filename: 'bramble.min.js',
    publicPath: '/js/'
  }

  // plugins: [new BundleAnalyzerPlugin()]
})
