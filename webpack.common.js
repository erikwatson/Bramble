const path = require('path')

module.exports = {
  entry: './src/bramble.js',

  target: 'web',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bramble.js',
    publicPath: '/js/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|dist)/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  }
}
