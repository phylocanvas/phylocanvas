var path = require('path');

module.exports = [
  { context: path.join(__dirname, 'dev'),
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
  }, {
    context: path.join(__dirname, 'test'),
    devtool: '#eval-source-map',
    debug: true,
    entry: './spec/test',
    module: {
      loaders: [
        { test: /\.js$/,
          loader: 'mocha!babel?stage=0',
          exclude: path.join(__dirname, 'node_modules')
        }
      ]
    },
    output: {
      filename: 'phylocanvas-test.js'
    },
    target: 'web'
  },
  require('./webpack.config')[0] // phylocanvas source
];
