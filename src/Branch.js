import { Angles } from './utils/constants';
import { setupDownloadLink, createBlobUrl } from './utils/dom';

import nodeRenderers from './nodeRenderers';

/**
 * Creates a branch
 *
 * @constructor
 * @memberof PhyloCanvas
 * @public
 *
 */
function Branch() {
  /**
   * The angle clockwise from horizontal the branch is (Used paricularly for
   * Circular and Radial Trees)
   * @public
   *
   */
  this.angle = 0;

  /**
   * The Length of the branch
   */
  this.branchLength = false;

  /**
   * The Canvas DOM object the parent tree is drawn on
   */
  this.canvas = null;

  /**
   * The center of the end of the node on the x axis
   */
  this.centerx = 0;

  /**
   * The center of the end of the node on the y axis
   */

  this.centery = 0;
  /**
   * the branches that stem from this branch
   */
  this.children = [];

  /**
   * true if the node has been collapsed
   * @type Boolean
   */
  this.collapsed = false;

  /**
   * The colour of the terminal of this node
   */
  this.colour = 'rgba(0,0,0,1)';

  /**
   * an object to hold custom data for this node
   */
  this.data = {};

  /**
   * This node's unique ID
   */
  this.id = '';

  /**
   * when the branch drawing algorithm needs to switch. For example: where the
   * Circular algorithm needs to change the colour of the branch.
   */
  this.interx = 0;

  /**
   * when the branch drawing algorithm needs to switch. For example: where the
   * Circular algorithm needs to change the colour of the branch.
   */
  this.intery = 0;
  /**
   * The text lable for this node
   */
  this.label = null;

  /**
   * If true, this node have no children
   */
  this.leaf = true;

  /**
   * the angle that the last child of this brach 'splays' at, used for
   * circular and radial trees
   */
  this.maxChildAngle = 0;

  /**
   * the angle that the last child of this brach 'splays' at, used for
   * circular and radial trees
   */
  this.minChildAngle = Angles.FULL;

  /**
   * What kind of teminal should be drawn on this node
   */
  this.nodeShape = 'circle';

  /**
   * The parent branch of this branch
   */
  this.parent = null;

  /**
   * The relative size of the terminal of this node
   */
  this.radius = 1.0;

  /**
   * true if this branch is currently selected
   */
  this.selected = false;

  /**
   * the x position of the start of the branch
   * @type double
   */
  this.startx = 0;

  /**
   * the y position of the start of the branch
   * @type double
   */
  this.starty = 0;

  /**
   * The length from the root of the tree to the tip of this branch
   */
  this.totalBranchLength = 0;

  /**
   * The tree object that this branch is part of
   * @type Tree
   */
  this.tree = {};
}

Branch.prototype.clicked = function (x, y) {
  var i;
  var child;

  if (this.dragging) {
    return;
  }
  if ((x < (this.maxx) && x > (this.minx)) &&
      (y < (this.maxy) && y > (this.miny))) {
    return this;
  }

  for (i = this.children.length - 1; i >= 0; i--) {
    child = this.children[i].clicked(x, y);
    if (child) {
      return child;
    }
  }
};

Branch.prototype.drawMetadata = function () {
  var padMaxLabelWidth = 0;
  if (this.tree.showLabels || (this.tree.hoverLabel && this.highlighted)) {
    padMaxLabelWidth = this.tree.maxLabelLength[this.tree.treeType];
  }
  var tx = this.getLabelStartX() + padMaxLabelWidth;
  var ty = 0;
  var metadata = [];
  var height = this.tree.textSize;
  var width = this.tree.metadataXStep / 2;
  var i;
  var columnName;

  if (this.tree.nodeAlign) {
    if (this.tree.treeType === 'rectangular') {
      tx += (this.tree.farthestNodeFromRootX - this.centerx);
    } else if (this.tree.treeType === 'hierarchical') {
      tx += (this.tree.farthestNodeFromRootY - this.centery);
    }
  }

  if (!this.tree.metadataHeadingDrawn && this.tree.nodeAlign &&
    this.tree.treeType !== 'circular' && this.tree.treeType !== 'radial') {
    this.drawMetadataHeading(tx, ty);
    this.tree.metadataHeadingDrawn = true;
  }

  var metadataXStep = this.tree.metadataXStep;

  if (Object.keys(this.data).length > 0) {
    this.canvas.beginPath();

    // If no columns specified, then draw all columns
    if (this.tree.selectedMetadataColumns.length > 0) {
      metadata = this.tree.selectedMetadataColumns;
    } else {
      metadata = Object.keys(this.data);
    }

    ty = ty - (height / 2);

    for (i = 0; i < metadata.length; i++) {
      columnName = metadata[i];
      tx += metadataXStep;

      if (window.parseInt(this.data[columnName])) {
        this.canvas.fillStyle = this.tree.colour1;
        this.canvas.fillRect(tx, ty, width, height);
      } else if (window.parseInt(this.data[columnName]) === 0) {
        this.canvas.fillStyle = this.tree.colour0;
        this.canvas.fillRect(tx, ty, width, height);
      }
    }
    this.canvas.stroke();
    this.canvas.closePath();
  }
};

