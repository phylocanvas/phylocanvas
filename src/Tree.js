import { dom, events, canvas } from 'phylocanvas-utils';

import Branch from './Branch';
import ContextMenu from './ContextMenu';
import Tooltip from './Tooltip';
import Navigator from './Navigator';

import treeTypes from './treeTypes';
import parsers from './parsers';

const { addClass } = dom;
const { fireEvent, addEvent } = events;
const { getBackingStorePixelRatio, getPixelRatio, translateClick } = canvas;


/**
 * The instance of a PhyloCanvas Widget
 *
 * @constructor
 * @memberof PhyloCanvas
 * @param element {string|HTMLElement} the element or id of an element that phylocanvas
 * will be drawn in
 *
 * {@link PhyoCanvas.Tree}
 *
 * @example
 *  new PhyloCanvas.Tree('element_id');
 *
 * @example
 *  new PhyloCanvas.Tree(element);
 */
export default class Tree {

  constructor(element, conf = {}) {
    this.canvasEl =
      (typeof element === 'string' ? document.getElementById(element) : element);
    addClass(this.canvasEl, 'pc-container');
    /**
     *
     * Dictionary of all branches indexed by Id
     */
    this.branches = {};
    /**
     *
     * List of leaves
     */
    this.leaves = [];
    /**
     * The root node of the tree
     * (not neccesarily a root in the Phylogenetic sense)
     */
    this.root = false;

    this.stringRepresentation = '';

    /**
     *
     * used for auto ids for internal nodes
     * @private
     */
    this.lastId = 0;

    /**
     * backColour colour the branches of the tree based on the colour of the
     * tips
     */
    this.backColour = false;

    this.originalTree = {};

    // Set up the element and canvas
    if (window.getComputedStyle(this.canvasEl).position === 'static') {
      this.canvasEl.style.position = 'relative';
    }
    this.canvasEl.style.boxSizing = 'border-box';

    let canvas = document.createElement('canvas');
    canvas.id = (element.id || '') + '__canvas';
    canvas.className = 'phylocanvas';
    canvas.style.position = 'relative';
    canvas.style.backgroundColor = '#FFFFFF';
    canvas.height = element.offsetHeight || 400;
    canvas.width = element.offsetWidth || 400;
    canvas.style.zIndex = '1';
    this.canvasEl.appendChild(canvas);

    /***
     * Right click menu
     * Users could pass options while creating the Tree object
     */
    this.contextMenu = new ContextMenu(this, conf.contextMenu);

    this.defaultCollapsedOptions = {};
    this.defaultCollapsed = false;
    if (conf.defaultCollapsed !== undefined) {
      if (conf.defaultCollapsed.min && conf.defaultCollapsed.max) {
        this.defaultCollapsedOptions = conf.defaultCollapsed;
        this.defaultCollapsed = true;
      }
    }

    this.tooltip = new Tooltip(this);

    this.drawn = false;

    this.selectedNodes = [];

    this.zoom = 1;
    this.pickedup = false;
    this.dragging = false;
    this.startx = null; this.starty = null;
    this.pickedup = false;
    this.baseNodeSize = 1;
    this.curx = null;
    this.cury = null;
    this.origx = null;
    this.origy = null;

    this.canvas = canvas.getContext('2d');

    this.canvas.canvas.onselectstart = function () { return false; };
    this.canvas.fillStyle = '#000000';
    this.canvas.strokeStyle = '#000000';
    this.canvas.save();

    this.offsetx = this.canvas.canvas.width / 2;
    this.offsety = this.canvas.canvas.height / 2;
    this.selectedColour = 'rgba(49,151,245,1)';
    this.highlightColour = 'rgba(49,151,245,1)';
    this.highlightWidth = 5.0;
    this.selectedNodeSizeIncrease = 0;
    this.branchColour = 'rgba(0,0,0,1)';
    this.branchScalar = 1.0;

    this.hoverLabel = false;

    this.internalNodesSelectable = true;

    this.showLabels = true;
    this.showBootstraps = false;

    this.setTreeType('radial');
    this.maxBranchLength = 0;
    this.lineWidth = 1.0;
    this.textSize = 7;
    this.font = 'sans-serif';

    this.unselectOnClickAway = true;
    this.rightClickZoom = true;

    if (this.useNavigator) {
      this.navigator = new Navigator(this);
    }

    this.resizeToContainer();

    this.addListener('contextmenu', this.clicked.bind(this));
    this.addListener('click', this.clicked.bind(this));

    this.addListener('mousedown', this.pickup.bind(this));
    this.addListener('mouseup', this.drop.bind(this));
    this.addListener('mouseout', this.drop.bind(this));

    addEvent(this.canvas.canvas, 'mousemove', this.drag.bind(this));
    addEvent(this.canvas.canvas, 'mousewheel', this.scroll.bind(this));
    addEvent(this.canvas.canvas, 'DOMMouseScroll', this.scroll.bind(this));
    addEvent(window, 'resize', function () {
      this.resizeToContainer();
      this.draw();
    }.bind(this));

    /**
     * Align labels vertically
     */
    this.alignLabels = false;

    /**
     * X and Y axes of the node that is farther from the root
     * Used to align labels vertically
     */
    this.farthestNodeFromRootX = 0;
    this.farthestNodeFromRootY = 0;

    // Colour for 1 and 0s. Currently 0s are not drawn
    this.colour1 = 'rgba(206,16,16,1)';
    this.colour0 = '#ccc';
    /**
       Maximum length of label for each tree type.
       Because label length pixel differes for different tree types for some reason
     */
    this.maxLabelLength = {};
  }

