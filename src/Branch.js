import { constants, dom } from 'phylocanvas-utils';

import nodeRenderers from './nodeRenderers';

const { Angles, Shapes } = constants;
const { createBlobUrl } = dom;

/**
 * Creates a branch
 *
 * @constructor
 * @memberof PhyloCanvas
 * @public
 *
 */
export default class Branch {

  constructor() {
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
     * This node's highlight status
     */
    this.highlighted = false;

    /**
     * Whether the user is hovering over the node
     */
    this.hovered = false;

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

    /**
     * If true, the leaf and label are not rendered.
     */
    this.pruned = false;

    /**
     * If false, branch does not respond to mouse events
     */
    this.interactive = true;
  }

  get isHighlighted() {
    return this.highlighted || this.hovered;
  }

  clicked(x, y) {
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
  }

  drawLabel() {
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

    if (this.tree.alignLabels) {
      tx += Math.abs(this.tree.labelAlign.getLabelOffset(this));
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

    // Rotate canvas back to original position
    if (this.angle > Angles.QUARTER &&
        this.angle < (Angles.HALF + Angles.QUARTER)) {
      this.canvas.rotate(Angles.HALF);
    }
  }

  setNodeDimensions(centerX, centerY, radius) {
    let boundedRadius = radius;

    if ((radius * this.tree.zoom) < 5 || !this.leaf) {
      boundedRadius = 5 / this.tree.zoom;
    }

    this.minx = centerX - boundedRadius;
    this.maxx = centerX + boundedRadius;
    this.miny = centerY - boundedRadius;
    this.maxy = centerY + boundedRadius;
  }

  drawCollapsed(centerX, centerY) {
    var childIds = this.getChildIds();
    var radius = childIds.length;

    if (this.tree.scaleCollapsedNode) {
      radius = this.tree.scaleCollapsedNode(radius);
    }

    this.canvas.globalAlpha = 0.3;

    this.canvas.beginPath();

    this.canvas.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    this.canvas.fillStyle = (this.tree.defaultCollapsedOptions.color) ?
                      this.tree.defaultCollapsedOptions.color : 'purple';
    this.canvas.fill();
    this.canvas.globalAlpha = 1;

    this.canvas.closePath();
  }

  drawLabelConnector(centerX, centerY) {
    const originalLineWidth = this.canvas.lineWidth;
    let labelAlign = this.tree.labelAlign;

    this.canvas.lineWidth = this.canvas.lineWidth / 4;
    this.canvas.strokeStyle = this.isHighlighted ? this.tree.highlightColour : this.getColour();

    this.canvas.beginPath();
    this.canvas.moveTo(centerX, centerY);
    this.canvas.lineTo(labelAlign.getX(this), labelAlign.getY(this));
    this.canvas.stroke();
    this.canvas.closePath();

    this.canvas.strokeStyle = this.getColour();
    this.canvas.lineWidth = originalLineWidth;
    this.canvas.moveTo(centerX, centerY);
  }

  drawLeaf() {
    nodeRenderers[this.nodeShape](this);

    if (this.tree.showLabels || (this.tree.hoverLabel && this.isHighlighted)) {
      this.drawLabel();
    }
  }

  drawHighlight(centerX, centerY) {
    this.canvas.beginPath();
    const l = this.canvas.lineWidth;
    this.canvas.strokeStyle = this.tree.highlightColour;
    this.canvas.lineWidth = this.tree.highlightWidth / this.tree.zoom;
    this.canvas.arc(centerX, centerY, (this.leaf ? this.getNodeSize() : 0) +
      ((5 + (this.tree.highlightWidth / 2)) / this.tree.zoom), 0, Angles.FULL, false);
    this.canvas.stroke();
    this.canvas.lineWidth = l;
    this.canvas.strokeStyle = this.tree.branchColour;
    this.canvas.closePath();
  }

  drawNode() {
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

    this.canvas.fillStyle = this.selected ?
                            this.tree.selectedColour : this.colour;

    this.setNodeDimensions(centerX, centerY, nodeRadius);


    if (this.collapsed) {
      this.drawCollapsed(centerX, centerY);
    } else if (this.leaf) {
      if (this.tree.alignLabels) {
        this.drawLabelConnector(centerX, centerY);
      }

      this.canvas.save();
      this.canvas.translate(this.centerx, this.centery);
      this.canvas.rotate(this.angle);

      this.drawLeaf();

      this.canvas.restore();
    }

    if (this.isHighlighted) {
      this.drawHighlight(centerX, centerY);
    }
  }

  getChildIds() {
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
  }

  getChildCount() {
    var children = 0;
    var x;

    if (this.leaf) return 1;

    for (x = 0; x < this.children.length; x++) {
      children += this.children[x].getChildCount();
    }
    return children;
  }

  getChildYTotal() {
    var y = 0;
    var i;

    if (this.leaf) return this.centery;

    for (i = 0; i < this.children.length; i++) {
      y += this.children[i].getChildYTotal();
    }
    return y;
  }

  cascadeFlag(property, value) {
    if (typeof this[property] === 'undefined') {
      throw new Error(`Unknown property: ${property}`);
    }
    this[property] = value;
    for (let child of this.children) {
      child.cascadeFlag(property, value);
    }
  }

  reset() {
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
  }

  redrawTreeFromBranch() {
    this.tree.redrawFromBranch(this);
  }

  extractChildren() {
    for (let child of this.children) {
      this.tree.storeNode(child);
      child.extractChildren();
    }
  }

  hasCollapsedAncestor() {
    if (this.parent) {
      return this.parent.collapsed || this.parent.hasCollapsedAncestor();
    }
    return false;
  }

  collapse() {
    // don't collapse the node if it is a leaf... that would be silly!
    this.collapsed = this.leaf === false;
  }

  expand() {
    this.collapsed = false;
  }

  toggleCollapsed() {
    if (this.collapsed) {
      this.expand();
    } else {
      this.collapse();
    }
  }

  setTotalLength() {
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
  }

  /**
   * Add a child branch to this branch
   * @param node {Branch} the node to add as a child
   * @memberof Branch
   */
  addChild(node) {
    node.parent = this;
    node.canvas = this.canvas;
    node.tree = this.tree;
    this.leaf = false;
    this.children.push(node);
  }

  /**
   * Return the node colour of all the nodes that are children of this one.
   */
  getChildColours() {
    var colours = [];

    this.children.forEach(function (branch) {
      var colour = branch.children.length === 0 ? branch.colour : branch.getColour();
      // only add each colour once.
      if (colours.indexOf(colour) === -1) {
        colours.push(colour);
      }
    });

    return colours;
  }

  /**
   * Get the colour(s) of the branch itself.
   */
  getColour() {
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
  }

  getNwk() {
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
  }

  getTextColour() {
    var textColour;
    var childColours;

    if (this.selected) {
      return this.tree.selectedColour;
    }

    if (this.isHighlighted) {
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
  }

  getLabel() {
    return (
      (this.label !== undefined && this.label !== null) ? this.label : ''
    );
  }

  getLabelSize() {
    return this.tree.canvas.measureText(this.getLabel()).width;
  }

  getNodeSize() {
    return Math.max(0, this.tree.baseNodeSize * this.radius);
  }

  /**
   * Calculates label start position
   * Diameter of the node + actual node size + extra width(baseNodeSize)
   * @method getNodeSize
   * @return CallExpression
   */
  getLabelStartX() {
    return (this.getNodeSize() + this.tree.baseNodeSize + (this.radius * 2));
  }

  rotate(evt) {
    var newChildren = [];
    var i;

    for (i = this.children.length; i--; ) {
      newChildren.push(this.children[i]);
    }

    this.children = newChildren;

    if (!evt.preventredraw) {
      this.tree.extractNestedBranches();
      this.tree.draw(true);
    }
  }

  getChildNo() {
    return this.parent.children.indexOf(this);
  }

  downloadLeafIdsFromBranch() {
    var downloadData = this.getChildIds().join('\n');
    var filename = 'pc_leaf_ids';
    if (!this.parent) {
      filename += '_all.txt';
    } else {
      filename += '_' + this.id + '.txt';
    }
    return createBlobUrl(downloadData);
  }

  setDisplay({ colour, shape, size }) {
    if (colour) {
      this.colour = colour;
    }
    if (shape) {
      this.nodeShape = Shapes[shape] ? Shapes[shape] : shape;
    }
    if (size) {
      this.radius = size;
    }
  }

  getTotalSize() {
    let totalSize = this.getNodeSize();

    if (this.tree.showLabels) {
      totalSize +=
        this.getLabelSize() + this.tree.maxLabelLength[this.tree.treeType];
    }

    return totalSize;
  }

}
