var Prerenderer = require('../Prerenderer');

module.exports = {
  rectangular: new Prerenderer(require('./pre/rectangular')),
  circular: new Prerenderer(require('./pre/circular')),
  radial: new Prerenderer(require('./pre/radial')),
  diagonal: new Prerenderer(require('./pre/diagonal')),
  hierarchical: new Prerenderer(require('./pre/hierarchical'))
};
