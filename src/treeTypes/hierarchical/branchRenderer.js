export default {
  draw(tree, node) {
    const branchLength = node.branchLength * tree.branchScalar;

    if (node.parent) {
      node.centery = node.starty + branchLength;
    }

    node.canvas.beginPath();

    if (node !== node.tree.root) {
      node.canvas.moveTo(node.startx, node.starty);
      node.canvas.lineTo(node.centerx, node.starty);
    }

    node.canvas.lineTo(node.centerx, node.centery);
    node.canvas.stroke();

    node.canvas.closePath();
  },
  prepareChild(node, child) {
    child.startx = node.centerx;
    child.starty = node.centery;
  },
};
