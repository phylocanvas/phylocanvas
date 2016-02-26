import { constants } from '../../utils';

const { Angles } = constants;

export default {
  getStep(tree) {
    return tree.fillCanvas ?
      tree.canvas.canvas.width / tree.leaves.length :
      Math.max(tree.canvas.canvas.width / tree.leaves.length, tree.leaves[0].getDiameter() + tree.labelPadding);
  },
  calculate(tree, xstep) {
    tree.branchScalar = tree.canvas.canvas.height / tree.maxBranchLength;

    for (let i = 0; i < tree.leaves.length; i++) {
      tree.leaves[i].angle = Angles.QUARTER;
      tree.leaves[i].centerx = (i > 0 ? tree.leaves[i - 1].centerx + xstep : 0);
      tree.leaves[i].centery = tree.leaves[i].totalBranchLength * tree.branchScalar;

      for (let node = tree.leaves[i]; node.parent; node = node.parent) {
        if (node.getChildNo() === 0) {
          node.parent.centerx = node.centerx;
        }

        if (node.getChildNo() === node.parent.children.length - 1) {
          node.parent.angle = Angles.QUARTER;
          node.parent.centerx = (node.parent.centerx + node.centerx) / 2;
          node.parent.centery = node.parent.totalBranchLength * tree.branchScalar;
          for (let j = 0; j < node.parent.children.length; j++) {
            node.parent.children[j].startx = node.parent.centerx;
            node.parent.children[j].starty = node.parent.centery;
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
