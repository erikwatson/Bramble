import path from 'path';
import { fileURLToPath } from 'url';
import { merge } from 'webpack-merge';
import common from './webpack.common.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = 5656;

export default merge(common, {
  mode: 'development',

  devtool: 'source-map',

  devServer: {
    static: path.join(__dirname, ''),
    compress: true,
    port
  }
});
