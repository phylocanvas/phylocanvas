var Angles = require('../../utils/constants').Angles;

function prerenderNodes(tree, node) {
  if (node.parent) {
    node.startx = node.parent.centerx;
    node.starty = node.parent.centery;
  } else {
    node.startx = 0;
    node.starty = 0;
  }
  node.centerx = node.startx + (node.branchLength * tree.branchScalar * Math.cos(node.angle));
  node.centery = node.starty + (node.branchLength * tree.branchScalar * Math.sin(node.angle));

  for (var i = 0; i < node.children.length; i++) {
    prerenderNodes(tree, node.children[i]);
  }
}

module.exports = {
  step: function (tree) {
    return Angles.FULL / tree.leaves.length;
  },
  calculate: function (tree, step) {
    tree.branchScalar = Math.min(tree.canvas.canvas.width, tree.canvas.canvas.height) / tree.maxBranchLength;

    for (var i = 0.0; i < tree.leaves.length; i += 1.0) {
      tree.leaves[i].angle = step * i;
      tree.leaves[i].centerx = tree.leaves[i].totalBranchLength * tree.branchScalar * Math.cos(tree.leaves[i].angle);
      tree.leaves[i].centery = tree.leaves[i].totalBranchLength * tree.branchScalar * Math.sin(tree.leaves[i].angle);

      for (var nd = tree.leaves[i]; nd.parent; nd = nd.parent) {
        if (nd.getChildNo() === 0) {
          nd.parent.angle = 0;
        }
        nd.parent.angle += (nd.angle * nd.getChildCount());
        if (nd.getChildNo() === nd.parent.children.length - 1) {
          nd.parent.angle = nd.parent.angle / nd.parent.getChildCount();
        } else {
          break;
        }
      }
    }

    prerenderNodes(tree, tree.root);
  }
};
