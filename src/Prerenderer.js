
/**
 * Calculates the tree dimensions before the first draw.
 *
 * @class
 */
class Prerenderer {

  /**
   * @constructor
   * @param {Object} options
   * @param {function} options.getStep - should return the space between each branch.
   * @param {function} options.calculate
   */
  constructor(options) {
    this.getStep = options.getStep;
    this.calculate = options.calculate;
  }

  /**
   * @param {Tree}
   */
  run(tree) {
    var step = this.getStep(tree);

    tree.root.startx = 0;
    tree.root.starty = 0;
    tree.root.centerx = 0;
    tree.root.centery = 0;
    tree.farthestNodeFromRootX = 0;
    tree.farthestNodeFromRootY = 0;
    tree.currentBranchScale = 1;
    tree.step = step;

    this.calculate(tree, step);

    tree.initialBranchScalar = tree.branchScalar;

    // Assign root startx and starty
    tree.root.startx = tree.root.centerx;
    tree.root.starty = tree.root.centery;
    // Set font size for tree and its branches
    tree.setFontSize(step);
    tree.setMaxLabelLength();
  }

}

export default Prerenderer;
