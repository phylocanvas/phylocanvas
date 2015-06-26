export default {
  draw(tree, node) {
    var branchLength = node.branchLength * tree.branchScalar;

    node.angle = 0;
    if (node.parent) {
      node.centerx = node.startx + branchLength;
    }

    node.canvas.beginPath();
    node.canvas.moveTo(node.startx, node.starty);
    node.canvas.lineTo(node.startx, node.centery);
    node.canvas.lineTo(node.centerx, node.centery);
    node.canvas.stroke();
    node.canvas.closePath();
  },
  prepareChild(node, child) {
    child.startx = node.centerx;
    child.starty = node.centery;
  }
};
