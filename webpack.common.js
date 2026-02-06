const CopyWebpackPlugin = require('copy-webpack-plugin');
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

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'dist/bramble.js',
          to: '../test/bramble.js',
        },
      ],
    })
  ]
}
