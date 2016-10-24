(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Phylocanvas"] = factory();
	else
		root["Phylocanvas"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.utils = exports.nodeRenderers = exports.treeTypes = exports.Parser = exports.Tooltip = exports.Prerenderer = exports.Branch = exports.Tree = undefined;

	var _Tree = __webpack_require__(1);

	var _Tree2 = _interopRequireDefault(_Tree);

	var _Branch = __webpack_require__(7);

	var _Branch2 = _interopRequireDefault(_Branch);

	var _Prerenderer = __webpack_require__(11);

	var _Prerenderer2 = _interopRequireDefault(_Prerenderer);

	var _Tooltip = __webpack_require__(27);

	var _Tooltip2 = _interopRequireDefault(_Tooltip);

	var _Parser = __webpack_require__(29);

	var _Parser2 = _interopRequireDefault(_Parser);

	var _treeTypes = __webpack_require__(8);

	var _treeTypes2 = _interopRequireDefault(_treeTypes);

	var _nodeRenderers = __webpack_require__(26);

	var _nodeRenderers2 = _interopRequireDefault(_nodeRenderers);

	var _utils = __webpack_require__(2);

	var utils = _interopRequireWildcard(_utils);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function decorate(object, fnName, fn) {
	  var target = object[fnName] ? object : object.prototype;
	  var originalFn = target[fnName];

	  target[fnName] = function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return fn.call(this, originalFn, args);
	  };
	}

	/**
	 * The publicly exported module. Exports the following methods by default, and
	 * contains named exports of internal classes, types, and utils.
	 *
	 * @module Phylocanvas
	 */

	exports.Tree = _Tree2.default;
	exports.Branch = _Branch2.default;
	exports.Prerenderer = _Prerenderer2.default;
	exports.Tooltip = _Tooltip2.default;
	exports.Parser = _Parser2.default;
	exports.treeTypes = _treeTypes2.default;
	exports.nodeRenderers = _nodeRenderers2.default;
	exports.utils = utils;

	/**
	 * Register a plugin.
	 *
	 * @param {function} pluginFn - Imported plugin module.
	 */

	function plugin(pluginFn) {
	  pluginFn.call(this, decorate);
	}

	/**
	 * A factory function for Phylocanvas instances to enable decoration by plugins.
	 *
	 * @param {string|HTMLElement} element - ID or element within which to place Phylocanvas instance.
	 * @param {Object} config - Configuration object, properties are copied into the {@link Tree} object.
	 *
	 * @return An instance of {@link Tree}.
	 */
	function createTree(element) {
	  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  return new _Tree2.default(element, config);
	}

	exports.default = { plugin: plugin, createTree: createTree };

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(2);

	var _Branch = __webpack_require__(7);

	var _Branch2 = _interopRequireDefault(_Branch);

	var _Tooltip = __webpack_require__(27);

	var _treeTypes = __webpack_require__(8);

	var _treeTypes2 = _interopRequireDefault(_treeTypes);

	var _parsers = __webpack_require__(28);

	var _parsers2 = _interopRequireDefault(_parsers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var addClass = _utils.dom.addClass;
	var setCursorDrag = _utils.dom.setCursorDrag;
	var setCursorDragging = _utils.dom.setCursorDragging;
	var fireEvent = _utils.events.fireEvent;
	var addEvent = _utils.events.addEvent;
	var getPixelRatio = _utils.canvas.getPixelRatio;
	var translateClick = _utils.canvas.translateClick;
	var Predicates = _utils.constants.Predicates;

	/**
	 * A Phylocanvas instance.
	 *
	 * @class
	 * @see module:Phylocanvas~createTree
	 */

	var Tree = function () {
	  /**
	   * @constructor
	   * @param {string|HTMLElement} element
	   * @param {Object} config
	   */
	  function Tree(element) {
	    var _this = this;

	    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    _classCallCheck(this, Tree);

	    this._point = { x: 0, y: 0 };

	    /**
	     * Places the instance in the DOM. Events are triggered from here.
	     *
	     * @type HTMLElement
	     */
	    this.containerElement = typeof element === 'string' ? document.getElementById(element) : element;

	    addClass(this.containerElement, 'pc-container');

	    /**
	     * Dictionary of {@link Branch} objects indexed by ID.
	     *
	     * @type {Object.<string, Branch>}
	     */
	    this.branches = {};

	    /**
	     * List of leaves.
	     *
	     * @type Array.<Branch>
	     */
	    this.leaves = [];

	    /**
	     * The root node of the tree
	     * (not neccesarily a root in the Phylogenetic sense)
	     *
	     * @type Branch
	     */
	    this.root = false;

	    /**
	     * Stores the unparsed tree.
	     *
	     * @type string
	     */
	    this.stringRepresentation = '';

	    /**
	     * Colour the branches of the tree based on the colour of the tips.
	     *
	     * @type boolean
	     */
	    this.backColour = false;

	    /**
	     * Stores the state of the tree after parsing.
	     *
	     * @type Object
	     */
	    this.originalTree = {};

	    // Set up the element and canvas
	    if (window.getComputedStyle(this.containerElement).position === 'static') {
	      this.containerElement.style.position = 'relative';
	    }
	    this.containerElement.style.boxSizing = 'border-box';

	    var canvasElement = document.createElement('canvas');
	    canvasElement.id = (this.containerElement.id || '') + '__canvas';
	    canvasElement.className = 'phylocanvas';
	    canvasElement.style.position = 'relative';
	    canvasElement.height = element.offsetHeight || 400;
	    canvasElement.width = element.offsetWidth || 400;
	    canvasElement.style.zIndex = '1';
	    this.containerElement.appendChild(canvasElement);

	    /**
	     * Canvas drawing context.
	     *
	     * @type CanvasRenderingContext2D
	     */
	    this.canvas = canvasElement.getContext('2d');
	    this.canvas.canvas.onselectstart = function () {
	      return false;
	    };
	    this.canvas.fillStyle = '#000000';
	    this.canvas.strokeStyle = '#000000';
	    this.canvas.save();

	    /**
	     * Colour for collapsed sections of the tree.
	     *
	     * @type string
	     */
	    this.collapsedColour = 'rgba(0, 0, 0, 0.5)';

	    /**
	     * A minimum and maximum number of child branches within which to
	     * automatically collapse branches on the first draw.
	     *
	     * @type object
	     * @property {number} min
	     * @property {number} max
	     */
	    this.defaultCollapsed = {};

	    /**
	     * The default tooltip showing number of child branches.
	     *
	     * @type Tooltip
	     */
	    this.tooltip = new _Tooltip.ChildNodesTooltip(this);

	    /**
	     * Has Tree been drawn already, true after first draw.
	     *
	     * @type boolean
	     */
	    this.drawn = false;

	    /**
	     * Stores highlighting functions used during drawing.
	     *
	     * @type Array.<Function>
	     */
	    this.highlighters = [];

	    /**
	     * The current level of zoom.
	     *
	     * @type number
	     */
	    this.zoom = 1;

	    /**
	     * Controls the speed of zooming. Recommended values are between 1 and 5.
	     *
	     * @type number
	     * @default
	     */
	    this.zoomFactor = 3;

	    /**
	     * @type boolean
	     * @default
	     */
	    this.disableZoom = false;

	    /**
	     * Force rectangular and hierarchical trees to use the canvas dimensions
	     * instead of the number of leaves for proportion at the prerender stage.
	     *
	     * @type boolean
	     */
	    this.fillCanvas = false;

	    /**
	     * Enable branch scaling.
	     *
	     * @type boolean
	     * @default
	     */
	    this.branchScaling = true;

	    /**
	     * The current branch scale.
	     *
	     * @type number
	     */
	    this.currentBranchScale = 1;

	    /**
	     * The ratio at which branches scale.
	     *
	     * @type number
	     */
	    this.branchScalingStep = 1.2;

	    /**
	     * Whether a click has been detected.
	     *
	     * @type boolean
	     */
	    this.pickedup = false;

	    /**
	     * Whether the user is dragging.
	     *
	     * @type boolean
	     */
	    this.dragging = false;

	    /**
	     * The starting x coordinate of a drag.
	     *
	     * @type number
	     */
	    this.startx = null;
	    /**
	     * The starting y coordinate of a drag.
	     *
	     * @type number
	     */
	    this.starty = null;

	    /**
	     * Factor with which to scale the radius of a leaf.
	     *
	     * @type number
	     * @default
	     */
	    this.baseNodeSize = 1;

	    /**
	     * Caches the offsetx when a click is detected.
	     *
	     * @type number
	     */
	    this.origx = null;
	    /**
	     * Caches the offsety when a click is detected.
	     *
	     * @type number
	     */
	    this.origy = null;

	    /**
	     * The x coordinate from which to begin drawing from.
	     *
	     * @type number
	     */
	    this.offsetx = this.canvas.canvas.width / 2;
	    /**
	     * The y coordinate from which to begin drawing from.
	     *
	     * @type number
	     */
	    this.offsety = this.canvas.canvas.height / 2;

	    /**
	     * The colour to apply to a selected branch.
	     *
	     * @type string
	     * @default
	     */
	    this.selectedColour = 'rgba(49,151,245,1)';

	    /**
	     * The colour to apply to a hihglighted branch.
	     *
	     * @type string
	     * @default
	     */
	    this.highlightColour = 'rgba(49,151,245,1)';

	    /**
	     * The line width of the halo on a highlighted branch.
	     *
	     * @type number
	     * @default
	     */
	    this.highlightWidth = 4;

	    /**
	     * Scale factor for the size of the the halo on a highlighted branch.
	     *
	     * @type number
	     * @default
	     */
	    this.highlightSize = 2;

	    /**
	     * Global branch colour,
	     *
	     * @type string
	     * @default
	     */
	    this.branchColour = 'rgba(0,0,0,1)';

	    /**
	     * Scale factor applied to branch lengths defined in the serialised
	     * representation of the tree.
	     *
	     * @type number
	     */
	    this.branchScalar = 1.0;

	    /**
	     * Space to add to bounds when fitting the tree to the canvas.
	     *
	     * @type number
	     * @default
	     */
	    this.padding = 50;

	    /**
	     * Space between a leaf and its label.
	     *
	     * @type number
	     * @default
	     */
	    this.labelPadding = 5;

	    /**
	     * Enable/disable shift-click multi-selection.
	     *
	     * @type boolean
	     * @default
	     */
	    this.multiSelect = true;

	    /**
	     * Flag to change on branch when clicked.
	     *
	     * @type string
	     * @default
	     */
	    this.clickFlag = 'selected';

	    /**
	     * Decide if a branch should be affected when clicked.
	     *
	     * @type function
	     *
	     * @param {Branch} branch
	     * @param {string} property
	     * @param {} value
	     *
	     * @return boolean
	     * @default A function returning true.
	     */
	    this.clickFlagPredicate = Predicates.tautology;

	    /**
	     * Show labels when hovering over node.
	     *
	     * @type boolean
	     * @default
	     */
	    this.hoverLabel = false;

	    /**
	     * @type boolean
	     * @default
	     */
	    this.internalNodesSelectable = true;

	    /**
	     * @type boolean
	     * @default
	     */
	    this.showLabels = true;

	    /**
	     * Global show/hide branch-length labels.
	     *
	     * @type boolean
	     * @default
	     */
	    this.showBranchLengthLabels = false;
	    /**
	     * Conditionally display branch-length labels when enabled.
	     *
	     * @type function
	     * @param {Branch} node
	     * @default
	     */
	    this.branchLengthLabelPredicate = Predicates.tautology;

	    /**
	     * @type boolean
	     * @default
	     */
	    this.showInternalNodeLabels = false;

	    /**
	     * Global style for internal labels on branches.
	     *
	     * @type object
	     * @property {string} colour
	     * @property {number} textSize
	     * @property {string} font
	     * @property {string} format - e.g. bold, italic
	     */
	    this.internalLabelStyle = {
	      colour: this.branchColour,
	      textSize: this.textSize,
	      font: this.font,
	      format: ''
	    };

	    this.setTreeType('radial');

	    /**
	     * Stores the length of the longest branch on the tree.
	     *
	     * @type number
	     */
	    this.maxBranchLength = 0;

	    /**
	     * The visible width of the branches.
	     *
	     * @type number
	     * @default
	     */
	    this.lineWidth = 1.0;

	    /**
	     * The size of the labels, scaled to the size of the tree on first draw.
	     *
	     * @type number
	     */
	    this.textSize = 7;

	    /**
	     * The font of the labels.
	     *
	     * @type string
	     */
	    this.font = 'sans-serif';

	    /**
	     * @type boolean
	     * @default
	     */
	    this.unselectOnClickAway = true;

	    /**
	     * X coordinate of node that is furthest from the root.
	     *
	     * @type number
	     */
	    this.farthestNodeFromRootX = 0;
	    /**
	     * Y coordinate of node that is furthest from the root.
	     *
	     * @type number
	     */
	    this.farthestNodeFromRootY = 0;

	    /**
	     * Require the 'shift' key to be depressed to allow dragging
	     */
	    this.shiftKeyDrag = false;

	    /**
	     * Maximum length of label for each tree type.
	     *
	     * @type Object.<string, number>
	     */
	    this.maxLabelLength = {};

	    // Override properties from config
	    Object.assign(this, config);

	    this.resizeToContainer();

	    this.addListener('click', this.clicked.bind(this));

	    this.addListener('mousedown', this.pickup.bind(this));
	    this.addListener('mouseup', this.drop.bind(this));
	    this.addListener('mouseout', this.drop.bind(this));

	    addEvent(this.canvas.canvas, 'mousemove', this.drag.bind(this));
	    addEvent(this.canvas.canvas, 'mousewheel', this.scroll.bind(this));
	    addEvent(this.canvas.canvas, 'DOMMouseScroll', this.scroll.bind(this));

	    addEvent(window, 'resize', function () {
	      _this.resizeToContainer();
	      _this.draw();
	    });
	  }

	  /**
	   * Set/get if labels are currently aligned.
	   *
	   * @type boolean
	   */


	  _createClass(Tree, [{
	    key: 'setInitialCollapsedBranches',


	    /**
	     * Collapses branches based on {@link Tree#defaultCollapsed}.
	     *
	     * @param {Branch} [node=this.root]
	     */
	    value: function setInitialCollapsedBranches() {
	      var node = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.root;

	      var childIds;
	      var i;

	      childIds = node.getChildProperties('id');
	      if (childIds && childIds.length > this.defaultCollapsed.min && childIds.length < this.defaultCollapsed.max) {
	        node.collapsed = true;
	        return;
	      }

	      for (i = 0; i < node.children.length; i++) {
	        this.setInitialCollapsedBranches(node.children[i]);
	      }
	    }

	    /**
	     * @param {MouseEvent} event
	     * @returns {Branch}
	     */

	  }, {
	    key: 'getNodeAtMousePosition',
	    value: function getNodeAtMousePosition(event) {
	      var _root;

	      return (_root = this.root).clicked.apply(_root, _toConsumableArray(translateClick(event, this)));
	    }

	    /**
	     * @returns {Branch[]} Selected leaves
	     */

	  }, {
	    key: 'getSelectedNodeIds',
	    value: function getSelectedNodeIds() {
	      return this.getNodeIdsWithFlag('selected');
	    }

	    /**
	     * @param {string} flag - A boolean property of the branch
	     * @param {boolean} [value=true]
	     * @returns {Branch[]}
	     */

	  }, {
	    key: 'getNodeIdsWithFlag',
	    value: function getNodeIdsWithFlag(flag) {
	      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	      return this.leaves.reduce(function (memo, leaf) {
	        if (leaf[flag] === value) {
	          memo.push(leaf.id);
	        }
	        return memo;
	      }, []);
	    }

	    /**
	     * Event listener for click events.
	     *
	     * @param {MouseEvent} e
	     */

	  }, {
	    key: 'clicked',
	    value: function clicked(e) {
	      var node;
	      if (e.button === 0) {
	        var nodeIds = [];
	        // if this is triggered by the release after a drag then the click
	        // shouldn't be triggered.
	        if (this.dragging) {
	          this.dragging = false;
	          return;
	        }

	        if (!this.root) return false;
	        node = this.getNodeAtMousePosition(e);
	        var isMultiSelectActive = this.multiSelect && (e.metaKey || e.ctrlKey);
	        if (node && node.interactive) {
	          if (isMultiSelectActive) {
	            if (node.leaf) {
	              node[this.clickFlag] = !node[this.clickFlag];
	            } else if (this.internalNodesSelectable) {
	              var someUnflagged = node.getChildProperties(this.clickFlag).some(function (prop) {
	                return prop === false;
	              });
	              node.cascadeFlag(this.clickFlag, someUnflagged, this.clickFlagPredicate);
	            }
	            nodeIds = this.getNodeIdsWithFlag(this.clickFlag);
	            this.draw();
	          } else {
	            this.root.cascadeFlag(this.clickFlag, false, this.clickFlagPredicate);
	            if (this.internalNodesSelectable || node.leaf) {
	              node.cascadeFlag(this.clickFlag, true, this.clickFlagPredicate);
	              nodeIds = node.getChildProperties('id');
	            }
	            this.draw();
	          }
	        } else if (this.unselectOnClickAway && !this.dragging && !isMultiSelectActive) {
	          this.root.cascadeFlag(this.clickFlag, false, this.clickFlagPredicate);
	          this.draw();
	        }

	        if (!this.pickedup) {
	          this.dragging = false;
	        }

	        this.nodesUpdated(nodeIds, this.clickFlag);
	      }
	    }

	    /**
	     * Handles dragging and hovering.
	     *
	     * @param {MouseEvent} event
	     */

	  }, {
	    key: 'drag',
	    value: function drag(event) {
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
	      } else {
	        // hover
	        var e = event;
	        var nd = this.getNodeAtMousePosition(e);

	        if (nd && nd.interactive && (this.internalNodesSelectable || nd.leaf)) {
	          this.root.cascadeFlag('hovered', false);
	          nd.hovered = true;
	          // For mouseover tooltip to show no. of children on the internal nodes
	          if (!nd.leaf && !nd.hasCollapsedAncestor()) {
	            this.tooltip.open(e.clientX, e.clientY, nd);
	          }
	          this.containerElement.style.cursor = 'pointer';
	        } else {
	          this.tooltip.close();
	          this.root.cascadeFlag('hovered', false);
	          if (this.shiftKeyDrag && e.shiftKey) {
	            setCursorDrag(this.containerElement);
	          } else {
	            this.containerElement.style.cursor = 'auto';
	          }
	        }
	        this.draw();
	      }
	    }

	    /**
	     * Draws the frame.
	     *
	     * @param {boolean} forceRedraw - Also run the prerenderer.
	     */

	  }, {
	    key: 'draw',
	    value: function draw(forceRedraw) {
	      this.highlighters.length = 0;

	      if (this.maxBranchLength === 0) {
	        this.loadError(new Error('All branches in the tree are identical.'));
	        return;
	      }

	      this.canvas.clearRect(0, 0, this.canvas.canvas.width, this.canvas.canvas.height);
	      this.canvas.lineCap = 'round';
	      this.canvas.lineJoin = 'round';

	      this.canvas.strokeStyle = this.branchColour;
	      this.canvas.save();

	      if (!this.drawn || forceRedraw) {
	        this.prerenderer.run(this);
	        if (!forceRedraw) {
	          this.fitInPanel();
	        }
	      }
	      var pixelRatio = getPixelRatio(this.canvas);
	      this.canvas.lineWidth = this.lineWidth / this.zoom;
	      this.canvas.translate(this.offsetx * pixelRatio, this.offsety * pixelRatio);
	      this.canvas.scale(this.zoom, this.zoom);
	      this.branchRenderer.render(this, this.root);

	      this.highlighters.forEach(function (render) {
	        return render();
	      });

	      this.drawn = true;

	      this.canvas.restore();
	    }

	    /**
	     * Mousedown event handler
	     *
	     * @param {MouseEvent} event
	     */

	  }, {
	    key: 'pickup',
	    value: function pickup(event) {
	      if (!this.shiftKeyDrag || event.shiftKey) {
	        if (!this.drawn) return false;
	        this.origx = this.offsetx;
	        this.origy = this.offsety;

	        if (event.button === 0) {
	          this.pickedup = true;
	          setCursorDragging(this.containerElement);
	        }

	        this.startx = event.clientX;
	        this.starty = event.clientY;
	      }
	    }

	    /**
	     * mouseup event handler.
	     */

	  }, {
	    key: 'drop',
	    value: function drop(event) {
	      if (!this.drawn) return false;
	      this.pickedup = false;
	      if (this.shiftKeyDrag && event.shiftKey) {
	        setCursorDrag(this.containerElement);
	      } else {
	        this.containerElement.style.cursor = 'auto';
	      }
	    }

	    /**
	     * Mousewheel event handler.
	     *
	     * @param event
	     */

	  }, {
	    key: 'scroll',
	    value: function scroll(event) {
	      if (this.disableZoom || 'wheelDelta' in event && event.wheelDelta === 0) {
	        return;
	      }

	      event.preventDefault();

	      this._point.x = event.offsetX;
	      this._point.y = event.offsetY;
	      var sign = event.detail < 0 || event.wheelDelta > 0 ? 1 : -1;
	      if (this.branchScaling && (event.metaKey || event.ctrlKey)) {
	        this.currentBranchScale *= Math.pow(this.branchScalingStep, sign);
	        this.setBranchScale(this.currentBranchScale, this._point);
	      } else {
	        this.smoothZoom(sign, this._point);
	      }
	    }

	    /**
	     * @param {RegExp} pattern
	     * @param {string} [searchProperty=id].
	     * @return {Branch[]}
	     */

	  }, {
	    key: 'findLeaves',
	    value: function findLeaves(pattern) {
	      var searchProperty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';

	      var foundLeaves = [];

	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = this.leaves[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var leaf = _step.value;

	          if (leaf[searchProperty] && leaf[searchProperty].match(pattern)) {
	            foundLeaves.push(leaf);
	          }
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      return foundLeaves;
	    }

	    /**
	     * @param {Branch[]} leaves
	     * @param {string} property
	     * @param {} value
	     *
	     * @fires Tree#updated
	     */

	  }, {
	    key: 'updateLeaves',
	    value: function updateLeaves(leaves, property, value) {
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = this.leaves[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var leaf = _step2.value;

	          leaf[property] = !value;
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }

	      var _iteratorNormalCompletion3 = true;
	      var _didIteratorError3 = false;
	      var _iteratorError3 = undefined;

	      try {
	        for (var _iterator3 = leaves[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	          var _leaf = _step3.value;

	          _leaf[property] = value;
	        }
	      } catch (err) {
	        _didIteratorError3 = true;
	        _iteratorError3 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion3 && _iterator3.return) {
	            _iterator3.return();
	          }
	        } finally {
	          if (_didIteratorError3) {
	            throw _iteratorError3;
	          }
	        }
	      }

	      this.nodesUpdated(leaves.map(function (_) {
	        return _.id;
	      }), property);
	    }

	    /**
	     * Deselects all branches, implicitly calls {@link Tree#draw}.
	     */

	  }, {
	    key: 'clearSelect',
	    value: function clearSelect() {
	      this.root.cascadeFlag('selected', false);
	      this.draw();
	    }

	    /**
	     * @returns {string} Base64-encoded data uri of canvas
	     */

	  }, {
	    key: 'getPngUrl',
	    value: function getPngUrl() {
	      return this.canvas.canvas.toDataURL();
	    }

	    /**
	     * Loads a serialised representation of a tree, using the first registered
	     * parser that validates the input unless a format is specified.
	     *
	     * @param {string} inputString
	     * @param {Object} [options] - also passed on to the parser.
	     * @param {string} [options.format] - specify the parser to use.
	     * @param {function} [callback] - Called synchronously *after* the first draw.
	     *
	     * @fires Tree#error
	     *
	     * @see Tree#build
	     */

	  }, {
	    key: 'load',
	    value: function load(inputString) {
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      var callback = arguments[2];

	      var buildOptions = options;
	      var buildCallback = callback;

	      // allows passing callback as second param
	      if (typeof options === 'function') {
	        buildCallback = options;
	        buildOptions = {};
	      }

	      if (buildCallback) {
	        buildOptions.callback = buildCallback;
	      }

	      if (buildOptions.format) {
	        this.build(inputString, _parsers2.default[buildOptions.format], buildOptions);
	        return;
	      }

	      var _iteratorNormalCompletion4 = true;
	      var _didIteratorError4 = false;
	      var _iteratorError4 = undefined;

	      try {
	        for (var _iterator4 = Object.keys(_parsers2.default)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	          var parserName = _step4.value;

	          var parser = _parsers2.default[parserName];

	          if (inputString.match(parser.fileExtension) || inputString.match(parser.validator)) {
	            this.build(inputString, parser, buildOptions);
	            return;
	          }
	        }
	      } catch (err) {
	        _didIteratorError4 = true;
	        _iteratorError4 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion4 && _iterator4.return) {
	            _iterator4.return();
	          }
	        } finally {
	          if (_didIteratorError4) {
	            throw _iteratorError4;
	          }
	        }
	      }

	      var error = new Error('String not recognised as a file or a parseable format string');
	      if (buildCallback) {
	        buildCallback(error);
	      }
	      this.loadError(error);
	    }

	    /**
	     * Builds the {@link Tree#originalTree} object.
	     */

	  }, {
	    key: 'saveOriginalTree',
	    value: function saveOriginalTree() {
	      this.originalTree.branches = this.branches;
	      this.originalTree.leaves = this.leaves;
	      this.originalTree.root = this.root;
	      this.originalTree.branchLengths = {};
	      this.originalTree.parents = {};
	    }

	    /**
	     * Clears the branches and leaves of the instance.
	     */

	  }, {
	    key: 'clearState',
	    value: function clearState() {
	      this.root = false;
	      this.leaves = [];
	      this.branches = {};
	      this.drawn = false;
	    }

	    /**
	     * Build {@link Tree#branches} and {@link Tree#leaves} properties.
	     */

	  }, {
	    key: 'extractNestedBranches',
	    value: function extractNestedBranches() {
	      this.branches = {};
	      this.leaves = [];

	      this.storeNode(this.root);
	      this.root.extractChildren();
	    }

	    /**
	     * High-level API to organising branches and leaves.
	     *
	     * @fires Tree#error
	     */

	  }, {
	    key: 'saveState',
	    value: function saveState() {
	      this.extractNestedBranches();

	      this.root.branchLength = 0;
	      this.maxBranchLength = 0;
	      this.root.setTotalLength();

	      if (this.maxBranchLength === 0) {
	        this.loadError(new Error('All branches in the tree are identical.'));
	        return;
	      }
	    }

	    /**
	     * Builds the object model of a tree.
	     *
	     * @param {string} formatString
	     * @param {Parser} parser
	     * @param {Object} options
	     *
	     * @fires Tree#error
	     * @fires Tree#beforeFirstDraw
	     * @fires Tree#loadCompleted
	     */

	  }, {
	    key: 'build',
	    value: function build(formatString, parser, options) {
	      var _this2 = this;

	      this.originalTree = {};
	      this.clearState();
	      _Branch2.default.lastId = 0;

	      var root = new _Branch2.default();
	      root.id = 'root';
	      this.branches.root = root;
	      this.setRoot(root);

	      parser.parse({ formatString: formatString, root: root, options: options }, function (error) {
	        if (error) {
	          if (options.callback) {
	            options.callback(error);
	          }
	          _this2.loadError(error);
	          return;
	        }
	        _this2.stringRepresentation = formatString;
	        _this2.saveState();
	        _this2.setInitialCollapsedBranches();
	        _this2.beforeFirstDraw();
	        _this2.draw();
	        _this2.saveOriginalTree();
	        if (options.callback) {
	          options.callback();
	        }

	        _this2.loadCompleted();
	      });
	    }

	    /**
	     * Draw a subtree.
	     *
	     * @param {Branch} node - the new root of the tree.
	     *
	     * @fires Tree#subtree
	     */

	  }, {
	    key: 'redrawFromBranch',
	    value: function redrawFromBranch(node) {
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

	    /**
	     * Reload the serialised version of the tree.
	     */

	  }, {
	    key: 'redrawOriginalTree',
	    value: function redrawOriginalTree() {
	      this.load(this.stringRepresentation);
	    }

	    /**
	     * Traverse the tree, generating ids and filing away objects.
	     *
	     * @param {Branch} node - starting point.
	     */

	  }, {
	    key: 'storeNode',
	    value: function storeNode(node) {
	      if (!node.id || node.id === '') {
	        node.id = _Branch2.default.generateId();
	      }

	      if (this.branches[node.id]) {
	        if (node !== this.branches[node.id]) {
	          if (!node.leaf) {
	            node.id = _Branch2.default.generateId();
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

	    /**
	     * @param {number} size
	     */

	  }, {
	    key: 'setNodeSize',
	    value: function setNodeSize(size) {
	      this.baseNodeSize = Number(size);
	      this.draw();
	    }

	    /**
	     * @param {Branch} node
	     */

	  }, {
	    key: 'setRoot',
	    value: function setRoot(node) {
	      node.tree = this;
	      this.root = node;
	    }

	    /**
	     * @param {number|string} size
	     */

	  }, {
	    key: 'setTextSize',
	    value: function setTextSize(size) {
	      this.textSize = Number(size);
	      this.draw();
	    }

	    /**
	     * Sets an appropriate font size for the proportions of the tree.
	     *
	     * @param {number} ystep - the space between leaves.
	     */

	  }, {
	    key: 'setFontSize',
	    value: function setFontSize(ystep) {
	      this.textSize = this.calculateFontSize ? this.calculateFontSize(ystep) : Math.min(ystep / 2, 15);
	      this.canvas.font = this.textSize + 'pt ' + this.font;
	    }

	    /**
	     * @param {string} type - The name of a registered tree type.
	     * @param {boolean} [quiet] - Do not broadcast.
	     *
	     * @fires Tree#typechanged
	     */

	  }, {
	    key: 'setTreeType',
	    value: function setTreeType(type, quiet) {
	      if (!(type in _treeTypes2.default)) {
	        return fireEvent(this.containerElement, 'error', { error: new Error('"' + type + '" is not a known tree-type.') });
	      }

	      var oldType = this.treeType;
	      this.treeType = type;
	      this.type = _treeTypes2.default[type];

	      this.branchRenderer = _treeTypes2.default[type].branchRenderer;
	      this.prerenderer = _treeTypes2.default[type].prerenderer;
	      this.labelAlign = _treeTypes2.default[type].labelAlign;
	      this.calculateFontSize = _treeTypes2.default[type].calculateFontSize;

	      if (this.drawn) {
	        this.drawn = false;
	        this.draw();
	      }

	      if (!quiet) {
	        this.treeTypeChanged(oldType, type);
	      }
	    }

	    /**
	     * Resizes the canvas element.
	     *
	     * @param {number} width
	     * @param {number} height
	     */

	  }, {
	    key: 'setSize',
	    value: function setSize(width, height) {
	      this.canvas.canvas.width = width;
	      this.canvas.canvas.height = height;
	      if (this.navigator) {
	        this.navigator.resize();
	      }
	      this.adjustForPixelRatio();
	    }

	    /**
	     * Scale the size of the canvas element to the pixel ratio
	     */

	  }, {
	    key: 'adjustForPixelRatio',
	    value: function adjustForPixelRatio() {
	      var ratio = getPixelRatio(this.canvas);

	      this.canvas.canvas.style.height = this.canvas.canvas.height + 'px';
	      this.canvas.canvas.style.width = this.canvas.canvas.width + 'px';

	      if (ratio > 1) {
	        this.canvas.canvas.width *= ratio;
	        this.canvas.canvas.height *= ratio;
	      }
	    }

	    /**
	     * @returns {{ x: number, y: number }} point w/ x and y coordinates
	     */

	  }, {
	    key: 'getCentrePoint',
	    value: function getCentrePoint() {
	      var pixelRatio = getPixelRatio(this.canvas);
	      return {
	        x: this.canvas.canvas.width / 2 / pixelRatio,
	        y: this.canvas.canvas.height / 2 / pixelRatio
	      };
	    }

	    /**
	     * Zoom to a specific level over a specific point.
	     *
	     * @param {number} zoom
	     * @param {{ x: number, y: number }} [point=Tree#getCentrePoint]
	     */

	  }, {
	    key: 'setZoom',
	    value: function setZoom(zoom) {
	      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getCentrePoint();

	      var x = _ref.x;
	      var y = _ref.y;

	      if (zoom > 0) {
	        var oldZoom = this.zoom;
	        this.zoom = zoom;
	        this.offsetx = this.calculateZoomedOffset(this.offsetx, x, oldZoom, zoom);
	        this.offsety = this.calculateZoomedOffset(this.offsety, y, oldZoom, zoom);
	        this.draw();
	      }
	    }

	    /**
	     * Zoom in or out from the current zoom level towards a point.
	     *
	     * @param {number} steps - positive to zoom in, negative to zoom out.
	     * @param {{ x: number, y: number }} point
	     */

	  }, {
	    key: 'smoothZoom',
	    value: function smoothZoom(steps, point) {
	      this.setZoom(Math.pow(10, Math.log(this.zoom) / Math.log(10) + steps * this.zoomFactor * 0.01), point);
	    }

	    /**
	     * Magic to enable zooming to a point.
	     *
	     * @author Khalil Abudahab
	     * @param {number} offset
	     * @param {number} coord
	     * @param {number} oldZoom
	     * @param {number} newZoom
	     */

	  }, {
	    key: 'calculateZoomedOffset',
	    value: function calculateZoomedOffset(offset, coord, oldZoom, newZoom) {
	      return -1 * ((-1 * offset + coord) / oldZoom * newZoom - coord);
	    }

	    /**
	     * Scale branches horizontally
	     *
	     * @param {number} scale
	     * @param {Object} point
	     */

	  }, {
	    key: 'setBranchScale',
	    value: function setBranchScale() {
	      var scale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
	      var point = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { x: this.canvas.canvas.width / 2, y: this.canvas.canvas.height / 2 };

	      var treeType = _treeTypes2.default[this.treeType];
	      if (!treeType.branchScalingAxis || scale < 0) {
	        return;
	      }

	      var previoudBranchLength = this.branchScalar;
	      this.branchScalar = this.initialBranchScalar * scale;
	      var scaleRatio = this.branchScalar / previoudBranchLength;
	      var offset = this['offset' + treeType.branchScalingAxis];
	      var oldPosition = point[treeType.branchScalingAxis];
	      var newPosition = (point[treeType.branchScalingAxis] - offset) * scaleRatio + offset;
	      this['offset' + treeType.branchScalingAxis] += oldPosition - newPosition;
	      this.draw();
	    }

	    /**
	     * @method
	     */

	  }, {
	    key: 'toggleLabels',
	    value: function toggleLabels() {
	      this.showLabels = !this.showLabels;
	      this.draw();
	    }

	    /**
	     * @method
	     */

	  }, {
	    key: 'setMaxLabelLength',
	    value: function setMaxLabelLength() {
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

	    /**
	     * @event Tree#loading
	     */

	  }, {
	    key: 'loadStarted',
	    value: function loadStarted() {
	      fireEvent(this.containerElement, 'loading');
	    }

	    /**
	     * @event Tree#beforeFirstDraw
	     */

	  }, {
	    key: 'beforeFirstDraw',
	    value: function beforeFirstDraw() {
	      fireEvent(this.containerElement, 'beforeFirstDraw');
	    }

	    /**
	     * @event Tree#loaded
	     */

	  }, {
	    key: 'loadCompleted',
	    value: function loadCompleted() {
	      fireEvent(this.containerElement, 'loaded');
	    }

	    /**
	     * @event Tree#error
	     * @property {Error} error
	     */

	  }, {
	    key: 'loadError',
	    value: function loadError(error) {
	      fireEvent(this.containerElement, 'error', { error: error });
	    }

	    /**
	     * @event Tree#subtree
	     * @property {Branch} node
	     */

	  }, {
	    key: 'subtreeDrawn',
	    value: function subtreeDrawn(node) {
	      fireEvent(this.containerElement, 'subtree', { node: node });
	    }

	    /**
	     * @event Tree#updated
	     * @property {string[]} nodeIds
	     * @property {string} property
	     * @property {boolean} append
	     */

	  }, {
	    key: 'nodesUpdated',
	    value: function nodesUpdated(nodeIds, property) {
	      var append = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	      fireEvent(this.containerElement, 'updated', { nodeIds: nodeIds, property: property, append: append });
	    }

	    /**
	     * @event Tree#typechanged
	     * @property {string} oldType
	     * @property {string} newType
	     */

	  }, {
	    key: 'treeTypeChanged',
	    value: function treeTypeChanged(oldType, newType) {
	      fireEvent(this.containerElement, 'typechanged', { oldType: oldType, newType: newType });
	    }

	    /**
	     * @param {string}
	     * @param {function}
	     */

	  }, {
	    key: 'addListener',
	    value: function addListener(event, listener) {
	      addEvent(this.containerElement, event, listener);
	    }

	    /**
	     * @param {Array.<Branch>} [leaves=this.leaves]
	     *
	     * @returns {Array.<Array.<number>>} bounds - Minimum x and y coordinates in
	     * the first array, maximum x and y coordinates in the second.
	     *
	     * @example const [ [ minx, miny ], [ maxx, maxy ] ] = tree.getBounds()
	     */

	  }, {
	    key: 'getBounds',
	    value: function getBounds() {
	      var leaves = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.leaves;

	      // this.leaves assumes bounds of whole tree, start from root
	      var initialBounds = leaves === this.leaves ? this.root : leaves[0];
	      var minx = initialBounds.startx;
	      var maxx = initialBounds.startx;
	      var miny = initialBounds.starty;
	      var maxy = initialBounds.starty;

	      var _iteratorNormalCompletion5 = true;
	      var _didIteratorError5 = false;
	      var _iteratorError5 = undefined;

	      try {
	        for (var _iterator5 = leaves[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	          var leaf = _step5.value;

	          var bounds = leaf.getBounds();
	          minx = Math.min(minx, bounds.minx);
	          maxx = Math.max(maxx, bounds.maxx);
	          miny = Math.min(miny, bounds.miny);
	          maxy = Math.max(maxy, bounds.maxy);
	        }
	      } catch (err) {
	        _didIteratorError5 = true;
	        _iteratorError5 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion5 && _iterator5.return) {
	            _iterator5.return();
	          }
	        } finally {
	          if (_didIteratorError5) {
	            throw _iteratorError5;
	          }
	        }
	      }

	      return [[minx, miny], [maxx, maxy]];
	    }

	    /**
	     * Zoom to the provided leaves.
	     *
	     * @param {Array.<Branch>}
	     */

	  }, {
	    key: 'fitInPanel',
	    value: function fitInPanel(leaves) {
	      this.zoom = 1; // calculates consistent bounds
	      var bounds = this.getBounds(leaves);
	      var canvasSize = [this.canvas.canvas.width - this.padding * 2, this.canvas.canvas.height - this.padding * 2];
	      var treeSize = [bounds[1][0] - bounds[0][0], bounds[1][1] - bounds[0][1]];
	      var pixelRatio = getPixelRatio(this.canvas);
	      var xZoomRatio = canvasSize[0] / treeSize[0];
	      var yZoomRatio = canvasSize[1] / treeSize[1];
	      this.zoom = Math.min(xZoomRatio, yZoomRatio);
	      this.offsetx = -1 * bounds[0][0] * this.zoom;
	      this.offsety = -1 * bounds[0][1] * this.zoom;
	      if (xZoomRatio > yZoomRatio) {
	        this.offsetx += this.padding + (canvasSize[0] - treeSize[0] * this.zoom) / 2;
	        this.offsety += this.padding;
	      } else {
	        this.offsetx += this.padding;
	        this.offsety += this.padding + (canvasSize[1] - treeSize[1] * this.zoom) / 2;
	      }
	      this.offsetx = this.offsetx / pixelRatio;
	      this.offsety = this.offsety / pixelRatio;
	    }

	    /**
	     * Reapply data in {@link Tree#originalTree}.
	     */

	  }, {
	    key: 'resetTree',
	    value: function resetTree() {
	      if (!this.originalTree.branches) return;

	      this.branches = this.originalTree.branches;
	      var _iteratorNormalCompletion6 = true;
	      var _didIteratorError6 = false;
	      var _iteratorError6 = undefined;

	      try {
	        for (var _iterator6 = Object.keys(this.originalTree.branchLengths)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	          var n = _step6.value;

	          this.branches[n].branchLength = this.originalTree.branchLengths[n];
	          this.branches[n].parent = this.originalTree.parents[n];
	        }
	      } catch (err) {
	        _didIteratorError6 = true;
	        _iteratorError6 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion6 && _iterator6.return) {
	            _iterator6.return();
	          }
	        } finally {
	          if (_didIteratorError6) {
	            throw _iteratorError6;
	          }
	        }
	      }

	      this.leaves = this.originalTree.leaves;
	      this.root = this.originalTree.root;
	    }

	    /**
	     * @param {Branch}
	     */

	  }, {
	    key: 'rotateBranch',
	    value: function rotateBranch(branch) {
	      this.branches[branch.id].rotate();
	    }

	    /**
	     * @returns {string} Newick representation of current object model.
	     */

	  }, {
	    key: 'exportNwk',
	    value: function exportNwk() {
	      var nwk = this.root.getNwk();
	      return nwk.substr(0, nwk.lastIndexOf(')') + 1) + ';';
	    }

	    /**
	     * Resize canvas element to container.
	     */

	  }, {
	    key: 'resizeToContainer',
	    value: function resizeToContainer() {
	      this.setSize(this.containerElement.offsetWidth, this.containerElement.offsetHeight);
	    }
	  }, {
	    key: 'alignLabels',
	    get: function get() {
	      return this.showLabels && this.labelAlign && this.labelAlignEnabled;
	    },
	    set: function set(value) {
	      this.labelAlignEnabled = value;
	    }
	  }]);

	  return Tree;
	}();

	/**
	 * @memberof Tree
	 * @method
	 * @see Tree#addListener
	 */


	Tree.prototype.on = Tree.prototype.addListener;

	exports.default = Tree;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.events = exports.dom = exports.constants = exports.canvas = undefined;

	var _canvas2 = __webpack_require__(3);

	var _canvas = _interopRequireWildcard(_canvas2);

	var _constants2 = __webpack_require__(6);

	var _constants = _interopRequireWildcard(_constants2);

	var _dom2 = __webpack_require__(4);

	var _dom = _interopRequireWildcard(_dom2);

	var _events2 = __webpack_require__(5);

	var _events = _interopRequireWildcard(_events2);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	exports.canvas = _canvas;
	exports.constants = _constants;
	exports.dom = _dom;
	exports.events = _events;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getBackingStorePixelRatio = getBackingStorePixelRatio;
	exports.getPixelRatio = getPixelRatio;
	exports.translateClick = translateClick;
	exports.translatePoint = translatePoint;
	exports.undoPointTranslation = undoPointTranslation;

	var _dom = __webpack_require__(4);

	/**
	 * Return backing store pixel ratio of context.
	 *
	 * @param context - The rendering context of HTMl5 canvas.
	 *
	 */
	function getBackingStorePixelRatio(context) {
	  return context.backingStorePixelRatio || context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || 1;
	}

	function getPixelRatio(canvas) {
	  return (window.devicePixelRatio || 1) / getBackingStorePixelRatio(canvas);
	}

	function translateClick(event, tree) {
	  var pixelRatio = getPixelRatio(tree.canvas);
	  return [(event.offsetX - tree.offsetx) / tree.zoom * pixelRatio, (event.offsetY - tree.offsety) / tree.zoom * pixelRatio];
	}

	function translatePoint() {
	  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { x: 0, y: 0 };

	  var x = _ref.x;
	  var y = _ref.y;
	  var phylocanvas = arguments[1];

	  var pixelRatio = getPixelRatio(phylocanvas.canvas);
	  return {
	    x: (x - phylocanvas.offsetx) / phylocanvas.zoom * pixelRatio,
	    y: (y - phylocanvas.offsety) / phylocanvas.zoom * pixelRatio
	  };
	}

	function undoPointTranslation() {
	  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { x: 0, y: 0 };

	  var x = _ref2.x;
	  var y = _ref2.y;
	  var phylocanvas = arguments[1];

	  var pixelRatio = getPixelRatio(phylocanvas.canvas);
	  return {
	    x: x / pixelRatio * phylocanvas.zoom + phylocanvas.offsetx,
	    y: y / pixelRatio * phylocanvas.zoom + phylocanvas.offsety
	  };
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createBlobUrl = createBlobUrl;
	exports.setupDownloadLink = setupDownloadLink;
	exports.getX = getX;
	exports.getY = getY;
	exports.addClass = addClass;
	exports.removeClass = removeClass;
	exports.hasClass = hasClass;
	exports.setCursorDragging = setCursorDragging;
	exports.setCursorDrag = setCursorDrag;

	var _events = __webpack_require__(5);

	var windowURL = window.URL || window.webkitURL;

	function createBlobUrl(data) {
	  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'text/plain;charset=utf-8';

	  var blob = new Blob([data], { type: type });
	  return windowURL.createObjectURL(blob);
	}

	function setupDownloadLink(url, filename) {
	  var anchor = document.createElement('a');
	  var isDownloadSupported = typeof anchor.download !== 'undefined';

	  anchor.href = url;
	  anchor.target = '_blank';
	  if (isDownloadSupported) {
	    anchor.download = filename;
	  }
	  (0, _events.fireEvent)(anchor, 'click');
	  if (isDownloadSupported) {
	    windowURL.revokeObjectURL(anchor.href);
	  }
	}

	/**
	 * Get the x coordinate of oElement
	 *
	 * @param domElement - The element to get the X position of.
	 *
	 */
	function getX(domElement) {
	  var xValue = 0;
	  while (domElement) {
	    xValue += domElement.offsetLeft;
	    domElement = domElement.offsetParent;
	  }
	  return xValue;
	}

	/**
	 * Get the y coordinate of oElement
	 *
	 * @param domElement - The element to get the Y position of.
	 *
	 */
	function getY(domElement) {
	  var yValue = 0;
	  while (domElement) {
	    yValue += domElement.offsetTop;
	    domElement = domElement.offsetParent;
	  }
	  return yValue;
	}

	function addClass(element, className) {
	  var classes = element.className.split(' ');
	  if (classes.indexOf(className) === -1) {
	    classes.push(className);
	    element.className = classes.join(' ');
	  }
	}

	function removeClass(element, className) {
	  var classes = element.className.split(' ');
	  var index = classes.indexOf(className);

	  if (index !== -1) {
	    classes.splice(index, 1);
	    element.className = classes.join(' ');
	  }
	}

	function hasClass(element, className) {
	  var classes = element.className.split(' ');
	  var index = classes.indexOf(className);

	  return index !== -1;
	}

	/**
	 * Setting the cursor to dragging required vendor prefixes.
	 * @param domElement
	 */
	function setCursorDragging(domElement) {
	  domElement.style.cursor = "-webkit-grabbing";
	  domElement.style.cursor = "-moz-grabbing";
	  domElement.style.cursor = "grabbing";
	}

	/**
	 * Setting the cursor to drag required vendor prefixes.
	 * @param domElement
	 */
	function setCursorDrag(domElement) {
	  domElement.style.cursor = "-webkit-grab";
	  domElement.style.cursor = "-moz-grab";
	  domElement.style.cursor = "grab";
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.preventDefault = preventDefault;
	exports.fireEvent = fireEvent;
	exports.addEvent = addEvent;
	exports.killEvent = killEvent;
	exports.createHandler = createHandler;
	function preventDefault(event) {
	  event.preventDefault();
	  return false;
	}

	function fireEvent(element, type) {
	  var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  var event; // The custom event that will be created
	  var param;

	  if (document.createEvent) {
	    event = document.createEvent('HTMLEvents');
	    event.initEvent(type, true, true);
	  } else {
	    event = document.createEventObject();
	    event.eventType = type;
	  }

	  event.eventName = type;

	  for (param in params) {
	    if (params.hasOwnProperty(param)) {
	      event[param] = params[param];
	    }
	  }

	  if (document.createEvent) {
	    element.dispatchEvent(event);
	  } else {
	    element.fireEvent('on' + event.eventType, event);
	  }
	}

	function addEvent(elem, event, fn) {
	  if (elem.addEventListener) {
	    elem.addEventListener(event, fn, false);
	  } else {
	    elem.attachEvent('on' + event, function () {
	      // set the this pointer same as addEventListener when fn is called
	      return fn.call(elem, window.event);
	    });
	  }
	}

	function killEvent(e) {
	  e.stopPropagation();
	  e.preventDefault();
	}

	/**
	 * Creates a function which can be called from an event handler independent of
	 * scope.
	 *
	 * @param {Object} obj the object the function will be called on
	 * @param {String} func the name of the function to be called
	 * @retuns {function}
	 */
	function createHandler(obj, func) {
	  var handler;

	  if ((typeof func === 'undefined' ? 'undefined' : _typeof(func)) === _typeof('aaa')) {
	    handler = function handler(e) {
	      if (obj[func]) {
	        return obj[func](e);
	      }
	    };
	  } else {
	    handler = function handler() {
	      return func(obj);
	    };
	  }
	  return handler;
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * An enumeration of certain pre-defined angles to enable faster drawing of
	 * trees. There are FORTYFIVE, QUARTER, HALF and FULL. Values are all radians.
	 *
	 * @enum
	 * @memberof PhyloCanvas
	 * @constant
	 */
	var Angles = exports.Angles = {
	  /**
	   * @constant
	   * @type double
	   * @description PI / 4
	   */
	  FORTYFIVE: Math.PI / 4,
	  /**
	   * @constant
	   * @type double
	   * @description PI / 2
	   */
	  QUARTER: Math.PI / 2,
	  /**
	   * @constant
	   * @type double
	   * @description PI
	   */
	  HALF: Math.PI,
	  /**
	   * @constant
	   * @type double
	   * @description PI * 2
	   */
	  FULL: 2 * Math.PI
	};

	/**
	 * dictionary to translate newick annotations to branch renderer ids
	 *
	 * @enum
	 * @memberof PhyloCanvas
	 * @constant
	 */
	var Shapes = exports.Shapes = {
	  x: 'star',
	  s: 'square',
	  o: 'circle',
	  t: 'triangle'
	};

	/**
	 * Standard set of predicates.
	 *
	 * @enum
	 * @constant
	 */
	var Predicates = exports.Predicates = {
	  tautology: function tautology() {
	    return true;
	  },
	  contradiction: function contradiction() {
	    return false;
	  },
	  leafOnly: function leafOnly(node) {
	    return node.leaf;
	  },
	  nonLeaf: function nonLeaf(node) {
	    return !node.leaf;
	  }
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(2);

	var _treeTypes = __webpack_require__(8);

	var _treeTypes2 = _interopRequireDefault(_treeTypes);

	var _nodeRenderers = __webpack_require__(26);

	var _nodeRenderers2 = _interopRequireDefault(_nodeRenderers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Angles = _utils.constants.Angles;
	var Shapes = _utils.constants.Shapes;

	// Caching object to reduce garbage

	var _bounds = {
	  minx: 0,
	  maxx: 0,
	  miny: 0,
	  maxy: 0
	};

	var _leafStyle = {
	  lineWidth: null,
	  strokeStyle: null,
	  fillStyle: null
	};

	/**
	 * A branch of the tree.
	 *
	 * @class
	 */

	var Branch = function () {
	  function Branch() {
	    _classCallCheck(this, Branch);

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


	  _createClass(Branch, [{
	    key: 'clicked',


	    /**
	     * Determines if this branch has been clicked.
	     *
	     * @param {number}
	     * @param {number}
	     * @returns {Branch}
	     */
	    value: function clicked(x, y) {
	      if (this.dragging || this.hasCollapsedAncestor()) {
	        return null;
	      }
	      if (x < this.maxx && x > this.minx && y < this.maxy && y > this.miny) {
	        return this;
	      }

	      for (var i = this.children.length - 1; i >= 0; i--) {
	        var child = this.children[i].clicked(x, y);
	        if (child) {
	          return child;
	        }
	      }
	    }

	    /**
	     * @method
	     */

	  }, {
	    key: 'drawLabel',
	    value: function drawLabel() {
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

	      var tx = this.getLabelStartX();

	      if (this.tree.alignLabels) {
	        tx += Math.abs(this.tree.labelAlign.getLabelOffset(this));
	      }

	      if (this.angle > Angles.QUARTER && this.angle < Angles.HALF + Angles.QUARTER) {
	        this.canvas.rotate(Angles.HALF);
	        // Angles.Half text position changes
	        tx = -tx - this.labelWidth * 1;
	      }

	      this.canvas.beginPath();
	      this.canvas.fillStyle = this.getTextColour();
	      this.canvas.fillText(label, tx, fSize / 2);
	      this.canvas.closePath();

	      // Rotate canvas back to original position
	      if (this.angle > Angles.QUARTER && this.angle < Angles.HALF + Angles.QUARTER) {
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

	  }, {
	    key: 'setNodeDimensions',
	    value: function setNodeDimensions(centerX, centerY, radius) {
	      var boundedRadius = radius;

	      if (radius * this.tree.zoom < 5 || !this.leaf) {
	        boundedRadius = 5 / this.tree.zoom;
	      }

	      this.minx = centerX - boundedRadius;
	      this.maxx = centerX + boundedRadius;
	      this.miny = centerY - boundedRadius;
	      this.maxy = centerY + boundedRadius;
	    }
	  }, {
	    key: 'getNumberOfLeaves',
	    value: function getNumberOfLeaves() {
	      var numberOfLeaves = 0;
	      var queue = [this];
	      while (queue.length) {
	        var node = queue.pop();
	        if (node.leaf) {
	          numberOfLeaves++;
	        } else {
	          var _iteratorNormalCompletion = true;
	          var _didIteratorError = false;
	          var _iteratorError = undefined;

	          try {
	            for (var _iterator = node.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	              var child = _step.value;

	              queue.push(child);
	            }
	          } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	          } finally {
	            try {
	              if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	              }
	            } finally {
	              if (_didIteratorError) {
	                throw _iteratorError;
	              }
	            }
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

	  }, {
	    key: 'drawCollapsed',
	    value: function drawCollapsed(centerX, centerY) {
	      var getCollapsedMeasurements = _treeTypes2.default[this.tree.treeType].getCollapsedMeasurements;


	      this.canvas.beginPath();

	      var _getCollapsedMeasurem = getCollapsedMeasurements(this);

	      var angle = _getCollapsedMeasurem.angle;
	      var radius = _getCollapsedMeasurem.radius;

	      var startAngle = this.angle - angle / 2;
	      var endAngle = this.angle + angle / 2;

	      this.canvas.moveTo(centerX, centerY);
	      this.canvas.arc(centerX, centerY, radius, startAngle, endAngle, false);

	      var gradient = this.canvas.createRadialGradient(centerX, centerY, radius, centerX, centerY, 0.2 * radius);
	      gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
	      gradient.addColorStop(1, this.tree.collapsedColour || this.getColour());
	      this.canvas.fillStyle = gradient;

	      this.canvas.fill();
	    }

	    /**
	     * For aligned labels.
	     *
	     * @method
	     */

	  }, {
	    key: 'drawLabelConnector',
	    value: function drawLabelConnector() {
	      var _tree = this.tree;
	      var highlightColour = _tree.highlightColour;
	      var labelAlign = _tree.labelAlign;

	      this.canvas.save();

	      this.canvas.lineWidth = this.canvas.lineWidth / 4;
	      this.canvas.strokeStyle = this.isHighlighted ? highlightColour : this.getColour();

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

	  }, {
	    key: 'drawLeaf',
	    value: function drawLeaf() {
	      var _tree2 = this.tree;
	      var alignLabels = _tree2.alignLabels;
	      var canvas = _tree2.canvas;


	      if (alignLabels) {
	        this.drawLabelConnector();
	      }

	      canvas.save();

	      _nodeRenderers2.default[this.nodeShape](canvas, this.getRadius(), this.getLeafStyle());

	      canvas.restore();

	      if (this.tree.showLabels || this.tree.hoverLabel && this.isHighlighted) {
	        this.drawLabel();
	      }
	    }

	    /**
	     * @param {number}
	     * @param {number}
	     */

	  }, {
	    key: 'drawHighlight',
	    value: function drawHighlight(centerX, centerY) {
	      this.canvas.save();
	      this.canvas.beginPath();

	      this.canvas.strokeStyle = this.tree.highlightColour;
	      this.canvas.lineWidth = this.getHighlightLineWidth();
	      var radius = this.getHighlightRadius();
	      this.canvas.arc(centerX, centerY, radius, 0, Angles.FULL, false);

	      this.canvas.stroke();

	      this.canvas.closePath();
	      this.canvas.restore();
	    }

	    /**
	     * @method
	     */

	  }, {
	    key: 'drawBranchLabels',
	    value: function drawBranchLabels() {
	      this.canvas.save();
	      var labelStyle = this.internalLabelStyle || this.tree.internalLabelStyle;
	      this.canvas.fillStyle = labelStyle.colour;
	      this.canvas.font = labelStyle.format + ' ' + labelStyle.textSize + 'pt ' + labelStyle.font;
	      this.canvas.textBaseline = 'middle';
	      this.canvas.textAlign = 'center';
	      var em = this.canvas.measureText('M').width * 2 / 3;

	      var x = this.tree.type.branchScalingAxis === 'y' ? this.centerx : (this.startx + this.centerx) / 2;
	      var y = this.tree.type.branchScalingAxis === 'x' ? this.centery : (this.starty + this.centery) / 2;

	      if (this.tree.showBranchLengthLabels && this.tree.branchLengthLabelPredicate(this)) {
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

	  }, {
	    key: 'drawNode',
	    value: function drawNode() {
	      var nodeRadius = this.getRadius();
	      /**
	       * theta = translation to center of node... ensures that the node edge is
	       * at the end of the branch so the branches don't look shorter than  they
	       * should
	       */
	      var theta = nodeRadius;

	      var centerX = this.leaf ? theta * Math.cos(this.angle) + this.centerx : this.centerx;
	      var centerY = this.leaf ? theta * Math.sin(this.angle) + this.centery : this.centery;

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

	  }, {
	    key: 'getChildProperties',
	    value: function getChildProperties(property) {
	      if (this.leaf) {
	        // Fix for Issue #68
	        // Returning array, as expected
	        return [this[property]];
	      }

	      var children = [];
	      for (var x = 0; x < this.children.length; x++) {
	        children = children.concat(this.children[x].getChildProperties(property));
	      }
	      return children;
	    }

	    /**
	     * @returns {number}
	     */

	  }, {
	    key: 'getChildCount',
	    value: function getChildCount() {
	      if (this.leaf) return 1;

	      var children = 0;
	      for (var x = 0; x < this.children.length; x++) {
	        children += this.children[x].getChildCount();
	      }
	      return children;
	    }

	    /**
	     * @returns {number}
	     */

	  }, {
	    key: 'getChildYTotal',
	    value: function getChildYTotal() {
	      if (this.leaf) return this.centery;

	      var y = 0;
	      for (var i = 0; i < this.children.length; i++) {
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

	  }, {
	    key: 'cascadeFlag',
	    value: function cascadeFlag(property, value, predicate) {
	      if (typeof this[property] === 'undefined') {
	        throw new Error('Unknown property: ' + property);
	      }
	      if (typeof predicate === 'undefined' || predicate(this, property, value)) {
	        this[property] = value;
	      }
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = this.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var child = _step2.value;

	          child.cascadeFlag(property, value, predicate);
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }
	    }

	    /**
	     * Resets the coordinates and angle of this branch and its descendants.
	     */

	  }, {
	    key: 'reset',
	    value: function reset() {
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

	  }, {
	    key: 'redrawTreeFromBranch',
	    value: function redrawTreeFromBranch() {
	      if (this.collapsed) {
	        this.expand();
	      }
	      this.tree.redrawFromBranch(this);
	    }

	    /**
	     * Store this branch's children.
	     */

	  }, {
	    key: 'extractChildren',
	    value: function extractChildren() {
	      var _iteratorNormalCompletion3 = true;
	      var _didIteratorError3 = false;
	      var _iteratorError3 = undefined;

	      try {
	        for (var _iterator3 = this.children[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	          var child = _step3.value;

	          this.tree.storeNode(child);
	          child.extractChildren();
	        }
	      } catch (err) {
	        _didIteratorError3 = true;
	        _iteratorError3 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion3 && _iterator3.return) {
	            _iterator3.return();
	          }
	        } finally {
	          if (_didIteratorError3) {
	            throw _iteratorError3;
	          }
	        }
	      }
	    }

	    /**
	     * Walks up the tree looking for a collapsed branch.
	     *
	     * @returns {boolean}
	     */

	  }, {
	    key: 'hasCollapsedAncestor',
	    value: function hasCollapsedAncestor() {
	      if (this.parent) {
	        return this.parent.collapsed || this.parent.hasCollapsedAncestor();
	      }
	      return false;
	    }

	    /**
	     * @method
	     */

	  }, {
	    key: 'collapse',
	    value: function collapse() {
	      // don't collapse the node if it is a leaf... that would be silly!
	      this.collapsed = this.leaf === false;
	    }

	    /**
	     * @method
	     */

	  }, {
	    key: 'expand',
	    value: function expand() {
	      this.collapsed = false;
	    }

	    /**
	     * @method
	     */

	  }, {
	    key: 'toggleCollapsed',
	    value: function toggleCollapsed() {
	      if (this.collapsed) {
	        this.expand();
	      } else {
	        this.collapse();
	      }
	    }

	    /**
	     * Sums the length of all branches from this one back to the root.
	     */

	  }, {
	    key: 'setTotalLength',
	    value: function setTotalLength() {
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

	  }, {
	    key: 'addChild',
	    value: function addChild(node) {
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

	  }, {
	    key: 'getChildColours',
	    value: function getChildColours() {
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

	  }, {
	    key: 'getColour',
	    value: function getColour(specifiedColour) {
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

	  }, {
	    key: 'getNwk',
	    value: function getNwk() {
	      var isRoot = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

	      if (this.leaf) {
	        return this.label + ':' + this.branchLength;
	      }

	      var childNwks = this.children.map(function (child) {
	        return child.getNwk(false);
	      });
	      return '(' + childNwks.join(',') + '):' + this.branchLength + (isRoot ? ';' : '');
	    }

	    /**
	     * @returns {string}
	     */

	  }, {
	    key: 'getTextColour',
	    value: function getTextColour() {
	      if (this.selected) {
	        return this.tree.selectedColour;
	      }

	      if (this.isHighlighted) {
	        return this.tree.highlightColour;
	      }

	      if (this.tree.backColour && this.children.length) {
	        var childColours = this.getChildColours();
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

	  }, {
	    key: 'getLabel',
	    value: function getLabel() {
	      return this.label !== undefined && this.label !== null ? this.label : '';
	    }

	    /**
	     * @returns {number}
	     */

	  }, {
	    key: 'getTextSize',
	    value: function getTextSize() {
	      return this.labelStyle.textSize || this.tree.textSize;
	    }

	    /**
	     * @returns {string}
	     */

	  }, {
	    key: 'getFontString',
	    value: function getFontString() {
	      var font = this.labelStyle.font || this.tree.font;
	      return (this.labelStyle.format || '') + ' ' + this.getTextSize() + 'pt ' + font;
	    }

	    /**
	     * @returns {number} length of label in pixels
	     */

	  }, {
	    key: 'getLabelSize',
	    value: function getLabelSize() {
	      this.canvas.font = this.getFontString();
	      return this.canvas.measureText(this.getLabel()).width;
	    }

	    /**
	     * @returns {number}
	     */

	  }, {
	    key: 'getRadius',
	    value: function getRadius() {
	      var baseNodeSize = this.tree.baseNodeSize;

	      if (this.leaf) {
	        return baseNodeSize * this.radius;
	      }
	      return baseNodeSize / this.radius;
	    }

	    /**
	     * @returns {number}
	     */

	  }, {
	    key: 'getDiameter',
	    value: function getDiameter() {
	      return this.getRadius() * 2;
	    }

	    /**
	     * @returns {boolean}
	     */

	  }, {
	    key: 'hasLabelConnector',
	    value: function hasLabelConnector() {
	      if (!this.tree.alignLabels) {
	        return false;
	      }
	      return this.tree.labelAlign.getLabelOffset(this) > this.getDiameter();
	    }

	    /**
	     * Calculates label start position
	     * offset + aesthetic padding
	     *
	     * @return {number} x coordinate
	     */

	  }, {
	    key: 'getLabelStartX',
	    value: function getLabelStartX() {
	      var _getLeafStyle = this.getLeafStyle();

	      var lineWidth = _getLeafStyle.lineWidth;

	      var hasLabelConnector = this.hasLabelConnector();

	      var offset = this.getDiameter();

	      if (this.isHighlighted && !hasLabelConnector) {
	        offset += this.getHighlightSize() - this.getRadius();
	      }

	      return offset + Math.min(this.tree.labelPadding, this.tree.labelPadding / this.tree.zoom);
	    }

	    /**
	     * @returns {number}
	     */

	  }, {
	    key: 'getHighlightLineWidth',
	    value: function getHighlightLineWidth() {
	      return this.tree.highlightWidth / this.tree.zoom;
	    }

	    /**
	     * @returns {number}
	     */

	  }, {
	    key: 'getHighlightRadius',
	    value: function getHighlightRadius() {
	      var offset = this.getHighlightLineWidth() * this.tree.highlightSize;

	      offset += this.getLeafStyle().lineWidth / this.tree.highlightSize;

	      return this.leaf ? this.getRadius() + offset : offset * 0.666;
	    }

	    /**
	     * Combination of radius and line width
	     *
	     * @returns {number}
	     */

	  }, {
	    key: 'getHighlightSize',
	    value: function getHighlightSize() {
	      return this.getHighlightRadius() + this.getHighlightLineWidth();
	    }

	    /**
	     * Reverses the order of the children. Runs the prerenderer again.
	     *
	     * @method
	     */

	  }, {
	    key: 'rotate',
	    value: function rotate() {
	      var newChildren = [];

	      for (var i = this.children.length; i--;) {
	        newChildren.push(this.children[i]);
	      }

	      this.children = newChildren;

	      this.tree.extractNestedBranches();
	      this.tree.draw(true);
	    }

	    /**
	     * @returns {number} index of this branch in its parent's array.
	     */

	  }, {
	    key: 'getChildNo',
	    value: function getChildNo() {
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

	  }, {
	    key: 'setDisplay',
	    value: function setDisplay(_ref) {
	      var colour = _ref.colour;
	      var shape = _ref.shape;
	      var size = _ref.size;
	      var leafStyle = _ref.leafStyle;
	      var labelStyle = _ref.labelStyle;

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

	  }, {
	    key: 'getTotalLength',
	    value: function getTotalLength() {
	      var length = this.getRadius();

	      if (this.tree.showLabels || this.tree.hoverLabel && this.isHighlighted) {
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

	  }, {
	    key: 'getBounds',
	    value: function getBounds() {
	      var tree = this.tree;

	      var x = tree.alignLabels ? tree.labelAlign.getX(this) : this.centerx;
	      var y = tree.alignLabels ? tree.labelAlign.getY(this) : this.centery;
	      var nodeSize = this.getRadius();
	      var totalLength = this.getTotalLength();

	      var minx = void 0;
	      var maxx = void 0;
	      var miny = void 0;
	      var maxy = void 0;
	      if (this.angle > Angles.QUARTER && this.angle < Angles.HALF + Angles.QUARTER) {
	        minx = x + totalLength * Math.cos(this.angle);
	        miny = y + totalLength * Math.sin(this.angle);
	        maxx = x - nodeSize;
	        maxy = y - nodeSize;
	      } else {
	        minx = x - nodeSize;
	        miny = y - nodeSize;
	        maxx = x + totalLength * Math.cos(this.angle);
	        maxy = y + totalLength * Math.sin(this.angle);
	      }

	      // uses a caching object to reduce garbage
	      var step = tree.prerenderer.getStep(tree) / 2;
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

	  }, {
	    key: 'getLeafStyle',
	    value: function getLeafStyle() {
	      var _leafStyle2 = this.leafStyle;
	      var strokeStyle = _leafStyle2.strokeStyle;
	      var fillStyle = _leafStyle2.fillStyle;
	      var zoom = this.tree.zoom;

	      // uses a caching object to reduce garbage

	      _leafStyle.strokeStyle = this.getColour(strokeStyle);
	      _leafStyle.fillStyle = this.getColour(fillStyle);

	      var lineWidth = typeof this.leafStyle.lineWidth !== 'undefined' ? this.leafStyle.lineWidth : this.tree.lineWidth;

	      _leafStyle.lineWidth = lineWidth / zoom;

	      return _leafStyle;
	    }
	  }, {
	    key: 'isHighlighted',


	    /**
	     * True if the branch is highlighted or hovered.
	     *
	     * @type boolean
	     */
	    get: function get() {
	      return this.highlighted || this.hovered;
	    }

	    /**
	     * The canvas {@link https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D drawing context} of the parent tree.
	     *
	     * @type CanvasRenderingContext2D
	     */

	  }, {
	    key: 'canvas',
	    get: function get() {
	      return this.tree.canvas;
	    }
	  }], [{
	    key: 'generateId',
	    value: function generateId() {
	      return 'pcn' + this.lastId++;
	    }
	  }]);

	  return Branch;
	}();

	/**
	 * Static counter for generated ids.
	 *
	 * @static
	 * @memberof Branch
	 * @type number
	 */


	Branch.lastId = 0;

	exports.default = Branch;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _rectangular = __webpack_require__(9);

	var _rectangular2 = _interopRequireDefault(_rectangular);

	var _circular = __webpack_require__(14);

	var _circular2 = _interopRequireDefault(_circular);

	var _radial = __webpack_require__(17);

	var _radial2 = _interopRequireDefault(_radial);

	var _diagonal = __webpack_require__(20);

	var _diagonal2 = _interopRequireDefault(_diagonal);

	var _hierarchical = __webpack_require__(23);

	var _hierarchical2 = _interopRequireDefault(_hierarchical);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  rectangular: _rectangular2.default,
	  circular: _circular2.default,
	  radial: _radial2.default,
	  diagonal: _diagonal2.default,
	  hierarchical: _hierarchical2.default
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _BranchRenderer = __webpack_require__(10);

	var _BranchRenderer2 = _interopRequireDefault(_BranchRenderer);

	var _Prerenderer = __webpack_require__(11);

	var _Prerenderer2 = _interopRequireDefault(_Prerenderer);

	var _branchRenderer = __webpack_require__(12);

	var _branchRenderer2 = _interopRequireDefault(_branchRenderer);

	var _prerenderer = __webpack_require__(13);

	var _prerenderer2 = _interopRequireDefault(_prerenderer);

	var _constants = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var labelAlign = {
	  getX: function getX(node) {
	    return node.tree.farthestNodeFromRootX * node.tree.currentBranchScale;
	  },
	  getY: function getY(node) {
	    return node.centery;
	  },
	  getLabelOffset: function getLabelOffset(node) {
	    return node.tree.farthestNodeFromRootX * node.tree.currentBranchScale - node.centerx;
	  }
	};

	exports.default = {
	  branchRenderer: new _BranchRenderer2.default(_branchRenderer2.default),
	  prerenderer: new _Prerenderer2.default(_prerenderer2.default),
	  labelAlign: labelAlign,
	  branchScalingAxis: 'x',
	  getCollapsedMeasurements: function getCollapsedMeasurements(branch) {
	    return {
	      angle: _constants.Angles.QUARTER,
	      radius: branch.tree.step * branch.getNumberOfLeaves()
	    };
	  }
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Draws a branch.
	 *
	 * @class
	 */
	var BranchRenderer = function () {

	  /**
	   * @constructor
	   * @param {Object} options
	   * @param {function} options.draw
	   * @param {function} [options.prepareChild]
	   */
	  function BranchRenderer(options) {
	    _classCallCheck(this, BranchRenderer);

	    if (!options || !options.draw) {
	      throw new Error('`draw` function is required for branch renderers');
	    }

	    this.draw = options.draw;
	    this.prepareChild = options.prepareChild;
	  }

	  /**
	   * @param {Tree}
	   * @param {Branch}
	   * @param {boolean=} - if true, rendering skipped.
	   */


	  _createClass(BranchRenderer, [{
	    key: 'render',
	    value: function render(tree, branch, collapse) {
	      var i;
	      if (collapse || !branch) return;

	      if (branch.selected) {
	        branch.canvas.fillStyle = tree.selectedColour;
	      } else {
	        branch.canvas.fillStyle = branch.colour;
	      }
	      branch.canvas.strokeStyle = branch.getColour();

	      this.draw(tree, branch);

	      if (branch.pruned) {
	        return;
	      }

	      branch.drawNode();

	      for (i = 0; i < branch.children.length; i++) {
	        if (this.prepareChild) {
	          this.prepareChild(branch, branch.children[i]);
	        }
	        this.render(tree, branch.children[i], branch.collapsed || collapse);
	      }
	    }
	  }]);

	  return BranchRenderer;
	}();

	exports.default = BranchRenderer;

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Calculates the tree dimensions before the first draw.
	 *
	 * @class
	 */
	var Prerenderer = function () {

	  /**
	   * @constructor
	   * @param {Object} options
	   * @param {function} options.getStep - should return the space between each branch.
	   * @param {function} options.calculate
	   */
	  function Prerenderer(options) {
	    _classCallCheck(this, Prerenderer);

	    this.getStep = options.getStep;
	    this.calculate = options.calculate;
	  }

	  /**
	   * @param {Tree}
	   */


	  _createClass(Prerenderer, [{
	    key: "run",
	    value: function run(tree) {
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
	  }]);

	  return Prerenderer;
	}();

	exports.default = Prerenderer;

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  draw: function draw(tree, node) {
	    var branchLength = node.branchLength * tree.branchScalar;

	    node.angle = 0;
	    if (node.parent) {
	      node.centerx = node.startx + branchLength;
	    }

	    node.canvas.beginPath();
	    node.canvas.moveTo(node.startx, node.starty);
	    node.canvas.lineTo(node.startx, node.centery);
	    node.canvas.lineTo(node.centerx, node.centery);
	    node.canvas.stroke();
	    node.canvas.closePath();
	  },
	  prepareChild: function prepareChild(node, child) {
	    child.startx = node.centerx;
	    child.starty = node.centery;
	  }
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  getStep: function getStep(tree) {
	    return tree.fillCanvas ? tree.canvas.canvas.height / tree.leaves.length : Math.max(tree.canvas.canvas.height / tree.leaves.length, tree.leaves[0].getDiameter() + tree.labelPadding);
	  },
	  calculate: function calculate(tree, ystep) {
	    // Calculate branchScalar based on canvas width and total branch length
	    // This is used to transform the X coordinate based on the canvas width and no. of branches
	    tree.branchScalar = tree.canvas.canvas.width / tree.maxBranchLength;

	    // set initial positons of the branches
	    for (var i = 0; i < tree.leaves.length; i++) {
	      tree.leaves[i].angle = 0; // for rectangle
	      // Calculate and assign y coordinate for all the leaves
	      tree.leaves[i].centery = i > 0 ? tree.leaves[i - 1].centery + ystep : 0;
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

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _BranchRenderer = __webpack_require__(10);

	var _BranchRenderer2 = _interopRequireDefault(_BranchRenderer);

	var _Prerenderer = __webpack_require__(11);

	var _Prerenderer2 = _interopRequireDefault(_Prerenderer);

	var _branchRenderer = __webpack_require__(15);

	var _branchRenderer2 = _interopRequireDefault(_branchRenderer);

	var _prerenderer = __webpack_require__(16);

	var _prerenderer2 = _interopRequireDefault(_prerenderer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var labelAlign = {
	  getX: function getX(node) {
	    return node.centerx + node.labelOffsetX + node.getDiameter() * Math.cos(node.angle);
	  },
	  getY: function getY(node) {
	    return node.centery + node.labelOffsetY + node.getDiameter() * Math.sin(node.angle);
	  },
	  getLabelOffset: function getLabelOffset(node) {
	    return node.labelOffsetX / Math.cos(node.angle);
	  }
	};

	exports.default = {
	  branchRenderer: new _BranchRenderer2.default(_branchRenderer2.default),
	  prerenderer: new _Prerenderer2.default(_prerenderer2.default),
	  labelAlign: labelAlign,
	  getCollapsedMeasurements: function getCollapsedMeasurements(branch) {
	    var _branch$tree = branch.tree;
	    var maxBranchLength = _branch$tree.maxBranchLength;
	    var branchScalar = _branch$tree.branchScalar;
	    var step = _branch$tree.step;

	    return {
	      angle: branch.getNumberOfLeaves() * step,
	      radius: (maxBranchLength - branch.totalBranchLength) * branchScalar
	    };
	  },
	  calculateFontSize: function calculateFontSize(ystep) {
	    return Math.min(ystep * 10 + 4, 40);
	  }
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  draw: function draw(tree, node) {
	    var branchLength = node.totalBranchLength * tree.branchScalar;

	    node.canvas.beginPath();
	    node.canvas.moveTo(node.startx, node.starty);
	    node.canvas.lineTo(node.centerx, node.centery);
	    node.canvas.stroke();
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

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(2);

	var Angles = _utils.constants.Angles;
	exports.default = {
	  getStep: function getStep(tree) {
	    return Angles.FULL / tree.leaves.length;
	  },
	  calculate: function calculate(tree, step) {
	    tree.branchScalar = Math.min(tree.canvas.canvas.width, tree.canvas.canvas.height) / tree.maxBranchLength;
	    // work out radius of tree and the make branch scalar proportinal to the
	    var r = tree.leaves.length * tree.leaves[0].getDiameter() / Angles.FULL;
	    if (tree.branchScalar * tree.maxBranchLength > r) {
	      r = tree.branchScalar * tree.maxBranchLength;
	    } else {
	      tree.branchScalar = r / tree.maxBranchLength;
	    }

	    for (var i = 0; i < tree.leaves.length; i++) {
	      var node = tree.leaves[i];

	      node.angle = step * i;
	      node.startx = node.parent.totalBranchLength * tree.branchScalar * Math.cos(node.angle);
	      node.starty = node.parent.totalBranchLength * tree.branchScalar * Math.sin(node.angle);
	      node.centerx = node.totalBranchLength * tree.branchScalar * Math.cos(node.angle);
	      node.centery = node.totalBranchLength * tree.branchScalar * Math.sin(node.angle);
	      node.labelOffsetX = r * Math.cos(node.angle) - node.centerx;
	      node.labelOffsetY = r * Math.sin(node.angle) - node.centery;

	      for (; node.parent; node = node.parent) {
	        if (node.getChildNo() === 0) {
	          node.parent.angle = node.angle;
	          node.parent.minChildAngle = node.angle;
	        }
	        if (node.getChildNo() === node.parent.children.length - 1) {
	          node.parent.maxChildAngle = node.angle;
	          node.parent.angle = (node.parent.minChildAngle + node.parent.maxChildAngle) / 2;
	          node.parent.startx = (node.parent.totalBranchLength - node.parent.branchLength) * tree.branchScalar * Math.cos(node.parent.angle);
	          node.parent.starty = (node.parent.totalBranchLength - node.parent.branchLength) * tree.branchScalar * Math.sin(node.parent.angle);
	          node.parent.centerx = node.parent.totalBranchLength * tree.branchScalar * Math.cos(node.parent.angle);
	          node.parent.centery = node.parent.totalBranchLength * tree.branchScalar * Math.sin(node.parent.angle);
	        } else {
	          break;
	        }
	      }
	    }
	  }
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _BranchRenderer = __webpack_require__(10);

	var _BranchRenderer2 = _interopRequireDefault(_BranchRenderer);

	var _Prerenderer = __webpack_require__(11);

	var _Prerenderer2 = _interopRequireDefault(_Prerenderer);

	var _branchRenderer = __webpack_require__(18);

	var _branchRenderer2 = _interopRequireDefault(_branchRenderer);

	var _prerenderer = __webpack_require__(19);

	var _prerenderer2 = _interopRequireDefault(_prerenderer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  branchRenderer: new _BranchRenderer2.default(_branchRenderer2.default),
	  prerenderer: new _Prerenderer2.default(_prerenderer2.default),
	  getCollapsedMeasurements: function getCollapsedMeasurements(branch) {
	    var _branch$tree = branch.tree;
	    var maxBranchLength = _branch$tree.maxBranchLength;
	    var branchScalar = _branch$tree.branchScalar;
	    var step = _branch$tree.step;

	    return {
	      angle: branch.getNumberOfLeaves() * step,
	      radius: (maxBranchLength - branch.totalBranchLength) * branchScalar
	    };
	  },
	  calculateFontSize: function calculateFontSize(ystep) {
	    return Math.min(ystep * 50 + 5, 15);
	  }
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  draw: function draw(tree, node) {
	    node.canvas.beginPath();
	    node.canvas.moveTo(node.startx, node.starty);
	    node.canvas.lineTo(node.centerx, node.centery);
	    node.canvas.stroke();
	    node.canvas.closePath();
	  }
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(2);

	var Angles = _utils.constants.Angles;


	function prerenderNodes(tree, node) {
	  if (node.parent) {
	    node.startx = node.parent.centerx;
	    node.starty = node.parent.centery;
	  } else {
	    node.startx = 0;
	    node.starty = 0;
	  }
	  node.centerx = node.startx + node.branchLength * tree.branchScalar * Math.cos(node.angle);
	  node.centery = node.starty + node.branchLength * tree.branchScalar * Math.sin(node.angle);

	  for (var i = 0; i < node.children.length; i++) {
	    prerenderNodes(tree, node.children[i]);
	  }
	}

	exports.default = {
	  getStep: function getStep(tree) {
	    return Angles.FULL / tree.leaves.length;
	  },
	  calculate: function calculate(tree, step) {
	    tree.branchScalar = Math.min(tree.canvas.canvas.width, tree.canvas.canvas.height) / tree.maxBranchLength;

	    for (var i = 0.0; i < tree.leaves.length; i += 1.0) {
	      tree.leaves[i].angle = step * i;
	      tree.leaves[i].centerx = tree.leaves[i].totalBranchLength * tree.branchScalar * Math.cos(tree.leaves[i].angle);
	      tree.leaves[i].centery = tree.leaves[i].totalBranchLength * tree.branchScalar * Math.sin(tree.leaves[i].angle);

	      for (var node = tree.leaves[i]; node.parent; node = node.parent) {
	        if (node.getChildNo() === 0) {
	          node.parent.angle = 0;
	        }
	        node.parent.angle += node.angle * node.getChildCount();
	        if (node.getChildNo() === node.parent.children.length - 1) {
	          node.parent.angle = node.parent.angle / node.parent.getChildCount();
	        } else {
	          break;
	        }
	      }
	    }

	    prerenderNodes(tree, tree.root);
	  }
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _BranchRenderer = __webpack_require__(10);

	var _BranchRenderer2 = _interopRequireDefault(_BranchRenderer);

	var _Prerenderer = __webpack_require__(11);

	var _Prerenderer2 = _interopRequireDefault(_Prerenderer);

	var _branchRenderer = __webpack_require__(21);

	var _branchRenderer2 = _interopRequireDefault(_branchRenderer);

	var _prerenderer = __webpack_require__(22);

	var _prerenderer2 = _interopRequireDefault(_prerenderer);

	var _constants = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  branchRenderer: new _BranchRenderer2.default(_branchRenderer2.default),
	  prerenderer: new _Prerenderer2.default(_prerenderer2.default),
	  calculateFontSize: function calculateFontSize(ystep) {
	    return Math.min(ystep / 2, 10);
	  },
	  getCollapsedMeasurements: function getCollapsedMeasurements(branch) {
	    return {
	      angle: _constants.Angles.QUARTER,
	      radius: branch.tree.step * branch.getNumberOfLeaves()
	    };
	  }
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  draw: function draw(tree, node) {
	    node.angle = 0;
	    node.canvas.beginPath();

	    node.canvas.moveTo(node.startx, node.starty);
	    node.canvas.lineTo(node.centerx, node.centery);
	    node.canvas.stroke();

	    node.canvas.closePath();
	  },
	  prepareChild: function prepareChild(node, child) {
	    child.startx = node.centerx;
	    child.starty = node.centery;
	  }
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(2);

	var Angles = _utils.constants.Angles;
	exports.default = {
	  getStep: function getStep(tree) {
	    return Math.max(tree.canvas.canvas.height / tree.leaves.length, tree.leaves[0].getDiameter() + tree.labelPadding);
	  },
	  calculate: function calculate(tree, ystep) {
	    for (var i = 0; i < tree.leaves.length; i++) {
	      tree.leaves[i].centerx = 0;
	      tree.leaves[i].centery = i > 0 ? tree.leaves[i - 1].centery + ystep : 0;
	      tree.leaves[i].angle = 0;

	      for (var node = tree.leaves[i]; node.parent; node = node.parent) {
	        if (node.getChildNo() === node.parent.children.length - 1) {
	          node.parent.centery = node.parent.getChildYTotal() / node.parent.getChildCount(); // (node.parent.children.length - 1);
	          node.parent.centerx = node.parent.children[0].centerx + (node.parent.children[0].centery - node.parent.centery) * Math.tan(Angles.FORTYFIVE);
	          for (var j = 0; j < node.parent.children.length; j++) {
	            node.parent.children[j].startx = node.parent.centerx;
	            node.parent.children[j].starty = node.parent.centery;
	          }
	        } else {
	          break;
	        }
	      }
	    }
	  }
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _BranchRenderer = __webpack_require__(10);

	var _BranchRenderer2 = _interopRequireDefault(_BranchRenderer);

	var _Prerenderer = __webpack_require__(11);

	var _Prerenderer2 = _interopRequireDefault(_Prerenderer);

	var _branchRenderer = __webpack_require__(24);

	var _branchRenderer2 = _interopRequireDefault(_branchRenderer);

	var _prerenderer = __webpack_require__(25);

	var _prerenderer2 = _interopRequireDefault(_prerenderer);

	var _constants = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var labelAlign = {
	  getX: function getX(node) {
	    return node.centerx;
	  },
	  getY: function getY(node) {
	    return node.tree.farthestNodeFromRootY * node.tree.currentBranchScale;
	  },
	  getLabelOffset: function getLabelOffset(node) {
	    return node.tree.farthestNodeFromRootY * node.tree.currentBranchScale - node.centery;
	  }
	};

	exports.default = {
	  branchRenderer: new _BranchRenderer2.default(_branchRenderer2.default),
	  prerenderer: new _Prerenderer2.default(_prerenderer2.default),
	  labelAlign: labelAlign,
	  branchScalingAxis: 'y',
	  getCollapsedMeasurements: function getCollapsedMeasurements(branch) {
	    return {
	      angle: _constants.Angles.QUARTER,
	      radius: branch.tree.step * branch.getNumberOfLeaves()
	    };
	  }
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  draw: function draw(tree, node) {
	    var branchLength = node.branchLength * tree.branchScalar;

	    if (node.parent) {
	      node.centery = node.starty + branchLength;
	    }

	    node.canvas.beginPath();

	    if (node !== node.tree.root) {
	      node.canvas.moveTo(node.startx, node.starty);
	      node.canvas.lineTo(node.centerx, node.starty);
	    }

	    node.canvas.lineTo(node.centerx, node.centery);
	    node.canvas.stroke();

	    node.canvas.closePath();
	  },
	  prepareChild: function prepareChild(node, child) {
	    child.startx = node.centerx;
	    child.starty = node.centery;
	  }
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(2);

	var Angles = _utils.constants.Angles;
	exports.default = {
	  getStep: function getStep(tree) {
	    return tree.fillCanvas ? tree.canvas.canvas.width / tree.leaves.length : Math.max(tree.canvas.canvas.width / tree.leaves.length, tree.leaves[0].getDiameter() + tree.labelPadding);
	  },
	  calculate: function calculate(tree, xstep) {
	    tree.branchScalar = tree.canvas.canvas.height / tree.maxBranchLength;

	    for (var i = 0; i < tree.leaves.length; i++) {
	      tree.leaves[i].angle = Angles.QUARTER;
	      tree.leaves[i].centerx = i > 0 ? tree.leaves[i - 1].centerx + xstep : 0;
	      tree.leaves[i].centery = tree.leaves[i].totalBranchLength * tree.branchScalar;

	      for (var node = tree.leaves[i]; node.parent; node = node.parent) {
	        if (node.getChildNo() === 0) {
	          node.parent.centerx = node.centerx;
	        }

	        if (node.getChildNo() === node.parent.children.length - 1) {
	          node.parent.angle = Angles.QUARTER;
	          node.parent.centerx = (node.parent.centerx + node.centerx) / 2;
	          node.parent.centery = node.parent.totalBranchLength * tree.branchScalar;
	          for (var j = 0; j < node.parent.children.length; j++) {
	            node.parent.children[j].startx = node.parent.centerx;
	            node.parent.children[j].starty = node.parent.centery;
	          }
	        } else {
	          break;
	        }
	      }
	      // Assign x,y position of the farthest node from the root
	      if (tree.leaves[i].centerx > tree.farthestNodeFromRootX) {
	        tree.farthestNodeFromRootX = tree.leaves[i].centerx;
	      }
	      if (tree.leaves[i].centery > tree.farthestNodeFromRootY) {
	        tree.farthestNodeFromRootY = tree.leaves[i].centery;
	      }
	    }
	  }
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(2);

	var Angles = _utils.constants.Angles;


	function drawConnector(canvas, connectingOffset) {
	  canvas.beginPath();
	  canvas.moveTo(0, 0);
	  canvas.lineTo(connectingOffset, 0);
	  canvas.stroke();
	  canvas.closePath();
	}

	function commitPath(canvas, _ref) {
	  var lineWidth = _ref.lineWidth;
	  var strokeStyle = _ref.strokeStyle;
	  var fillStyle = _ref.fillStyle;

	  canvas.lineWidth = lineWidth;
	  canvas.strokeStyle = strokeStyle;
	  canvas.fillStyle = fillStyle;

	  canvas.fill();
	  if (lineWidth > 0 && strokeStyle !== fillStyle) {
	    canvas.stroke();
	  }
	}

	var lengthOfSquareSide = function lengthOfSquareSide(radius) {
	  return radius * Math.sqrt(2);
	};

	/**
	 * @function nodeRenderer
	 * @description A pure function to render a leaf.
	 *
	 * @param {CanvasRenderingContext2D} canvas - See {@link Tree#canvas}
	 * @param {number} radius - See {@link Branch#radius}
	 * @param {Object} style - See {@link Branch#leafStyle}
	 */

	exports.default = {
	  circle: function circle(canvas, radius, style) {
	    // circle takes same area as square inside given radius
	    var scaledArea = Math.pow(lengthOfSquareSide(radius), 2);
	    var scaledRadius = Math.sqrt(scaledArea / Math.PI);

	    drawConnector(canvas, radius - scaledRadius);

	    canvas.beginPath();
	    canvas.arc(radius, 0, scaledRadius, 0, Angles.FULL, false);
	    canvas.closePath();

	    commitPath(canvas, style);
	  },
	  square: function square(canvas, radius, style) {
	    var lengthOfSide = lengthOfSquareSide(radius);
	    var startX = radius - lengthOfSide / 2;

	    drawConnector(canvas, startX);

	    canvas.beginPath();
	    canvas.moveTo(startX, 0);
	    canvas.lineTo(startX, lengthOfSide / 2);
	    canvas.lineTo(startX + lengthOfSide, lengthOfSide / 2);
	    canvas.lineTo(startX + lengthOfSide, -lengthOfSide / 2);
	    canvas.lineTo(startX, -lengthOfSide / 2);
	    canvas.lineTo(startX, 0);
	    canvas.closePath();

	    commitPath(canvas, style);
	  },
	  star: function star(canvas, radius, style) {
	    var cx = radius;
	    var cy = 0;
	    var spikes = 5;
	    var outerRadius = radius;
	    var innerRadius = outerRadius * 0.5;
	    var step = Math.PI / spikes;

	    drawConnector(canvas, outerRadius - innerRadius);

	    var rot = Math.PI / 2 * 3;

	    canvas.beginPath();
	    canvas.moveTo(cx, cy - outerRadius);
	    for (var i = 0; i < spikes; i++) {
	      var x = cx + Math.cos(rot) * outerRadius;
	      var y = cy + Math.sin(rot) * outerRadius;
	      canvas.lineTo(x, y);
	      rot += step;

	      x = cx + Math.cos(rot) * innerRadius;
	      y = cy + Math.sin(rot) * innerRadius;
	      canvas.lineTo(x, y);
	      rot += step;
	    }
	    canvas.lineTo(cx, cy - outerRadius);
	    canvas.closePath();

	    commitPath(canvas, style);
	  },
	  triangle: function triangle(canvas, radius, style) {
	    var lengthOfSide = 2 * radius * Math.cos(30 * Math.PI / 180);
	    var height = Math.sqrt(3) / 2 * lengthOfSide;
	    var midpoint = 1 / Math.sqrt(3) * (lengthOfSide / 2);

	    drawConnector(canvas, radius - midpoint);

	    canvas.beginPath();
	    canvas.moveTo(radius, midpoint);
	    canvas.lineTo(radius + lengthOfSide / 2, midpoint);
	    canvas.lineTo(radius, -(height - midpoint));
	    canvas.lineTo(radius - lengthOfSide / 2, midpoint);
	    canvas.lineTo(radius, midpoint);
	    canvas.closePath();

	    commitPath(canvas, style);
	  }
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Tooltip base class
	 *
	 * @class
	 */
	var Tooltip = function () {
	  /**
	   * @constructor
	   * @param {Tree} tree instance
	   * @param {Object} [options]
	   * @param {string} [options.className=phylocanvas-tooltip]
	   * @param {HTMLElement} [options.element=document.createElement('div')]
	   * @param {number} [options.zIndex=2000]
	   * @param {HTMLElement} [options.parent=tree.containerElement]
	   */
	  function Tooltip(tree) {
	    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    var _ref$className = _ref.className;
	    var className = _ref$className === undefined ? 'phylocanvas-tooltip' : _ref$className;
	    var _ref$element = _ref.element;
	    var element = _ref$element === undefined ? document.createElement('div') : _ref$element;
	    var _ref$zIndex = _ref.zIndex;
	    var zIndex = _ref$zIndex === undefined ? 2000 : _ref$zIndex;
	    var _ref$parent = _ref.parent;
	    var parent = _ref$parent === undefined ? tree.containerElement : _ref$parent;

	    _classCallCheck(this, Tooltip);

	    this.tree = tree;
	    this.element = element;
	    this.element.className = className;
	    this.element.style.display = 'none';
	    this.element.style.position = 'fixed';
	    this.element.style.zIndex = zIndex;
	    this.closed = true;

	    parent.appendChild(this.element);
	  }

	  /**
	   * @method
	   */


	  _createClass(Tooltip, [{
	    key: 'close',
	    value: function close() {
	      this.element.style.display = 'none';
	      this.closed = true;
	    }

	    /**
	     * @param {number} [x=100]
	     * @param {number} [y=100]
	     * @param {Branch} [node]
	     */

	  }, {
	    key: 'open',
	    value: function open() {
	      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
	      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
	      var node = arguments[2];

	      while (this.element.hasChildNodes()) {
	        this.element.removeChild(this.element.firstChild);
	      }

	      this.createContent(node);

	      this.element.style.top = y + 'px';
	      this.element.style.left = x + 'px';

	      this.element.style.display = 'block';

	      this.closed = false;
	    }

	    /**
	     * @throws an error if not overridden by a subclass.
	     */

	  }, {
	    key: 'createContent',
	    value: function createContent() {
	      throw new Error('Not implemented');
	    }
	  }]);

	  return Tooltip;
	}();

	exports.default = Tooltip;

	// named export cannot have a doclet
	// @extends not working well

	var ChildNodesTooltip = exports.ChildNodesTooltip = function (_Tooltip) {
	  _inherits(ChildNodesTooltip, _Tooltip);

	  /**
	   * Tooltip displaying number of child nodes.
	   *
	   * @constructor
	   * @param {Tree} tree instance
	   * @param {Object} [options]
	   * @see Tooltip
	   */
	  function ChildNodesTooltip(tree, options) {
	    _classCallCheck(this, ChildNodesTooltip);

	    var _this = _possibleConstructorReturn(this, (ChildNodesTooltip.__proto__ || Object.getPrototypeOf(ChildNodesTooltip)).call(this, tree, options));

	    _this.element.style.background = 'rgba(97, 97, 97, 0.9)';
	    _this.element.style.color = '#fff';
	    _this.element.style.cursor = 'pointer';
	    _this.element.style.padding = '8px';
	    _this.element.style.marginTop = '16px';
	    _this.element.style.borderRadius = '2px';
	    _this.element.style.textAlign = 'center';
	    _this.element.style.fontFamily = _this.tree.font || 'sans-serif';
	    _this.element.style.fontSize = '10px';
	    _this.element.style.fontWeight = '500';
	    return _this;
	  }

	  /**
	   * Adds a text node containing the number of children.
	   * @override
	   */


	  _createClass(ChildNodesTooltip, [{
	    key: 'createContent',
	    value: function createContent(node) {
	      var textNode = document.createTextNode(node.getChildProperties('id').length);
	      this.element.appendChild(textNode);
	    }
	  }]);

	  return ChildNodesTooltip;
	}(Tooltip);

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Parser = __webpack_require__(29);

	var _Parser2 = _interopRequireDefault(_Parser);

	var _newick = __webpack_require__(30);

	var _newick2 = _interopRequireDefault(_newick);

	var _nexus = __webpack_require__(31);

	var _nexus2 = _interopRequireDefault(_nexus);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  nexus: new _Parser2.default(_nexus2.default),
	  newick: new _Parser2.default(_newick2.default)
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Parser = function () {
	  function Parser(_ref) {
	    var format = _ref.format;
	    var parseFn = _ref.parseFn;
	    var fileExtension = _ref.fileExtension;
	    var validator = _ref.validator;

	    _classCallCheck(this, Parser);

	    this.format = format;
	    this.parseFn = parseFn;
	    this.fileExtension = fileExtension;
	    this.validator = validator;
	  }

	  _createClass(Parser, [{
	    key: "parse",
	    value: function parse(_ref2, callback) {
	      var formatString = _ref2.formatString;
	      var root = _ref2.root;
	      var _ref2$options = _ref2.options;
	      var options = _ref2$options === undefined ? { validate: true } : _ref2$options;

	      if (formatString.match(this.validator) || options.validate === false) {
	        return this.parseFn({ string: formatString, root: root, options: options }, callback);
	      }
	      return callback(new Error("Format string does not validate as \"" + this.format + "\""));
	    }
	  }]);

	  return Parser;
	}();

	exports.default = Parser;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Branch = __webpack_require__(7);

	var _Branch2 = _interopRequireDefault(_Branch);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var format = 'newick';
	var fileExtension = /\.nwk$/;
	var validator = /^[\w\W\.\*\:(\),-\/]+;?\s*$/gi;

	function isTerminatingChar(terminatingChar) {
	  return this === terminatingChar;
	}

	var labelTerminatingChars = [':', ',', ')', ';'];

	function parseLabel(string) {
	  var label = '';
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = string[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var char = _step.value;

	      if (labelTerminatingChars.some(isTerminatingChar.bind(char))) {
	        break;
	      }
	      label += char;
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }

	  return label;
	}

	function parseAnnotations(label, branch) {
	  var segments = label.split('**');
	  var displayOptions = {};
	  branch.id = segments[0];
	  if (segments.length === 1) return;
	  segments = segments[1].split('*');

	  for (var b = 0; b < segments.length; b += 2) {
	    var value = segments[b + 1];
	    switch (segments[b]) {
	      case 'nsz':
	        displayOptions.size = window.parseInt(value);
	        break;
	      case 'nsh':
	        displayOptions.shape = value;
	        break;
	      case 'ncol':
	        displayOptions.colour = value;
	        break;
	      default:
	        break;
	    }
	  }
	  branch.setDisplay(displayOptions);
	}

	var nodeTerminatingChars = [')', ',', ';'];

	function parseBranchLength(string) {
	  var nodeLength = '';
	  var _iteratorNormalCompletion2 = true;
	  var _didIteratorError2 = false;
	  var _iteratorError2 = undefined;

	  try {
	    for (var _iterator2 = string[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	      var char = _step2.value;

	      if (nodeTerminatingChars.some(isTerminatingChar.bind(char))) {
	        break;
	      }
	      nodeLength += char;
	    }
	  } catch (err) {
	    _didIteratorError2 = true;
	    _iteratorError2 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion2 && _iterator2.return) {
	        _iterator2.return();
	      }
	    } finally {
	      if (_didIteratorError2) {
	        throw _iteratorError2;
	      }
	    }
	  }

	  return nodeLength;
	}

	function parseBranch(branch, string, index) {
	  var label = parseLabel(string.slice(index));
	  var postLabelIndex = index + label.length;
	  var branchLengthStr = '';
	  if (label.match(/\*/)) {
	    parseAnnotations(label, branch);
	  }

	  if (string[postLabelIndex] === ':') {
	    branchLengthStr = parseBranchLength(string.slice(postLabelIndex + 1));
	    branch.branchLength = Math.max(parseFloat(branchLengthStr), 0);
	  } else {
	    branch.branchLength = 0;
	  }

	  if (label) {
	    branch.label = label;
	  }
	  branch.id = label || _Branch2.default.generateId();
	  return postLabelIndex + branchLengthStr.length;
	}

	function parseFn(_ref, callback) {
	  var string = _ref.string;
	  var root = _ref.root;

	  var cleanString = string.replace(/(\r|\n)/g, '');
	  var currentNode = root;

	  for (var i = 0; i < cleanString.length; i++) {
	    var node = void 0;
	    switch (cleanString[i]) {
	      case '(':
	        // new Child
	        node = new _Branch2.default();
	        currentNode.addChild(node);
	        currentNode = node;
	        break;
	      case ')':
	        // return to parent
	        currentNode = currentNode.parent;
	        break;
	      case ',':
	        // new sibling
	        node = new _Branch2.default();
	        currentNode.parent.addChild(node);
	        currentNode = node;
	        break;
	      case ';':
	        break;
	      default:
	        try {
	          i = parseBranch(currentNode, cleanString, i);
	        } catch (e) {
	          return callback(e);
	        }
	        break;
	    }
	  }
	  return callback();
	}

	exports.default = {
	  format: format,
	  fileExtension: fileExtension,
	  validator: validator,
	  parseFn: parseFn
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _newick = __webpack_require__(30);

	var format = 'nexus';
	var fileExtension = /\.n(ex|xs)$/;
	var validator = /^#NEXUS[\s\n;\w\W\.\*\:(\),-=\[\]\/&]+$/i;

	function parseFn(_ref, callback) {
	  var string = _ref.string;
	  var root = _ref.root;
	  var options = _ref.options;

	  if (!string.match(/BEGIN TREES/gi)) {
	    return callback(new Error('The nexus file does not contain a tree block'));
	  }

	  var name = options.name;

	  // get everything between BEGIN TREES and next END;

	  var treeSection = string.match(/BEGIN TREES;[\S\s]+END;/i)[0].replace(/BEGIN TREES;\n/i, '').replace(/END;/i, '');
	  // get translate section

	  var leafNameObject = {};
	  var translateSection = treeSection.match(/TRANSLATE[^;]+;/i);
	  if (translateSection && translateSection.length) {
	    translateSection = translateSection[0];
	    //remove translate section from tree section
	    treeSection = treeSection.replace(translateSection, '');

	    //parse translate section into kv pairs
	    translateSection = translateSection.replace(/translate|;/gi, '');

	    var tIntArr = translateSection.split(',');
	    for (var i = 0; i < tIntArr.length; i++) {
	      var ia = tIntArr[i].trim().replace('\n', '').split(' ');
	      if (ia[0] && ia[1]) {
	        leafNameObject[ia[0].trim()] = ia[1].trim();
	      }
	    }
	  }

	  // find each line starting with tree.
	  var tArr = treeSection.split('\n');
	  var trees = {};
	  // id name is '' or does not exist, ask user to choose which tree.
	  for (var _i = 0; _i < tArr.length; _i++) {
	    if (tArr[_i].trim() === '') continue;
	    var s = tArr[_i].replace(/tree\s/i, '');
	    if (!name) {
	      name = s.trim().match(/^\w+/)[0];
	    }
	    trees[name] = s.trim().match(/[\S]*$/)[0];
	  }
	  if (!trees[name]) {
	    return new Error('tree ' + name + ' does not exist in this NEXUS file');
	  }

	  (0, _newick.parseFn)({ string: trees[name].trim(), root: root }, function (error) {
	    if (error) {
	      return callback(error);
	    }

	    callback();

	    // translate in accordance with translate block
	    if (leafNameObject) {
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = Object.keys(leafNameObject)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var n = _step.value;

	          var branches = root.tree.branches;
	          var branch = branches[n];
	          delete branches[n];
	          branch.id = leafNameObject[n];
	          branches[branch.id] = branch;
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      root.tree.draw();
	    }
	  });
	}

	exports.default = {
	  parseFn: parseFn,
	  format: format,
	  fileExtension: fileExtension,
	  validator: validator
	};

/***/ }
/******/ ])
});
;