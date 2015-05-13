var path = require('path');
var webpack = require('webpack');

module.exports = function (options) {
  var entry = './index';
  var plugins = [
    new webpack.NoErrorsPlugin()
  ];

  if (options.dev) {
    entry = [
      'webpack-dev-server/client?http://localhost:8000',
    //   'webpack/hot/only-dev-server',
      entry
    ];
  } else {
    plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      })
    );
  }

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
    devtool: options.dev ? 'eval' : null,
    debug: options.dev,
    entry: entry,
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/dist/',
      filename: options.minify ? 'phylocanvas.min.js' : 'phylocanvas.js',
      library: 'PhyloCanvas',
      libraryTarget: 'umd'
    },
    plugins: plugins
  };
};
