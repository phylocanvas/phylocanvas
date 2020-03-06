const path = require('path');
const webpack = require('webpack');
const babelrc = require('../babelrc.json');

module.exports = function (env = {}) {
  const page = env.page === true ? 'index' : env.page;
  return {
    devtool: 'source-map',
    // devServer: {
    //   port: 8008,
    // },
    entry: `./pages/${page}`,
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: babelrc,
          },
        },
        { test: /\.nwk$/, use: 'raw-loader' },
        { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
      ],
    },
    resolve: {
      modules: [
        'node_modules',
        path.resolve(__dirname, 'node_modules'),
      ],
      alias: {
        phylocanvas$: path.resolve(__dirname, 'node_modules', 'phylocanvas', 'index.js'),
      },
    },
    output: {
      filename: 'phylocanvas-dev.js',
    },
    plugins: [
      new webpack.DefinePlugin({
        PHYLOCANVAS_PAGE: JSON.stringify(page),
      }),
    ],
    target: 'web',
  };
};
