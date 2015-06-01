var path = require('path');

module.exports = {
  devtool: 'eval',
  debug: true,
  context: path.join(__dirname, 'dev'),
  entry: './index',
  output: {
    filename: 'phylocanvas-dev.js'
  }
};
