var path = require('path');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './index',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/',
    filename: 'phylocanvas.js',
    library: 'PhyloCanvas',
    libraryTarget: 'umd'
  }
};
