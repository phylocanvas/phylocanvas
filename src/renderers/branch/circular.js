module.exports = {
  draw: function (tree, node) {
    var branchLength = node.totalBranchLength * tree.branchScalar;

    node.canvas.beginPath();
    node.canvas.moveTo(node.startx, node.starty);
    if (node.leaf) {
      node.canvas.lineTo(node.interx, node.intery);
      node.canvas.stroke();
    } else {
      node.canvas.lineTo(node.centerx, node.centery);
      node.canvas.stroke();
    }
    node.canvas.closePath();

    node.canvas.strokeStyle = node.getColour();

    if (node.children.length > 1 && !node.collapsed) {
      node.canvas.beginPath();
      node.canvas.arc(0, 0, branchLength, node.minChildAngle, node.maxChildAngle, node.maxChildAngle < node.minChildAngle);
      node.canvas.stroke();
      node.canvas.closePath();
    }
  }
};