  get alignLabels() {
    return this.labelAlign && this.labelAlignEnabled;
  }

  set alignLabels(value) {
    this.labelAlignEnabled = value;
  }

  setInitialCollapsedBranches(node = this.root) {
    var childIds;
    var i;

    childIds = node.getChildIds();
    if (childIds && childIds.length > this.defaultCollapsedOptions.min &&
        childIds.length < this.defaultCollapsedOptions.max) {
      node.collapsed = true;
      return;
    }

    for (i = 0; i < node.children.length; i++) {
      this.setInitialCollapsedBranches(node.children[i]);
    }
  }

  clicked(e) {
    var node;
    var nids;
    if (e.button === 0) {
      nids = [];
      // if this is triggered by the release after a drag then the click
      // shouldn't be triggered.
      if (this.dragging) {
        this.dragging = false;
        return;
      }

      if (!this.root) return false;
      node = this.root.clicked(...translateClick(e.clientX, e.clientY, this));

      if (node) {
        this.root.cascadeFlag('selected', false);
        if (this.internalNodesSelectable || node.leaf) {
          node.cascadeFlag('selected', true);
          nids = node.getChildIds();
        }
        this.draw();
      } else if (this.unselectOnClickAway && this.contextMenu.closed && !this.dragging) {
        this.root.cascadeFlag('selected', false);
        this.draw();
      }

      if (!this.pickedup) {
        this.dragging = false;
      }

      this.nodesUpdated(nids, 'selected');
    } else if (e.button === 2) {
      e.preventDefault();
      node = this.root.clicked(...translateClick(e.clientX, e.clientY, this));
      this.contextMenu.open(e.clientX, e.clientY, node);
      this.contextMenu.closed = false;
      this.tooltip.close();
    }
  }

  dblclicked(e) {
    if (!this.root) return false;
    var nd = this.root.clicked(...translateClick(e.clientX * 1.0, e.clientY * 1.0, this));
    if (nd) {
      nd.cascadeFlag('selected', false);
      nd.toggleCollapsed();
    }

    if (!this.pickedup) {
      this.dragging = false;
    }
    this.draw();
  }

  displayLabels() {
    this.showLabels = true;
    this.draw();
  }

  drag(event) {
    // get window ratio
    var ratio = getPixelRatio(this.canvas);

    if (!this.drawn) return false;

    if (this.pickedup) {
      var xmove = (event.clientX - this.startx) * ratio;
      var ymove = (event.clientY - this.starty) * ratio;
      if (Math.abs(xmove) + Math.abs(ymove) > 5) {
        this.dragging = true;
        this.offsetx = this.origx + xmove;
        this.offsety = this.origy + ymove;
        this.draw();
      }
    } else if (this.zoomPickedUp) {
      // right click and drag
      this.d = ((this.starty - event.clientY) / 100);
      this.setZoom(this.origZoom + this.d);
      this.draw();
    } else {
      // hover
      var e = event;
      var nd = this.root.clicked(...translateClick(e.clientX * 1.0, e.clientY * 1.0, this));

      if (nd && (this.internalNodesSelectable || nd.leaf)) {
        this.root.cascadeFlag('hovered', false);
        nd.hovered = true;
        // For mouseover tooltip to show no. of children on the internal nodes
        if (!nd.leaf && !nd.hasCollapsedAncestor() && this.contextMenu.closed) {
          this.tooltip.open(e.clientX, e.clientY, nd);
        }
      } else {
        this.tooltip.close();
        this.contextMenu.close();
        this.root.cascadeFlag('hovered', false);
      }
      this.draw();
    }
  }

