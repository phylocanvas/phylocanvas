var BranchRenderer = require('../BranchRenderer');

module.exports = {
  rectangular: new BranchRenderer(require('./branch/rectangular')),
  circular: new BranchRenderer(require('./branch/circular')),
  radial: new BranchRenderer(require('./branch/radial')),
  diagonal: new BranchRenderer(require('./branch/diagonal')),
  hierarchical: new BranchRenderer(require('./branch/hierarchical'))
};
