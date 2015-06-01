function Prerenderer(options) {
  this.step = options.step;
  this.calculate = options.calculate;
}

Prerenderer.prototype.run = function (tree) {
  var step = this.step(tree);

  tree.root.startx = 0;
  tree.root.starty = 0;
  tree.root.centerx = 0;
  tree.root.centery = 0;
  tree.farthestNodeFromRootX = 0;
  tree.farthestNodeFromRootY = 0;

  this.calculate(tree, step);

  // Assign root startx and starty
  tree.root.startx = tree.root.centerx;
  tree.root.starty = tree.root.centery;
  // Set font size for tree and its branches
  tree.setFontSize(step);
  tree.setMaxLabelLength();
};

module.exports = Prerenderer;
