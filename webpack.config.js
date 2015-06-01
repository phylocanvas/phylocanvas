var path = require('path');
var webpack = require('webpack');

function config(options) {
  var plugins = [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ];

  if (options.minify) {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      })
    );
  }

  return {
    context: path.join(__dirname, 'src'),
    entry: './index',
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/dist/',
      filename: options.minify ? 'phylocanvas.min.js' : 'phylocanvas.js',
      library: 'PhyloCanvas',
      libraryTarget: 'umd'
    },
    plugins: plugins
  };
}

module.exports = [
  config({ minify: false }),
  config({ minify: true })
];
