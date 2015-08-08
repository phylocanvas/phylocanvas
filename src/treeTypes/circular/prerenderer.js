import { constants } from 'phylocanvas-utils';

const { Angles } = constants;

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
      let node = tree.leaves[i];

      node.angle = step * i;
      node.startx = ((node.parent.totalBranchLength * tree.branchScalar)) * Math.cos(node.angle);
      node.starty = ((node.parent.totalBranchLength * tree.branchScalar)) * Math.sin(node.angle);
      node.centerx = ((node.totalBranchLength * tree.branchScalar)) * Math.cos(node.angle);
      node.centery = ((node.totalBranchLength * tree.branchScalar)) * Math.sin(node.angle);
      node.labelOffsetX = ((r + node.getNodeSize() * 4) * Math.cos(node.angle)) - node.centerx;
      node.labelOffsetY = ((r + node.getNodeSize() * 4) * Math.sin(node.angle)) - node.centery;

      for (; node.parent; node = node.parent) {
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
