import { constants } from './utils';

import treeTypes from './treeTypes';
import nodeRenderers from './nodeRenderers';

const { Angles, Shapes } = constants;

// Caching object to reduce garbage
const _bounds = {
  minx: 0,
  maxx: 0,
  miny: 0,
  maxy: 0,
};

const _leafStyle = {
  lineWidth: null,
  strokeStyle: null,
  fillStyle: null,
};

/**
 * A branch of the tree.
 *
 * @class
 */
class Branch {

  constructor() {
    /**
     * The branch's angle clockwise from horizontal in radians (used paricularly
     * for circular and radial trees).
     *
     * @type number
     */
    this.angle = 0;

    /**
     * The length of the branch.
     *
     * @type number
     */
    this.branchLength = 0;

    /**
     * The center of the end of the node on the x axis.
     *
     * @type number
     */
    this.centerx = 0;

    /**
     * The center of the end of the node on the y axis.
     *
     * @type number
     */
    this.centery = 0;

    /**
     * The branches that stem from this branch.
     *
     * @type Branch[]
     */
    this.children = [];

    /**
     * True if the node has been collapsed.
     *
     * @type boolean
     * @default
     */
    this.collapsed = false;

    /**
     * Custom colour for branch, initialised as null to use tree-level default.
     *
     * @type string
     */
    this.colour = null;

    /**
     * Holds custom data for this node.
     *
     * @type object
     */
    this.data = {};

    /**
     * This node's highlight status.
     *
     * @type boolean
     * @default
     */
    this.highlighted = false;

    /**
     * Whether the user is hovering over the node.
     *
     * @type boolean
     */
    this.hovered = false;

    /**
     * This node's unique ID.
     *
     * @type string
     */
    this.id = '';

    /**
     * The text label for this node.
     *
     * @type string
     */
    this.label = null;

    /**
     * If true, this node has no children.
     *
     * @type boolean
     * @default
     */
    this.leaf = true;

    /**
     * The angle that the last child of this brach 'splays' at, used for
     * circular trees.
     *
     * @type number
     * @default
     */
    this.maxChildAngle = 0;

    /**
     * The angle that the last child of this brach 'splays' at, used for
     * circular trees.
     *
     * @type number
     * @default
     */
    this.minChildAngle = Angles.FULL;

    /**
     * What kind of teminal should be drawn on this node.
     *
     * @type string
     * @default
     */
    this.nodeShape = 'circle';

    /**
     * The parent branch of this branch.
     *
     * @type Branch
     */
    this.parent = null;

    /**
     * The relative size of the terminal of this node.
     *
     * @type number
     * @default
     */
    this.radius = 1.0;

    /**
     * True if this branch is currently selected.
     *
     * @type boolean
     */
    this.selected = false;

    /**
     * The x position of the start of the branch.
     *
     * @type number
     */
    this.startx = 0;

    /**
     * The y position of the start of the branch.
     *
     * @type number
     */
    this.starty = 0;

    /**
     * The length from the root of the tree to the tip of this branch.
     *
     * @type number
     */
    this.totalBranchLength = 0;

    /**
     * The tree object that this branch is part of.
     *
     * @type Tree
     */
    this.tree = null;

    /**
     * If true, this branch is not rendered.
     *
     * @type boolean
     * @default
     */
    this.pruned = false;

    /**
     * Allows label to be individually styled.
     *
     * @type object
     * @property {string} colour
     * @property {number} textSize
     * @property {string} font
     * @property {string} format - e.g. bold, italic
     */
    this.labelStyle = {};

    /**
     * Allows label to be individually styled.
     *
     * @type object
     * @property {string} colour
     * @property {number} textSize
     * @property {string} font
     * @property {string} format - e.g. bold, italic
     */
    this.internalLabelStyle = null;

    /**
     * If false, branch does not respond to mouse events.
     *
     * @type boolean
     * @default
     */
    this.interactive = true;

    /**
     * Defines leaf style for this branch.
     *
     * @type object
     * @property {number} lineWidth
     * @property {string} strokeStyle
     * @property {string} fillStyle
     *
     * @example
     * branch.leafStyle = {
     *   lineWidth: 2,
     *   strokeStyle: '#ff0000',
     *   fillStyle: 'blue'
     * };
     */
    this.leafStyle = {};

    /**
     * Minimum x coordintate.
     *
     * @type number
     */
    this.minx = 0;

    /**
     * Minimum y coordintate.
     *
     * @type number
     */
    this.miny = 0;

    /**
     * Maximum x coordintate.
     *
     * @type number
     */
    this.maxx = 0;

    /**
     * Maximum y coordintate.
     *
     * @type number
     */
    this.maxy = 0;
  }