Branch.prototype.drawMetadataHeading = function (tx, ty) {
  var metadata;
  var columnName;
  var i;

  if (this.tree.selectedMetadataColumns.length > 0) {
    metadata = this.tree.selectedMetadataColumns;
  } else {
    metadata = Object.keys(this.data);
  }

  // Drawing Column headings
  this.canvas.font = '12px Sans-serif';
  this.canvas.fillStyle = 'black';

  for (i = 0; i < metadata.length; i++) {
    columnName = metadata[i];
    tx += this.tree.metadataXStep;
    // Rotate canvas to write column headings
    this.canvas.rotate(-Math.PI / 2);
    if (this.tree.treeType === 'rectangular') {
      this.canvas.textAlign = 'left';
      // x and y axes changed because of rotate
      // Adding + 6 to adjust the position
      this.canvas.fillText(columnName, 20, tx + 6);
    } else if (this.tree.treeType === 'hierarchical') {
      this.canvas.textAlign = 'right';
      this.canvas.fillText(columnName, -20, tx + 8);
    } else if (this.tree.treeType === 'diagonal') {
      this.canvas.textAlign = 'left';
      this.canvas.fillText(columnName, 20, tx + 6);
    }
    // Rotate canvas back to normal position
    this.canvas.rotate(Math.PI / 2);
  }
};

Branch.prototype.drawLabel = function () {
  var fSize = this.tree.textSize;
  var lbl = this.getLabel();
  var dimensions;
  var tx;
  var ty;

  this.canvas.font = fSize + 'pt ' + this.tree.font;
  dimensions = this.canvas.measureText(lbl);
  // finding the maximum label length
  if (this.tree.maxLabelLength[this.tree.treeType] === undefined) {
    this.tree.maxLabelLength[this.tree.treeType] = 0;
  }
  if (dimensions.width > this.tree.maxLabelLength[this.tree.treeType]) {
    this.tree.maxLabelLength[this.tree.treeType] = dimensions.width;
  }

  tx = this.getLabelStartX();
  ty = fSize / 2;
  // Setting 'tx' for rectangular and hierarchical trees if node align is TRUE
  if (this.tree.alignLabels) {
    tx += this.tree.labelAlign.getLabelOffset();

    if (this.tree.treeType === 'rectangular') {
      tx += (this.tree.farthestNodeFromRootX - this.centerx);
    } else if (this.tree.treeType === 'hierarchical') {
      tx += (this.tree.farthestNodeFromRootY - this.centery);
    }
  }
  if (this.angle > Angles.QUARTER &&
      this.angle < (Angles.HALF + Angles.QUARTER)) {
    this.canvas.rotate(Angles.HALF);
    // Angles.Half text position changes
    tx = -tx - (dimensions.width * 1);
  }

  this.canvas.beginPath();
  this.canvas.fillStyle = this.getTextColour();
  this.canvas.fillText(lbl, tx, ty);
  this.canvas.closePath();
  // Make canvas rotate back to actual position so that
  // metadata drawn after that will not be affected
  if (this.angle > Angles.QUARTER &&
      this.angle < (Angles.HALF + Angles.QUARTER)) {
    this.canvas.rotate(Angles.HALF);
  }
};

Branch.prototype.setNodeDimensions = function (centerX, centerY, radius) {
  let boundedRadius = radius;

  if ((radius * this.tree.zoom) < 5 || !this.leaf) {
    boundedRadius = 5 / this.tree.zoom;
  }

  this.minx = centerX - boundedRadius;
  this.maxx = centerX + boundedRadius;
  this.miny = centerY - boundedRadius;
  this.maxy = centerY + boundedRadius;
};

