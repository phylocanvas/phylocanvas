var path = require('path');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './index',
  output: {
    path: __dirname,
    filename: 'phylocanvas.js',
    library: 'PhyloCanvas',
    libraryTarget: 'umd'
  }
};
