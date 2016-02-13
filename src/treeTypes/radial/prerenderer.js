import { constants } from '../../utils';

const { Angles } = constants;

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

  for (let i = 0; i < node.children.length; i++) {
    prerenderNodes(tree, node.children[i]);
  }
}

export default {
  getStep(tree) {
    return Angles.FULL / tree.leaves.length;
  },
  calculate(tree, step) {
    tree.branchScalar = Math.min(tree.canvas.canvas.width, tree.canvas.canvas.height) / tree.maxBranchLength;

    for (let i = 0.0; i < tree.leaves.length; i += 1.0) {
      tree.leaves[i].angle = step * i;
      tree.leaves[i].centerx = tree.leaves[i].totalBranchLength * tree.branchScalar * Math.cos(tree.leaves[i].angle);
      tree.leaves[i].centery = tree.leaves[i].totalBranchLength * tree.branchScalar * Math.sin(tree.leaves[i].angle);

      for (let node = tree.leaves[i]; node.parent; node = node.parent) {
        if (node.getChildNo() === 0) {
          node.parent.angle = 0;
        }
        node.parent.angle += (node.angle * node.getChildCount());
        if (node.getChildNo() === node.parent.children.length - 1) {
          node.parent.angle = node.parent.angle / node.parent.getChildCount();
        } else {
          break;
        }
      }
    }

    prerenderNodes(tree, tree.root);
  }
};
