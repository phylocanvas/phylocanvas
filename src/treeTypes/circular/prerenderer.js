import { Angles } from '../../utils/constants';

module.exports = {
  step: function (tree) {
    return Angles.FULL / tree.leaves.length;
  },
  calculate: function (tree, step) {
    tree.branchScalar = Math.min(tree.canvas.canvas.width, tree.canvas.canvas.height) / tree.maxBranchLength;
    // work out radius of tree and the make branch scalar proportinal to the
    var r = (tree.leaves.length * tree.leaves[0].getNodeSize() * 2) / Angles.FULL;
    if (tree.branchScalar * tree.maxBranchLength > r) {
      r = tree.branchScalar * tree.maxBranchLength;
    } else {
      tree.branchScalar = r / tree.maxBranchLength;
    }

    for (var i = 0; i < tree.leaves.length; i++) {
      tree.leaves[i].angle = step * i;
      tree.leaves[i].centery = r * Math.sin(tree.leaves[i].angle);
      tree.leaves[i].centerx = r * Math.cos(tree.leaves[i].angle);
      tree.leaves[i].starty = ((tree.leaves[i].parent.totalBranchLength * tree.branchScalar)) * Math.sin(tree.leaves[i].angle);
      tree.leaves[i].startx = ((tree.leaves[i].parent.totalBranchLength * tree.branchScalar)) * Math.cos(tree.leaves[i].angle);
      tree.leaves[i].intery = ((tree.leaves[i].totalBranchLength * tree.branchScalar)) * Math.sin(tree.leaves[i].angle);
      tree.leaves[i].interx = ((tree.leaves[i].totalBranchLength * tree.branchScalar)) * Math.cos(tree.leaves[i].angle);
      for (var nd = tree.leaves[i]; nd.parent; nd = nd.parent) {
        if (nd.getChildNo() === 0) {
          nd.parent.angle = nd.angle;
          nd.parent.minChildAngle = nd.angle;
        }
        if (nd.getChildNo() === nd.parent.children.length - 1) {
          nd.parent.maxChildAngle = nd.angle;
          nd.parent.angle = (nd.parent.minChildAngle + nd.parent.maxChildAngle) / 2;
          nd.parent.centery = (nd.parent.totalBranchLength * tree.branchScalar) * Math.sin(nd.parent.angle);
          nd.parent.centerx = (nd.parent.totalBranchLength * tree.branchScalar) * Math.cos(nd.parent.angle);
          nd.parent.starty = ((nd.parent.totalBranchLength - nd.parent.branchLength) * tree.branchScalar) * Math.sin(nd.parent.angle);
          nd.parent.startx = ((nd.parent.totalBranchLength - nd.parent.branchLength) * tree.branchScalar) * Math.cos(nd.parent.angle);
        } else {
          break;
        }
      }
    }
  }
};