Branch.prototype.drawNode = function () {
  var nodeRadius = this.getNodeSize();
  /**
   * theta = translation to center of node... ensures that the node edge is
   * at the end of the branch so the branches don't look shorter than  they
   * should
   */
  var theta = nodeRadius;

  var centerX = this.leaf ?
    (theta * Math.cos(this.angle)) + this.centerx : this.centerx;
  var centerY = this.leaf ?
    (theta * Math.sin(this.angle)) + this.centery : this.centery;

  this.canvas.beginPath();
  this.canvas.fillStyle = this.selected ?
                          this.tree.selectedColour : this.colour;

  this.setNodeDimensions(centerX, centerY, nodeRadius);

  // If branch collapsed
  if (this.collapsed) {
    var childIds = this.getChildIds();
    var radius = childIds.length;
    if (this.tree.treeType === 'radial') {
      radius = radius / 7;
    }
    if (this.tree.treeType === 'circular') {
      radius = radius / 3;
    }

    this.canvas.globalAlpha = 0.3;

    this.canvas.beginPath();

    this.canvas.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    this.canvas.fillStyle = (this.tree.defaultCollapsedOptions.color) ?
                      this.tree.defaultCollapsedOptions.color : 'purple';
    this.canvas.fill();
    this.canvas.globalAlpha = 1;
  }
  else if (this.leaf) {
    let originalLineWidth = this.canvas.lineWidth;
    // Drawing line connectors to nodes and align all the nodes vertically
    if (this.tree.alignLabels) {
      this.canvas.lineWidth = this.canvas.lineWidth / 5;
      this.canvas.beginPath();

      this.tree.labelAlign.moveToPosition(this);

      this.canvas.closePath();
      this.canvas.fill();
    }
    // Save canvas
    this.canvas.save();
    // Move to node center position
    // (setting canvas (0,0) position as (this.centerx, this.centery))
    this.canvas.translate(this.centerx, this.centery);
    // rotate canvas (mainly for circular, radial trees etc)
    this.canvas.rotate(this.angle);
    // Draw node shape as chosen - default is circle
    nodeRenderers[this.nodeShape](this);

    if (this.tree.showLabels || (this.tree.hoverLabel && this.highlighted)) {
      this.drawLabel();
    }

    if (this.tree.showMetadata) {
      this.drawMetadata();
    }
    // Restore the canvas position to original
    this.canvas.restore();

    // Swapping back the line width if it was changed due to nodeAlign
    this.canvas.lineWidth = originalLineWidth;
  }
  this.canvas.closePath();

  if (this.highlighted) {
    this.canvas.beginPath();
    var l = this.canvas.lineWidth;
    this.canvas.strokeStyle = this.tree.highlightColour;
    this.canvas.lineWidth = this.tree.highlightWidth / this.tree.zoom;
    this.canvas.arc(centerX, centerY, (this.leaf ? this.getNodeSize() : 0) +
      ((5 + (this.tree.highlightWidth / 2)) / this.tree.zoom), 0, Angles.FULL, false);
    this.canvas.stroke();
    this.canvas.lineWidth = l;
    this.canvas.strokeStyle = this.tree.branchColour;
    this.canvas.closePath();
  }
};

Branch.prototype.getChildIds = function () {
  var children = [];
  var x;

  if (this.leaf) {
    // Fix for Issue #68
    // Returning array, as expected
    return [ this.id ];
  } else {
    children = [];
    for (x = 0; x < this.children.length; x++) {
      children = children.concat(this.children[x].getChildIds());
    }
    return children;
  }
};

Branch.prototype.getChildCount = function () {
  var children = 0;
  var x;

  if (this.leaf) return 1;

  for (x = 0; x < this.children.length; x++) {
    children += this.children[x].getChildCount();
  }
  return children;
};

Branch.prototype.getChildYTotal = function () {
  var y = 0;
  var i;

  if (this.leaf) return this.centery;

  for (i = 0; i < this.children.length; i++) {
    y += this.children[i].getChildYTotal();
  }
  return y;
};

Branch.prototype.setSelected = function (selected, applyToChildren) {
  var ids = this.id;
  var i = 0;

  this.selected = selected;
  if (applyToChildren) {
    for (i = 0; i < this.children.length; i++) {
      ids = ids + ',' + this.children[i].setSelected(selected, applyToChildren);
    }
  }
  return ids;
};

Branch.prototype.setHighlighted = function (highlighted) {
  var i;

  this.highlighted = highlighted;
  if (!highlighted) {
    for (i = 0; i < this.children.length; i++) {
      this.children[i].setHighlighted(highlighted);
    }
  }
};

Branch.prototype.reset = function () {
  var child;
  var i;

  this.startx = 0;
  this.starty = 0;
  this.centerx = 0;
  this.centery = 0;
  this.angle = null;
  // this.totalBranchLength = 0;
  this.minChildAngle = Angles.FULL;
  this.maxChildAngle = 0;
  for (i = 0; i < this.children.length; i++) {
    try {
      this.children[child].pcReset();
    } catch (e) {
      return e;
    }
  }
};

Branch.prototype.redrawTreeFromBranch = function () {
  this.tree.redrawFromBranch(this);
};

Branch.prototype.saveChildren = function () {
  var i;

  for (i = 0; i < this.children.length; i++) {
    this.tree.saveNode(this.children[i]);
    this.children[i].saveChildren();
  }
};

