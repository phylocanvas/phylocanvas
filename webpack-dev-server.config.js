const path = require('path');

const sourceConfig = require('./webpack.config')[0];
sourceConfig.debug = true;

module.exports = {
  context: path.join(__dirname, 'dev'),
  devtool: '#eval-source-map',
  debug: true,
  entry: './index',
  module: {
    loaders: [
      { test: /\.js$/,
        loader: 'babel',
        exclude: path.join(__dirname, 'node_modules'),
        query: {
          presets: [ 'es2015', 'stage-0' ],
        },
      },
    ],
  },
  output: {
    filename: 'phylocanvas-dev.js',
  },
  target: 'web',
};
