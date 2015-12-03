var path = require('path');

var sourceConfig = require('./webpack.config')[0];
sourceConfig.debug = true;

module.exports = {
  context: path.join(__dirname, 'test'),
  devtool: '#eval-source-map',
  debug: true,
  entry: './spec/test',
  module: {
    loaders: [
      { test: /test\.js$/,
        loader: 'mocha',
        exclude: path.join(__dirname, 'node_modules'),
      },
      { test: /\.js$/,
        loader: 'babel?stage=0',
        exclude: path.join(__dirname, 'node_modules'),
      },
    ],
  },
  output: {
    filename: 'phylocanvas-test.js',
  },
  target: 'web',
};
