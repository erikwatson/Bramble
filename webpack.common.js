const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const path = require('path')

module.exports = {
  entry: './src/bramble.ts',

  target: 'web',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bramble.js',
    publicPath: '/js/',
    library: 'Bramble',
    libraryTarget: 'umd'
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.webpack.js', '.web.js', '.ts', '.js']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /(node_modules|dist)/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  },

  plugins: [new BundleAnalyzerPlugin()]
}