  /**
   * Draw the frame
   */
  draw(forceRedraw) {
    this.selectedNodes = [];

    if (this.maxBranchLength === 0) {
      this.loadError(new Error('All branches in the tree are identical.'));
      return;
    }

    this.canvas.restore();

    this.canvas.clearRect(0, 0, this.canvas.canvas.width, this.canvas.canvas.height);
    this.canvas.lineCap = 'round';
    this.canvas.lineJoin = 'round';

    this.canvas.strokeStyle = this.branchColour;
    this.canvas.save();

    this.canvas.translate((this.canvas.canvas.width / 2) / getBackingStorePixelRatio(this.canvas),
      (this.canvas.canvas.height / 2) / getBackingStorePixelRatio(this.canvas));

    if (!this.drawn || forceRedraw) {
      this.prerenderer.run(this);
      if (!forceRedraw) { this.fitInPanel(); }
    }

    this.canvas.lineWidth = this.lineWidth / this.zoom;
    this.canvas.translate(this.offsetx, this.offsety);
    this.canvas.scale(this.zoom, this.zoom);

    this.branchRenderer.render(this, this.root);

    // Making default collapsed false so that it will collapse on initial load only
    this.defaultCollapsed = false;

    this.drawn = true;
  }

  drop() {
    if (!this.drawn) return false;
    this.pickedup = false;
    this.zoomPickedUp = false;
  }

  findLeaves(pattern, searchProperty = 'id') {
    let foundLeaves = [];

    for (let leaf of this.leaves) {
      if (leaf[searchProperty] && leaf[searchProperty].match(pattern)) {
        foundLeaves.push(leaf);
      }
    }

    return foundLeaves;
  }

  updateLeaves(leaves, property, value) {
    for (let leaf of this.leaves) {
      leaf[property] = !value;
    }

    for (let leaf of leaves) {
      leaf[property] = value;
    }
    this.nodesUpdated(leaves.map(_ => _.id), property);
  }

  clearSelect() {
    this.root.cascadeFlag('selected', false);
    this.draw();
  }

  generateBranchId() {
    return 'pcn' + this.lastId++;
  }

  getPngUrl() {
    return this.canvas.canvas.toDataURL();
  }

  hideLabels() {
    this.showLabels = false;
    this.draw();
  }

  load(inputString, options = {}, callback) {
    let buildOptions = options;
    let buildCallback = callback;

    // allows passing callback as second param
    if (typeof options === 'function') {
      buildCallback = options;
      buildOptions = {};
    }

    if (buildCallback) {
      buildOptions.callback = buildCallback;
    }

    if (buildOptions.format) {
      this.build(inputString, parsers[buildOptions.format], buildOptions);
      return;
    }

    for (let parserName of Object.keys(parsers)) {
      let parser = parsers[parserName];

      if (inputString.match(parser.fileExtension) ||
          inputString.match(parser.validator)) {
        this.build(inputString, parser, buildOptions);
        return;
      }
    }

    let error = new Error('String not recognised as a file or a parseable format string');
    if (buildCallback) {
      buildCallback(error);
    }
    this.loadError(error);
  }

  saveOriginalTree() {
    this.originalTree.branches = this.branches;
    this.originalTree.leaves = this.leaves;
    this.originalTree.root = this.root;
    this.originalTree.branchLengths = {};
    this.originalTree.parents = {};
  }

  clearState() {
    this.root = false;
    this.leaves = [];
    this.branches = {};
    this.drawn = false;
  }

  saveState() {
    this.extractNestedBranches();

    this.root.branchLength = 0;
    this.maxBranchLength = 0;
    this.root.setTotalLength();

    if (this.maxBranchLength === 0) {
      this.loadError(new Error('All branches in the tree are identical.'));
      return;
    }
  }

  build(formatString, parser, options) {
    this.originalTree = {};
    this.clearState();

    let root = new Branch();
    root.id = 'root';
    this.branches.root = root;
    this.setRoot(root);

    parser.parse({ formatString, root, options }, (error) => {
      if (error) {
        if (options.callback) {
          options.callback(error);
        }
        this.loadError(error);
        return;
      }
      this.stringRepresentation = formatString;
      this.saveState();
      this.setInitialCollapsedBranches();
      this.draw();
      this.saveOriginalTree();
      if (options.callback) {
        options.callback();
      }
      if (!options.quiet) {
        this.loadCompleted();
      }
    });
  }

