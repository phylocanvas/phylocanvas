export default {
  draw(tree, node) {
    node.canvas.beginPath();

    if (node !== node.tree.root) {
      node.canvas.moveTo(node.startx, node.starty);
      node.canvas.lineTo(node.centerx, node.starty);
    }

    node.canvas.lineTo(node.centerx, node.centery);
    node.canvas.stroke();

    node.canvas.closePath();
  }
};
