import { Angles } from '../../utils/constants';

export default {
  getStep(tree) {
    return Math.max(tree.canvas.canvas.height / (tree.leaves.length + 2), (tree.leaves[0].getNodeSize() + 2) * 2);
  },
  calculate(tree, ystep) {
    for (let i = 0; i < tree.leaves.length; i++) {
      tree.leaves[i].centerx = 0;
      tree.leaves[i].centery = (i > 0 ? tree.leaves[i - 1].centery + ystep : 0);
      tree.leaves[i].angle = 0;

      for (let node = tree.leaves[i]; node.parent; node = node.parent) {
        if (node.getChildNo() === node.parent.children.length - 1) {
          node.parent.centery = node.parent.getChildYTotal() / node.parent.getChildCount(); // (node.parent.children.length - 1);
          node.parent.centerx = node.parent.children[0].centerx + ((node.parent.children[0].centery - node.parent.centery) * Math.tan(Angles.FORTYFIVE));
          for (let j = 0; j < node.parent.children.length; j++) {
            node.parent.children[j].startx = node.parent.centerx;
            node.parent.children[j].starty = node.parent.centery;
          }
        } else {
          break;
        }
      }
    }
  }
};
