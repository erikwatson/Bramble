const presets = ['@babel/env']
const plugins = [
  'syntax-async-functions',
  'transform-async-to-generator',
  '@babel/plugin-syntax-dynamic-import'
]

module.exports = {
  presets,
  plugins
}
