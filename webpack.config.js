const path = require('path');
const webpack = require('webpack');

function config(options) {
  const plugins = [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ];

  if (options.minify) {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false,
        },
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
      libraryTarget: 'umd',
    },
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
    plugins: plugins,
    target: 'web',
  };
}

const polyfillConfig = {
  entry: './src/polyfill',
  output: {
    filename: 'polyfill.js',
  },
};

module.exports = [
  config({ minify: false }),
  config({ minify: true }),
  polyfillConfig,
];
