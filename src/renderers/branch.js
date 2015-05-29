var rectangular = require('./branch/rectangular');
var circular = require('./branch/circular');
var radial = require('./branch/radial');
var diagonal = require('./branch/diagonal');
var hierarchical = require('./branch/hierarchical');

function createBranchRenderer(options) {
  var i;

  return function renderBranch(tree, branch, collapse) {
    if (collapse) return;

    if (branch.selected) {
      branch.canvas.fillStyle = tree.selectedColour;
    } else {
      branch.canvas.fillStyle = branch.colour;
    }
    branch.canvas.strokeStyle = branch.getColour();

    options.render(tree, branch);

    branch.drawNode();

    for (i = 0; i < branch.children.length; i++) {
      if (options.prepareChild) {
        options.prepareChild(branch, branch.children[i]);
      }
      renderBranch(tree, branch.children[i], branch.collapsed || collapse);
    }
  };
}

module.exports = {
  rectangular: createBranchRenderer(rectangular),
  circular: createBranchRenderer(circular),
  radial: createBranchRenderer(radial),
  diagonal: createBranchRenderer(diagonal),
  hierarchical: createBranchRenderer(hierarchical)
};
