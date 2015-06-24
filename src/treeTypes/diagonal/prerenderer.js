var Angles = require('../../utils/constants').Angles;

module.exports = {
  step: function (tree) {
    return Math.max(tree.canvas.canvas.height / (tree.leaves.length + 2), (tree.leaves[0].getNodeSize() + 2) * 2);
  },
  calculate: function (tree, ystep) {
    for (var i = 0; i < tree.leaves.length; i++) {
      tree.leaves[i].centerx = 0;
      tree.leaves[i].centery = (i > 0 ? tree.leaves[i - 1].centery + ystep : 0);
      tree.leaves[i].angle = 0;

      for (var nd = tree.leaves[i]; nd.parent; nd = nd.parent) {
        if (nd.getChildNo() === nd.parent.children.length - 1) {
          nd.parent.centery = nd.parent.getChildYTotal() / nd.parent.getChildCount(); // (nd.parent.children.length - 1);
          nd.parent.centerx = nd.parent.children[0].centerx + ((nd.parent.children[0].centery - nd.parent.centery) * Math.tan(Angles.FORTYFIVE));
          for (var j = 0; j < nd.parent.children.length; j++) {
            nd.parent.children[j].startx = nd.parent.centerx;
            nd.parent.children[j].starty = nd.parent.centery;
          }
        } else {
          break;
        }
      }
    }
  }
};
