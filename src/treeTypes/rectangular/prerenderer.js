module.exports = {
  getStep: function (tree) {
    return Math.max(tree.canvas.canvas.height / (tree.leaves.length + 2), (tree.leaves[0].getNodeSize() + 2) * 2);
  },
  calculate: function (tree, ystep) {
    // Calculate branchScalar based on canvas width and total branch length
    // This is used to transform the X coordinate based on the canvas width and no. of branches
    tree.branchScalar = tree.canvas.canvas.width / tree.maxBranchLength;

    // set initial positons of the branches
    for (var i = 0; i < tree.leaves.length; i++) {
      tree.leaves[i].angle = 0; // for rectangle
      // Calculate and assign y coordinate for all the leaves
      tree.leaves[i].centery = (i > 0 ? tree.leaves[i - 1].centery + ystep : 0);
      tree.leaves[i].centerx = tree.leaves[i].totalBranchLength * tree.branchScalar;

      // Assign x,y position of the farthest node from the root
      if (tree.leaves[i].centerx > tree.farthestNodeFromRootX) {
        tree.farthestNodeFromRootX = tree.leaves[i].centerx;
      }
      if (tree.leaves[i].centery > tree.farthestNodeFromRootY) {
        tree.farthestNodeFromRootY = tree.leaves[i].centery;
      }

      // Calculate and assign y coordinate for all the parent branches
      for (var branch = tree.leaves[i]; branch.parent; branch = branch.parent) {
        // Get all the children of a parent
        var childrenArray = branch.parent.children;
        // Assign parent's y coordinate
        // Logic: Total ystep of all the children of this parent / 2
        branch.parent.centery = (childrenArray[0].centery + childrenArray[childrenArray.length - 1].centery) / 2;
      }
    }
  }
};