Branch.prototype.hasCollapsedAncestor = function () {
  if (this.parent) {
    return this.parent.collapsed || this.parent.hasCollapsedAncestor();
  }
  return false;
};

Branch.prototype.collapse = function () {
  // don't collapse the node if it is a leaf... that would be silly!
  this.collapsed = this.leaf === false;
};

Branch.prototype.expand = function () {
  this.collapsed = false;
};

Branch.prototype.toggleCollapsed = function () {
  if (this.collapsed) {
    this.expand();
  } else {
    this.collapse();
  }
};

Branch.prototype.setTotalLength = function () {
  var c;

  if (this.parent) {
    this.totalBranchLength = this.parent.totalBranchLength + this.branchLength;
    if (this.totalBranchLength > this.tree.maxBranchLength) {
      this.tree.maxBranchLength = this.totalBranchLength;
    }
  } else {
    this.totalBranchLength = this.branchLength;
    this.tree.maxBranchLength = this.totalBranchLength;
  }
  for (c = 0; c < this.children.length; c++) {
    this.children[c].setTotalLength();
  }
};

/**
 * Add a child branch to this branch
 * @param node {Branch} the node to add as a child
 * @memberof Branch
 */
Branch.prototype.addChild = function (node) {
  node.parent = this;
  node.canvas = this.canvas;
  node.tree = this.tree;
  this.leaf = false;
  this.children.push(node);
};

/**
 * Return the node colour of all the nodes that are children of this one.
 */
Branch.prototype.getChildColours = function () {
  var colours = [];

  this.children.forEach(function (branch) {
    var colour = branch.children.length === 0 ? branch.colour : branch.getColour();
    // only add each colour once.
    if (colours.indexOf(colour) === -1) {
      colours.push(colour);
    }
  });

  return colours;
};

/**
 * Get the colour(s) of the branch itself.
 */
Branch.prototype.getColour = function () {
  var childColours;

  if (this.selected) {
    return this.tree.selectedColour;
  } else if (this.tree.backColour === true) {
    if (this.children.length) {
      childColours = this.getChildColours();
      if (childColours.length === 1) {
        return childColours[0];
      } else {
        return this.tree.branchColour;
      }
    } else {
      return this.colour;
    }
  } else if (typeof this.tree.backColour === 'function') {
    return this.tree.backColour(this);
  } else {
    return this.tree.branchColour;
  }
};

Branch.prototype.getNwk = function () {
  var children;
  var i;
  var nwk;

  if (this.leaf) {
    return this.id + ':' + this.branchLength;
  } else {
    children = [];
    for (i = 0; i < this.children.length; i++) {
      children.push(this.children[i].getNwk());
    }
    nwk = '(' + children.join(',') + '):' + this.branchLength;
    return nwk;
  }
};

Branch.prototype.getTextColour = function () {
  var textColour;
  var childColours;

  if (this.selected) {
    return this.tree.selectedColour;
  }

  if (this.highlighted) {
    textColour = this.tree.highlightColour;
  } else if (this.tree.backColour) {
    if (this.children.length) {
      childColours = this.getChildColours();

      if (childColours.length === 1) {
        textColour = childColours[0];
      } else {
        textColour = this.tree.branchColour;
      }
    } else {
      textColour = this.colour;
    }
  } else {
    textColour = this.tree.branchColour;
  }

  return textColour;
};

Branch.prototype.getLabel = function () {
  return (
    (this.label !== undefined && this.label !== null) ? this.label : ''
  );
};

Branch.prototype.getLabelSize = function () {
  return this.tree.canvas.measureText(this.getLabel()).width;
};

Branch.prototype.getNodeSize = function () {
  return Math.max(0, this.tree.baseNodeSize * this.radius);
};

/**
 * Calculates label start position
 * Diameter of the node + actual node size + extra width(baseNodeSize)
 * @method getNodeSize
 * @return CallExpression
 */
Branch.prototype.getLabelStartX = function () {
  return this.getNodeSize() + this.tree.baseNodeSize + (this.radius * 2);
};

Branch.prototype.rotate = function (evt) {
  var newChildren = [];
  var i;

  for (i = this.children.length; i--; ) {
    newChildren.push(this.children[i]);
  }

  this.children = newChildren;

  if (!evt.preventredraw) {
    this.tree.buildLeaves();
    this.tree.draw(true);
  }
};

Branch.prototype.getChildNo = function () {
  return this.parent.children.indexOf(this);
};

Branch.prototype.downloadLeafIdsFromBranch = function () {
  var downloadData = this.getChildIds().join('\n');
  setupDownloadLink(createBlobUrl(downloadData), 'pc_leaves.txt');
};

module.exports = Branch;
