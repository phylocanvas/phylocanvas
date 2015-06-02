var path = require('path');

module.exports = {
  context: path.join(__dirname, 'dev'),
  devtool: '#eval-source-map',
  debug: true,
  entry: './index',
  module: {
    loaders: [
      { test: /\.js$/,
        loader: 'babel?stage=0',
        exclude: path.join(__dirname, 'node_modules')
      }
    ]
  },
  output: {
    filename: 'phylocanvas-dev.js'
  },
  target: 'web'
};