  /**
   * For branches without a label.
   *
   * @returns {string} new ID
   */
  static generateId() {
    return `pcn${this.lastId++}`;
  }

  /**
   * True if the branch is highlighted or hovered.
   *
   * @type boolean
   */
  get isHighlighted() {
    return this.highlighted || this.hovered;
  }

  /**
   * The canvas {@link https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D drawing context} of the parent tree.
   *
   * @type CanvasRenderingContext2D
   */
  get canvas() {
    return this.tree.canvas;
  }

   /**
    * Determines if this branch has been clicked.
    *
    * @param {number}
    * @param {number}
    * @returns {Branch}
    */
  clicked(x, y) {
    if (this.dragging || this.hasCollapsedAncestor()) {
      return null;
    }
    if ((x < (this.maxx) && x > (this.minx)) &&
        (y < (this.maxy) && y > (this.miny))) {
      return this;
    }

    for (let i = this.children.length - 1; i >= 0; i--) {
      const child = this.children[i].clicked(x, y);
      if (child) {
        return child;
      }
    }
  }

  /**
   * @method
   */
  drawLabel() {
    var fSize = this.getTextSize();
    var label = this.getLabel();

    this.canvas.font = this.getFontString();
    this.labelWidth = this.canvas.measureText(label).width;

    // finding the maximum label length
    if (this.tree.maxLabelLength[this.tree.treeType] === undefined) {
      this.tree.maxLabelLength[this.tree.treeType] = 0;
    }
    if (this.labelWidth > this.tree.maxLabelLength[this.tree.treeType]) {
      this.tree.maxLabelLength[this.tree.treeType] = this.labelWidth;
    }

    let tx = this.getLabelStartX();

    if (this.tree.alignLabels) {
      tx += Math.abs(this.tree.labelAlign.getLabelOffset(this));
    }

    if (this.angle > Angles.QUARTER &&
        this.angle < (Angles.HALF + Angles.QUARTER)) {
      this.canvas.rotate(Angles.HALF);
      // Angles.Half text position changes
      tx = -tx - (this.labelWidth * 1);
    }

    this.canvas.beginPath();
    this.canvas.fillStyle = this.getTextColour();
    this.canvas.fillText(label, tx, (fSize / 2) );
    this.canvas.closePath();

    // Rotate canvas back to original position
    if (this.angle > Angles.QUARTER &&
        this.angle < (Angles.HALF + Angles.QUARTER)) {
      this.canvas.rotate(Angles.HALF);
    }
  }

  /**
   * Sets the minimum and maximum coordinates of the branch.
   *
   * @param {number}
   * @param {number}
   * @param {number}
   */
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

  getNumberOfLeaves() {
    let numberOfLeaves = 0;
    const queue = [ this ];
    while (queue.length) {
      const node = queue.pop();
      if (node.leaf) {
        numberOfLeaves++;
      } else {
        for (const child of node.children) {
          queue.push(child);
        }
      }
    }
    return numberOfLeaves;
  }

  /**
   * Draws the "collapsed tip".
   *
   * @param {number}
   * @param {number}
   */
  drawCollapsed(centerX, centerY) {
    const { getCollapsedMeasurements } = treeTypes[this.tree.treeType];

    this.canvas.beginPath();

    const { angle, radius } = getCollapsedMeasurements(this);
    const startAngle = this.angle - angle / 2;
    const endAngle = this.angle + angle / 2;

    this.canvas.moveTo(centerX, centerY);
    this.canvas.arc(centerX, centerY, radius, startAngle, endAngle, false);

    const gradient = this.canvas.createRadialGradient(
      centerX, centerY, radius, centerX, centerY, 0.2 * radius
    );
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
    gradient.addColorStop(1, this.tree.collapsedColour || this.getColour());
    this.canvas.fillStyle = gradient;

    this.canvas.fill();

    this.canvas.closePath();
  }

  /**
   * For aligned labels.
   *
   * @method
   */
  drawLabelConnector() {
    const { highlightColour, labelAlign } = this.tree;
    this.canvas.save();

    this.canvas.lineWidth = this.canvas.lineWidth / 4;
    this.canvas.strokeStyle =
      this.isHighlighted ? highlightColour : this.getColour();

    this.canvas.beginPath();
    this.canvas.moveTo(this.getRadius(), 0);
    this.canvas.lineTo(labelAlign.getLabelOffset(this) + this.getDiameter(), 0);
    this.canvas.stroke();
    this.canvas.closePath();

    this.canvas.restore();
  }

