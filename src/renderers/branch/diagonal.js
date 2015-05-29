module.exports = {
  render: function (tree, node) {
    node.angle = 0;
    node.canvas.beginPath();

    node.canvas.moveTo(node.startx, node.starty);
    node.canvas.lineTo(node.centerx, node.centery);
    node.canvas.stroke();

    node.canvas.closePath();
  },
  prepareChild: function (node, child) {
    child.startx = node.centerx;
    child.starty = node.centery;
  }
};
