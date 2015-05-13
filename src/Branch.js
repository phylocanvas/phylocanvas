var Angles = require('./utils').Angles;

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

module.exports = Branch;