  /**
   * @method
   */
  drawLeaf() {
    const { alignLabels, canvas } = this.tree;

    if (alignLabels) {
      this.drawLabelConnector();
    }

    canvas.save();

    nodeRenderers[this.nodeShape](canvas, this.getRadius(), this.getLeafStyle());

    canvas.restore();

    if (this.tree.showLabels || (this.tree.hoverLabel && this.isHighlighted)) {
      this.drawLabel();
    }
  }

  /**
   * @param {number}
   * @param {number}
   */
  drawHighlight(centerX, centerY) {
    this.canvas.save();
    this.canvas.beginPath();

    this.canvas.strokeStyle = this.tree.highlightColour;
    this.canvas.lineWidth = this.getHighlightLineWidth();
    const radius = this.getHighlightRadius();
    this.canvas.arc(centerX, centerY, radius, 0, Angles.FULL, false);

    this.canvas.stroke();

    this.canvas.closePath();
    this.canvas.restore();
  }

  /**
   * @method
   */
  drawBranchLabels() {
    this.canvas.save();
    const labelStyle = this.internalLabelStyle || this.tree.internalLabelStyle;
    this.canvas.fillStyle = labelStyle.colour;
    this.canvas.font =
      `${labelStyle.format} ${labelStyle.textSize}pt ${labelStyle.font}`;
    this.canvas.textBaseline = 'middle';
    this.canvas.textAlign = 'center';
    const em = this.canvas.measureText('M').width * 2 / 3;

    const x = this.tree.type.branchScalingAxis === 'y' ?
      this.centerx :
      (this.startx + this.centerx) / 2;
    const y = this.tree.type.branchScalingAxis === 'x' ?
      this.centery :
      (this.starty + this.centery) / 2;

    if (this.tree.showBranchLengthLabels &&
      this.tree.branchLengthLabelPredicate(this)) {
      this.canvas.fillText(this.branchLength.toFixed(2), x, y + em);
    }

    if (this.tree.showInternalNodeLabels && !this.leaf && this.label) {
      this.canvas.fillText(this.label, x, y - em);
    }

    this.canvas.restore();
  }

  /**
   * Draws the line of the branch.
   */
  drawNode() {
    var nodeRadius = this.getRadius();
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

    this.setNodeDimensions(centerX, centerY, nodeRadius);

    if (this.collapsed) {
      this.drawCollapsed(centerX, centerY);
    } else if (this.leaf) {
      this.canvas.save();
      this.canvas.translate(this.centerx, this.centery);
      this.canvas.rotate(this.angle);

      this.drawLeaf();

      this.canvas.restore();
    }

    if (this.isHighlighted) {
      this.tree.highlighters.push(this.drawHighlight.bind(this, centerX, centerY));
    }

    if (this.tree.root !== this && this.tree.showBranchLengthLabels || this.tree.showInternalNodeLabels) {
      this.drawBranchLabels();
    }
  }

  /**
   * Get property values of leaves under this branch.
   *
   * @param {string} - property name
   * @returns {string[]}
   */
  getChildProperties(property) {
    if (this.leaf) {
      // Fix for Issue #68
      // Returning array, as expected
      return [ this[property] ];
    }

    let children = [];
    for (let x = 0; x < this.children.length; x++) {
      children = children.concat(this.children[x].getChildProperties(property));
    }
    return children;
  }

  /**
   * @returns {number}
   */
  getChildCount() {
    if (this.leaf) return 1;

    let children = 0;
    for (let x = 0; x < this.children.length; x++) {
      children += this.children[x].getChildCount();
    }
    return children;
  }

  /**
   * @returns {number}
   */
  getChildYTotal() {
    if (this.leaf) return this.centery;

    let y = 0;
    for (let i = 0; i < this.children.length; i++) {
      y += this.children[i].getChildYTotal();
    }
    return y;
  }

  /**
   * Set a boolean property of this branch and its descendants.
   *
   * @param {string}
   * @param {boolean}
   * @param {function=}
   */
  cascadeFlag(property, value, predicate) {
    if (typeof this[property] === 'undefined') {
      throw new Error(`Unknown property: ${property}`);
    }
    if (typeof predicate === 'undefined' || predicate(this, property, value)) {
      this[property] = value;
    }
    for (const child of this.children) {
      child.cascadeFlag(property, value, predicate);
    }
  }