  pickup(event) {
    if (!this.drawn) return false;
    this.origx = this.offsetx;
    this.origy = this.offsety;

    if (event.button === 0) {
      this.pickedup = true;
    }

    if (event.button === 2 && this.rightClickZoom) {
      this.zoomPickedUp = true;
      this.origZoom = Math.log(this.zoom) / Math.log(10);
      this.oz = this.zoom;
      // position in the diagram on which you clicked
    }
    this.startx = event.clientX;
    this.starty = event.clientY;
  }

  redrawFromBranch(node) {
    this.clearState();
    this.resetTree();

    this.originalTree.branchLengths[node.id] = node.branchLength;
    this.originalTree.parents[node.id] = node.parent;

    this.root = node;
    this.root.parent = false;

    this.saveState();

    this.draw();
    this.subtreeDrawn(node.id);
  }

  redrawOriginalTree() {
    this.load(this.stringRepresentation, { quiet: true });
  }

  storeNode(node) {
    if (!node.id || node.id === '') {
      node.id = node.tree.genId();
    }

    if (this.branches[node.id]) {
      if (node !== this.branches[node.id]) {
        if (!node.leaf) {
          node.id = this.genId();
        } else {
          throw new Error('Two nodes on this tree share the id ' + node.id);
        }
      }
    }

    this.branches[node.id] = node;

    if (node.leaf) {
      this.leaves.push(node);
    }
  }

  scroll(e) {
    var z = Math.log(this.zoom) / Math.log(10);
    this.setZoom(z + (e.detail < 0 || e.wheelDelta > 0 ? 0.12 : -0.12));
    e.preventDefault();
  }

  selectNodes(nIds) {
    var ns = nIds;
    var node;
    var nodeId;
    var index;

    if (this.root) {
      this.root.cascadeFlag('selected', false);
      if (typeof nIds === 'string') {
        ns = ns.split(',');
      }
      for (nodeId in this.branches) {
        if (this.branches.hasOwnProperty(nodeId)) {
          node = this.branches[nodeId];
          for (index = 0; index < ns.length; index++) {
            if (ns[index] === node.id) {
              node.cascadeFlag('selected', true);
            }
          }
        }
      }
      this.draw();
    }
  }

  setFont(font) {
    if (isNaN(font)) {
      this.font = font;
      this.draw();
    }
  }

  setNodeDisplay(ids, options, waiting) {
    if (!ids) return;

    if (this.drawn) {
      let array = [];
      if (typeof ids === 'string') {
        array = ids.split(',');
      } else {
        array = ids;
      }

      if (array.length) {
        for (let id of array) {
          if (!(id in this.branches)) {
            continue;
          }
          this.branches[id].setDisplay(options);
        }
        this.draw();
      }
    } else if (!waiting) {
      let _this = this;
      let timeout = setInterval(function () {
        if (this.drawn) {
          _this.setNodeColourAndShape(ids, options, true);
          clearInterval(timeout);
        }
      });
    }
  }

  setNodeSize(size) {
    this.baseNodeSize = Number(size);
    this.draw();
  }

  setRoot(node) {
    node.canvas = this.canvas;
    node.tree = this;
    this.root = node;
  }

  setTextSize(size) {
    this.textSize = Number(size);
    this.draw();
  }

  setFontSize(ystep) {
    this.textSize = this.calculateFontSize ? this.calculateFontSize(ystep) : Math.min((ystep / 2), 15);
    this.canvas.font = this.textSize + 'pt ' + this.font;
  }

  setTreeType(type, quiet) {
    if (!(type in treeTypes)) {
      return fireEvent(this.canvasEl, 'error', { error: new Error(`"${type}" is not a known tree-type.`) });
    }

    let oldType = this.treeType;
    this.treeType = type;

    this.branchRenderer = treeTypes[type].branchRenderer;
    this.prerenderer = treeTypes[type].prerenderer;
    this.labelAlign = treeTypes[type].labelAlign;
    this.scaleCollapsedNode = treeTypes[type].scaleCollapsedNode;
    this.calculateFontSize = treeTypes[type].calculateFontSize;

    if (this.drawn) {
      this.drawn = false;
      this.draw();
    }

    if (!quiet) {
      this.treeTypeChanged(oldType, type);
    }
  }

  setSize(width, height) {
    this.canvas.canvas.width = width;
    this.canvas.canvas.height = height;
    if (this.navigator) {
      this.navigator.resize();
    }
    this.adjustForPixelRatio();
  }

