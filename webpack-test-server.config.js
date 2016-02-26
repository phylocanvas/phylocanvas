const path = require('path');

const sourceConfig = require('./webpack.config')[0];
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
        loader: 'babel',
        exclude: path.join(__dirname, 'node_modules'),
        query: {
          presets: [ 'es2015', 'stage-0' ],
        },
      },
    ],
  },
  output: {
    filename: 'phylocanvas-test.js',
  },
  target: 'web',
};
