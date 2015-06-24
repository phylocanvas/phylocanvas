import { Angles } from '../../utils/constants';

export default {
  getStep(tree) {
    return Angles.FULL / tree.leaves.length;
  },
  calculate(tree, step) {
    tree.branchScalar = Math.min(tree.canvas.canvas.width, tree.canvas.canvas.height) / tree.maxBranchLength;
    // work out radius of tree and the make branch scalar proportinal to the
    let r = (tree.leaves.length * tree.leaves[0].getNodeSize() * 2) / Angles.FULL;
    if (tree.branchScalar * tree.maxBranchLength > r) {
      r = tree.branchScalar * tree.maxBranchLength;
    } else {
      tree.branchScalar = r / tree.maxBranchLength;
    }

    for (let i = 0; i < tree.leaves.length; i++) {
      tree.leaves[i].angle = step * i;
      tree.leaves[i].startx = ((tree.leaves[i].parent.totalBranchLength * tree.branchScalar)) * Math.cos(tree.leaves[i].angle);
      tree.leaves[i].starty = ((tree.leaves[i].parent.totalBranchLength * tree.branchScalar)) * Math.sin(tree.leaves[i].angle);
      tree.leaves[i].centerx = ((tree.leaves[i].totalBranchLength * tree.branchScalar)) * Math.cos(tree.leaves[i].angle);
      tree.leaves[i].centery = ((tree.leaves[i].totalBranchLength * tree.branchScalar)) * Math.sin(tree.leaves[i].angle);

      tree.leaves[i].labelX = r * Math.cos(tree.leaves[i].angle);
      tree.leaves[i].labelY = r * Math.sin(tree.leaves[i].angle);

      tree.leaves[i].labelOffsetX = (r * Math.cos(tree.leaves[i].angle)) - tree.leaves[i].centerx;
      tree.leaves[i].labelOffsetY = (r * Math.sin(tree.leaves[i].angle)) - tree.leaves[i].centery;

      for (let node = tree.leaves[i]; node.parent; node = node.parent) {
        if (node.getChildNo() === 0) {
          node.parent.angle = node.angle;
          node.parent.minChildAngle = node.angle;
        }
        if (node.getChildNo() === node.parent.children.length - 1) {
          node.parent.maxChildAngle = node.angle;
          node.parent.angle = (node.parent.minChildAngle + node.parent.maxChildAngle) / 2;
          node.parent.startx = ((node.parent.totalBranchLength - node.parent.branchLength) * tree.branchScalar) * Math.cos(node.parent.angle);
          node.parent.starty = ((node.parent.totalBranchLength - node.parent.branchLength) * tree.branchScalar) * Math.sin(node.parent.angle);
          node.parent.centerx = (node.parent.totalBranchLength * tree.branchScalar) * Math.cos(node.parent.angle);
          node.parent.centery = (node.parent.totalBranchLength * tree.branchScalar) * Math.sin(node.parent.angle);
        } else {
          break;
        }
      }
    }
  }
};
