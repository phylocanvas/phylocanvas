const path = require('path');
const webpack = require('webpack');

const plugins = [
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),
];

const uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
  compressor: {
    warnings: false,
  },
});

function config(options) {
  return {
    context: path.join(__dirname, 'src'),
    entry: './index',
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/dist/',
      filename: options.minify ? 'phylocanvas.min.js' : 'phylocanvas.js',
      library: 'Phylocanvas',
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
    plugins: options.minify ? plugins.concat([ uglifyPlugin ]) : plugins,
    target: 'web',
  };
}

const polyfillConfig = {
  entry: './src/polyfill',
  output: {
    filename: 'polyfill.js',
  },
  plugins: [ uglifyPlugin ],
};

module.exports = [
  config({ minify: false }),
  config({ minify: true }),
  polyfillConfig,
];
