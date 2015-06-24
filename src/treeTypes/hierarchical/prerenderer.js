var Angles = require('../../utils/constants').Angles;

module.exports = {
  step: function (tree) {
    return Math.max(tree.canvas.canvas.width / (tree.leaves.length + 2),
                    (tree.leaves[0].getNodeSize() + 2) * 2);
  },
  calculate: function (tree, xstep) {
    tree.branchScalar = tree.canvas.canvas.height / tree.maxBranchLength;

    for (var i = 0; i < tree.leaves.length; i++) {
      tree.leaves[i].angle = Angles.QUARTER;
      tree.leaves[i].centerx = (i > 0 ? tree.leaves[i - 1].centerx + xstep : 0);
      tree.leaves[i].centery = tree.leaves[i].totalBranchLength * tree.branchScalar;

      for (var nd = tree.leaves[i]; nd.parent; nd = nd.parent) {
        if (nd.getChildNo() === 0) {
          nd.parent.centerx = nd.centerx;
        }

        if (nd.getChildNo() === nd.parent.children.length - 1) {
          nd.parent.angle = Angles.QUARTER;
          nd.parent.centerx = (nd.parent.centerx + nd.centerx) / 2;
          nd.parent.centery = nd.parent.totalBranchLength * tree.branchScalar;
          for (var j = 0; j < nd.parent.children.length; j++) {
            nd.parent.children[j].startx = nd.parent.centerx;
            nd.parent.children[j].starty = nd.parent.centery;
          }
        } else {
          break;
        }
      }
      // Assign x,y position of the farthest node from the root
      if (tree.leaves[i].centerx > tree.farthestNodeFromRootX) {
        tree.farthestNodeFromRootX = tree.leaves[i].centerx;
      }
      if (tree.leaves[i].centery > tree.farthestNodeFromRootY) {
        tree.farthestNodeFromRootY = tree.leaves[i].centery;
      }
    }
  }
};