  setZoom(z) {
    if (z > -2 && z < 2) {
      var oz = this.zoom;
      this.zoom = Math.pow(10, z);

      this.offsetx = (this.offsetx / oz) * this.zoom;
      this.offsety = (this.offsety / oz) * this.zoom;

      this.draw();
    }
  }

  toggleLabels() {
    this.showLabels = !this.showLabels;
    this.draw();
  }

  setMaxLabelLength() {
    var dimensions;
    if (this.maxLabelLength[this.treeType] === undefined) {
      this.maxLabelLength[this.treeType] = 0;
    }

    for (var i = 0; i < this.leaves.length; i++) {
      dimensions = this.canvas.measureText(this.leaves[i].id);
      // finding the maximum label length
      if (dimensions.width > this.maxLabelLength[this.treeType]) {
        this.maxLabelLength[this.treeType] = dimensions.width;
      }
    }
  }


  loadCompleted() {
    fireEvent(this.canvasEl, 'loaded');
  }

  loadStarted() {
    fireEvent(this.canvasEl, 'loading');
  }

  loadError(error) {
    fireEvent(this.canvasEl, 'error', { error });
  }

  subtreeDrawn(node) {
    fireEvent(this.canvasEl, 'subtree', { node });
  }

  nodesUpdated(nodeIds, property) {
    fireEvent(this.canvasEl, 'updated', { nodeIds, property });
  }

  addListener(event, listener) {
    addEvent(this.canvasEl, event, listener);
  }

  getBounds() {
    var minx = this.root.startx;
    var maxx = this.root.startx;
    var miny = this.root.starty;
    var maxy = this.root.starty;

    for (let i = this.leaves.length; i--; ) {
      let node = this.leaves[i];
      let x = this.alignLabels ? this.labelAlign.getX(node) : node.centerx;
      let y = this.alignLabels ? this.labelAlign.getY(node) : node.centery;
      let theta = node.angle;
      let pad = node.getTotalSize();

      x = x + (pad * Math.cos(theta));
      y = y + (pad * Math.sin(theta));

      minx = Math.min(minx, x);
      maxx = Math.max(maxx, x);
      miny = Math.min(miny, y);
      maxy = Math.max(maxy, y);
    }
    return [ [ minx, miny ], [ maxx, maxy ] ];
  }

  fitInPanel() {
    var bounds = this.getBounds();
    var minx = bounds[0][0];
    var maxx = bounds[1][0];
    var miny = bounds[0][1];
    var maxy = bounds[1][1];
    var padding = 50;
    var canvasSize = [
      this.canvas.canvas.width - padding,
      this.canvas.canvas.height - padding
    ];

    this.zoom = Math.min(canvasSize[0] / (maxx - minx), canvasSize[1] / (maxy - miny));
    this.offsety = (maxy + miny) * this.zoom / -2;
    this.offsetx = (maxx + minx) * this.zoom / -2;
  }

  adjustForPixelRatio() {
    var ratio = getPixelRatio(this.canvas);

    this.canvas.canvas.style.height = this.canvas.canvas.height + 'px';
    this.canvas.canvas.style.width = this.canvas.canvas.width + 'px';

    if (ratio > 1) {
      this.canvas.canvas.width *= ratio;
      this.canvas.canvas.height *= ratio;
    }
  }

  treeTypeChanged(oldType, newType) {
    fireEvent(this.canvasEl, 'typechanged', { oldType: oldType, newType: newType });
  }

  resetTree() {
    if (!this.originalTree.branches) return;

    this.branches = this.originalTree.branches;
    for (let n of Object.keys(this.originalTree.branchLengths)) {
      this.branches[n].branchLength = this.originalTree.branchLengths[n];
      this.branches[n].parent = this.originalTree.parents[n];
    }

    this.leaves = this.originalTree.leaves;
    this.root = this.originalTree.root;
  }

  rotateBranch(branch) {
    this.branches[branch.id].rotate();
  }

  extractNestedBranches() {
    this.branches = {};
    this.leaves = [];

    this.storeNode(this.root);
    this.root.extractChildren();
  }

  exportNwk() {
    var nwk = this.root.getNwk();
    return nwk.substr(0, nwk.lastIndexOf(')') + 1) + ';';
  }

  resizeToContainer() {
    this.setSize(this.canvasEl.offsetWidth, this.canvasEl.offsetHeight);
  }
}

Tree.prototype.on = Tree.prototype.addListener;