  /**
   * Resets the coordinates and angle of this branch and its descendants.
   */
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
        this.children[child].reset();
      } catch (e) {
        return e;
      }
    }
  }

  /**
   * Set this branch to be the root.
   */
  redrawTreeFromBranch() {
    if (this.collapsed) {
      this.expand();
    }
    this.tree.redrawFromBranch(this);
  }

  /**
   * Store this branch's children.
   */
  extractChildren() {
    for (const child of this.children) {
      this.tree.storeNode(child);
      child.extractChildren();
    }
  }

  /**
   * Walks up the tree looking for a collapsed branch.
   *
   * @returns {boolean}
   */
  hasCollapsedAncestor() {
    if (this.parent) {
      return this.parent.collapsed || this.parent.hasCollapsedAncestor();
    }
    return false;
  }

  /**
   * @method
   */
  collapse() {
    // don't collapse the node if it is a leaf... that would be silly!
    this.collapsed = this.leaf === false;
  }

  /**
   * @method
   */
  expand() {
    this.collapsed = false;
  }

  /**
   * @method
   */
  toggleCollapsed() {
    if (this.collapsed) {
      this.expand();
    } else {
      this.collapse();
    }
  }

  /**
   * Sums the length of all branches from this one back to the root.
   */
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
   * Add a child branch to this branch.
   *
   * @param node {Branch} the node to add as a child
   */
  addChild(node) {
    node.parent = this;
    node.tree = this.tree;
    this.leaf = false;
    this.children.push(node);
  }

  /**
   * Return the node colour of all the nodes that are children of this one.
   *
   * @returns {string[]}
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
   *
   * @returns {string}
   */
  getColour(specifiedColour) {
    if (this.selected) {
      return this.tree.selectedColour;
    }

    return specifiedColour || this.colour || this.tree.branchColour;
  }

  /**
   * Create a newick representation of this branch.
   *
   * @returns {string}
   */
  getNwk(isRoot = true) {
    if (this.leaf) {
      return `${this.label}:${this.branchLength}`;
    }

    const childNwks = this.children.map(child => child.getNwk(false));
    return `(${childNwks.join(',')}):${this.branchLength}${isRoot ? ';' : ''}`;
  }

  /**
   * @returns {string}
   */
  getTextColour() {
    if (this.selected) {
      return this.tree.selectedColour;
    }

    if (this.isHighlighted) {
      return this.tree.highlightColour;
    }

    if (this.tree.backColour && this.children.length) {
      const childColours = this.getChildColours();
      if (childColours.length === 1) {
        return childColours[0];
      }
    }
    return this.labelStyle.colour || this.colour || this.tree.branchColour;
  }

  /**
   * Ensures the return value is always a string.
   *
   * @returns {string}
   */
  getLabel() {
    return (
      (this.label !== undefined && this.label !== null) ? this.label : ''
    );
  }

  /**
   * @returns {number}
   */
  getTextSize() {
    return this.labelStyle.textSize || this.tree.textSize;
  }

  /**
   * @returns {string}
   */
  getFontString() {
    const font = this.labelStyle.font || this.tree.font;
    return `${this.labelStyle.format || ''} ${this.getTextSize()}pt ${font}`;
  }

  /**
   * @returns {number} length of label in pixels
   */
  getLabelSize() {
    this.canvas.font = this.getFontString();
    return this.canvas.measureText(this.getLabel()).width;
  }

  /**
   * @returns {number}
   */
  getRadius() {
    const { baseNodeSize } = this.tree;
    if (this.leaf) {
      return baseNodeSize * this.radius;
    }
    return baseNodeSize / this.radius;
  }

  /**
   * @returns {number}
   */
  getDiameter() {
    return this.getRadius() * 2;
  }

  /**
   * @returns {boolean}
   */
  hasLabelConnector() {
    if (!this.tree.alignLabels) {
      return false;
    }
    return (this.tree.labelAlign.getLabelOffset(this) > this.getDiameter());
  }

  /**
   * Calculates label start position
   * offset + aesthetic padding
   *
   * @return {number} x coordinate
   */
  getLabelStartX() {
    const { lineWidth } = this.getLeafStyle();
    const hasLabelConnector = this.hasLabelConnector();

    let offset = this.getDiameter();

    if (this.isHighlighted && !hasLabelConnector) {
      offset += this.getHighlightSize() - this.getRadius();
    }

    return offset + Math.min(this.tree.labelPadding, this.tree.labelPadding / this.tree.zoom);
  }

  /**
   * @returns {number}
   */
  getHighlightLineWidth() {
    return this.tree.highlightWidth / this.tree.zoom;
  }

  /**
   * @returns {number}
   */
  getHighlightRadius() {
    let offset = this.getHighlightLineWidth() * this.tree.highlightSize;

    offset += this.getLeafStyle().lineWidth / this.tree.highlightSize;

    return this.leaf ? this.getRadius() + offset : offset * 0.666;
  }

  /**
   * Combination of radius and line width
   *
   * @returns {number}
   */
  getHighlightSize() {
    return this.getHighlightRadius() + this.getHighlightLineWidth();
  }

  /**
   * Reverses the order of the children. Runs the prerenderer again.
   *
   * @method
   */
  rotate() {
    const newChildren = [];

    for (let i = this.children.length; i--;) {
      newChildren.push(this.children[i]);
    }

    this.children = newChildren;

    this.tree.extractNestedBranches();
    this.tree.draw(true);
  }

  /**
   * @returns {number} index of this branch in its parent's array.
   */
  getChildNo() {
    return this.parent.children.indexOf(this);
  }

  /**
   * @param {Object} options
   * @param {string} options.colour
   * @param {string} options.shape
   * @param {number} options.size
   * @param {Object} options.leafStyle See {@link Branch#leafStyle}
   * @param {Object} options.labelStyle See {@link Branch#labelStyle}
   */
  setDisplay({ colour, shape, size, leafStyle, labelStyle }) {
    if (colour) {
      this.colour = colour;
    }
    if (shape) {
      this.nodeShape = Shapes[shape] ? Shapes[shape] : shape;
    }
    if (size) {
      this.radius = size;
    }
    if (leafStyle) {
      this.leafStyle = leafStyle;
    }
    if (labelStyle) {
      this.labelStyle = labelStyle;
    }
  }

  /**
   * @returns {number} the node radius plus label length if labels are shown
   */
  getTotalLength() {
    let length = this.getRadius();

    if (this.tree.showLabels || (this.tree.hoverLabel && this.isHighlighted)) {
      length += this.getLabelStartX() + this.getLabelSize();
    }

    return length;
  }

  /**
   * @returns {Object} bounds
   * @property {number} minx
   * @property {number} miny
   * @property {number} maxx
   * @property {number} maxy
   */
  getBounds() {
    const { tree } = this;
    const x = tree.alignLabels ? tree.labelAlign.getX(this) : this.centerx;
    const y = tree.alignLabels ? tree.labelAlign.getY(this) : this.centery;
    const nodeSize = this.getRadius();
    const totalLength = this.getTotalLength();

    let minx;
    let maxx;
    let miny;
    let maxy;
    if (this.angle > Angles.QUARTER &&
        this.angle < (Angles.HALF + Angles.QUARTER)) {
      minx = x + (totalLength * Math.cos(this.angle));
      miny = y + (totalLength * Math.sin(this.angle));
      maxx = x - nodeSize;
      maxy = y - nodeSize;
    } else {
      minx = x - nodeSize;
      miny = y - nodeSize;
      maxx = x + (totalLength * Math.cos(this.angle));
      maxy = y + (totalLength * Math.sin(this.angle));
    }

    // uses a caching object to reduce garbage
    const step = tree.prerenderer.getStep(tree) / 2;
    _bounds.minx = Math.min(minx, maxx, x - step);
    _bounds.miny = Math.min(miny, maxy, y - step);
    _bounds.maxx = Math.max(minx, maxx, x + step);
    _bounds.maxy = Math.max(miny, maxy, y + step);

    return _bounds;
  }

  /**
   * Merges global and local styles together.
   *
   * @returns {Object}
   * @see Branch#leafStyle
   */
  getLeafStyle() {
    const { strokeStyle, fillStyle } = this.leafStyle;
    const { zoom } = this.tree;

    // uses a caching object to reduce garbage
    _leafStyle.strokeStyle = this.getColour(strokeStyle);
    _leafStyle.fillStyle = this.getColour(fillStyle);

    const lineWidth =
      typeof this.leafStyle.lineWidth !== 'undefined' ?
        this.leafStyle.lineWidth :
        this.tree.lineWidth;

    _leafStyle.lineWidth = lineWidth / zoom;

    return _leafStyle;
  }

}

/**
 * Static counter for generated ids.
 *
 * @static
 * @memberof Branch
 * @type number
 */
Branch.lastId = 0;

export default Branch;
