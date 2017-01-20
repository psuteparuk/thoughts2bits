const path = require('path');

exports.IS_PROD = process.env.ENV === 'production';

exports.path = {
  sourceDir: path.resolve(__dirname, '..', 'src'),
  staticDir: path.resolve(__dirname, '..', 'static')
}
