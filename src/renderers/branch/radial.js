module.exports = {
  draw: function (tree, node) {
    node.canvas.beginPath();
    node.canvas.moveTo(node.startx, node.starty);
    node.canvas.lineTo(node.centerx, node.centery);
    node.canvas.stroke();
    node.canvas.closePath();
  }
};
