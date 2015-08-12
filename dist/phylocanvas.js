(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["PhyloCanvas"] = factory();
	else
		root["PhyloCanvas"] = factory();
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

	/**
	 * PhyloCanvas - A JavaScript and HTML5 Canvas Phylogenetic tree drawing tool.
	 *
	 * @author Chris Powell (c.powell@imperial.ac.uk)
	 * @modified Jyothish NT 01/03/15
	 */

	/**
	 * @namespace PhyloCanvas
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Tree = __webpack_require__(2);

	var _Tree2 = _interopRequireDefault(_Tree);

	var _Branch = __webpack_require__(4);

	var _Branch2 = _interopRequireDefault(_Branch);

	var _ContextMenu = __webpack_require__(6);

	var _ContextMenu2 = _interopRequireDefault(_ContextMenu);

	var _Parser = __webpack_require__(1);

	var _Parser2 = _interopRequireDefault(_Parser);

	var _treeTypes = __webpack_require__(9);

	var _treeTypes2 = _interopRequireDefault(_treeTypes);

	var _nodeRenderers = __webpack_require__(5);

	var _nodeRenderers2 = _interopRequireDefault(_nodeRenderers);

	exports.Tree = _Tree2['default'];
	exports.Branch = _Branch2['default'];
	exports.ContextMenu = _ContextMenu2['default'];
	exports.Parser = _Parser2['default'];
	exports.treeTypes = _treeTypes2['default'];
	exports.nodeRenderers = _nodeRenderers2['default'];

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

	function plugin(pluginFn) {
	  pluginFn.call(this, decorate);
	}

	function createTree(element) {
	  var conf = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  return new _Tree2['default'](element, conf);
	}

	exports['default'] = { plugin: plugin, createTree: createTree };

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Parser = (function () {
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
	})();

	exports["default"] = Parser;
	module.exports = exports["default"];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _phylocanvasUtils = __webpack_require__(3);

	var _Branch = __webpack_require__(4);

	var _Branch2 = _interopRequireDefault(_Branch);

	var _ContextMenu = __webpack_require__(6);

	var _ContextMenu2 = _interopRequireDefault(_ContextMenu);

	var _Tooltip = __webpack_require__(7);

	var _Tooltip2 = _interopRequireDefault(_Tooltip);

	var _Navigator = __webpack_require__(8);

	var _Navigator2 = _interopRequireDefault(_Navigator);

	var _treeTypes = __webpack_require__(9);

	var _treeTypes2 = _interopRequireDefault(_treeTypes);

	var _parsers = __webpack_require__(27);

	var _parsers2 = _interopRequireDefault(_parsers);

	var addClass = _phylocanvasUtils.dom.addClass;
	var fireEvent = _phylocanvasUtils.events.fireEvent;
	var addEvent = _phylocanvasUtils.events.addEvent;
	var getBackingStorePixelRatio = _phylocanvasUtils.canvas.getBackingStorePixelRatio;
	var getPixelRatio = _phylocanvasUtils.canvas.getPixelRatio;
	var translateClick = _phylocanvasUtils.canvas.translateClick;

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

	var Tree = (function () {
	  function Tree(element) {
	    var conf = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    _classCallCheck(this, Tree);

	    this.canvasEl = typeof element === 'string' ? document.getElementById(element) : element;
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

	    var canvas = document.createElement('canvas');
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
	    this.contextMenu = new _ContextMenu2['default'](this, conf.contextMenu);

	    this.defaultCollapsedOptions = {};
	    this.defaultCollapsed = false;
	    if (conf.defaultCollapsed !== undefined) {
	      if (conf.defaultCollapsed.min && conf.defaultCollapsed.max) {
	        this.defaultCollapsedOptions = conf.defaultCollapsed;
	        this.defaultCollapsed = true;
	      }
	    }

	    this.tooltip = new _Tooltip2['default'](this);

	    this.drawn = false;

	    this.selectedNodes = [];

	    this.zoom = 1;
	    this.pickedup = false;
	    this.dragging = false;
	    this.startx = null;this.starty = null;
	    this.pickedup = false;
	    this.baseNodeSize = 1;
	    this.curx = null;
	    this.cury = null;
	    this.origx = null;
	    this.origy = null;

	    this.canvas = canvas.getContext('2d');

	    this.canvas.canvas.onselectstart = function () {
	      return false;
	    };
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
	      this.navigator = new _Navigator2['default'](this);
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
	    addEvent(window, 'resize', (function () {
	      this.resizeToContainer();
	      this.draw();
	    }).bind(this));

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

	  _createClass(Tree, [{
	    key: 'setInitialCollapsedBranches',
	    value: function setInitialCollapsedBranches() {
	      var node = arguments.length <= 0 || arguments[0] === undefined ? this.root : arguments[0];

	      var childIds;
	      var i;

	      childIds = node.getChildIds();
	      if (childIds && childIds.length > this.defaultCollapsedOptions.min && childIds.length < this.defaultCollapsedOptions.max) {
	        node.collapsed = true;
	        return;
	      }

	      for (i = 0; i < node.children.length; i++) {
	        this.setInitialCollapsedBranches(node.children[i]);
	      }
	    }
	  }, {
	    key: 'clicked',
	    value: function clicked(e) {
	      var node;
	      var nids;
	      if (e.button === 0) {
	        var _root;

	        nids = [];
	        // if this is triggered by the release after a drag then the click
	        // shouldn't be triggered.
	        if (this.dragging) {
	          this.dragging = false;
	          return;
	        }

	        if (!this.root) return false;
	        node = (_root = this.root).clicked.apply(_root, _toConsumableArray(translateClick(e.clientX, e.clientY, this)));

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
	        var _root2;

	        e.preventDefault();
	        node = (_root2 = this.root).clicked.apply(_root2, _toConsumableArray(translateClick(e.clientX, e.clientY, this)));
	        this.contextMenu.open(e.clientX, e.clientY, node);
	        this.contextMenu.closed = false;
	        this.tooltip.close();
	      }
	    }
	  }, {
	    key: 'dblclicked',
	    value: function dblclicked(e) {
	      var _root3;

	      if (!this.root) return false;
	      var nd = (_root3 = this.root).clicked.apply(_root3, _toConsumableArray(translateClick(e.clientX * 1.0, e.clientY * 1.0, this)));
	      if (nd) {
	        nd.cascadeFlag('selected', false);
	        nd.toggleCollapsed();
	      }

	      if (!this.pickedup) {
	        this.dragging = false;
	      }
	      this.draw();
	    }
	  }, {
	    key: 'displayLabels',
	    value: function displayLabels() {
	      this.showLabels = true;
	      this.draw();
	    }
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
	      } else if (this.zoomPickedUp) {
	        // right click and drag
	        this.d = (this.starty - event.clientY) / 100;
	        this.setZoom(this.origZoom + this.d);
	        this.draw();
	      } else {
	        var _root4;

	        // hover
	        var e = event;
	        var nd = (_root4 = this.root).clicked.apply(_root4, _toConsumableArray(translateClick(e.clientX * 1.0, e.clientY * 1.0, this)));

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
	  }, {
	    key: 'draw',

	    /**
	     * Draw the frame
	     */
	    value: function draw(forceRedraw) {
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

	      this.canvas.translate(this.canvas.canvas.width / 2 / getBackingStorePixelRatio(this.canvas), this.canvas.canvas.height / 2 / getBackingStorePixelRatio(this.canvas));

	      if (!this.drawn || forceRedraw) {
	        this.prerenderer.run(this);
	        if (!forceRedraw) {
	          this.fitInPanel();
	        }
	      }

	      this.canvas.lineWidth = this.lineWidth / this.zoom;
	      this.canvas.translate(this.offsetx, this.offsety);
	      this.canvas.scale(this.zoom, this.zoom);

	      this.branchRenderer.render(this, this.root);

	      // Making default collapsed false so that it will collapse on initial load only
	      this.defaultCollapsed = false;

	      this.drawn = true;
	    }
	  }, {
	    key: 'drop',
	    value: function drop() {
	      if (!this.drawn) return false;
	      this.pickedup = false;
	      this.zoomPickedUp = false;
	    }
	  }, {
	    key: 'findLeaves',
	    value: function findLeaves(pattern) {
	      var searchProperty = arguments.length <= 1 || arguments[1] === undefined ? 'id' : arguments[1];

	      var foundLeaves = [];

	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = this.leaves[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var leaf = _step.value;

	          if (leaf[searchProperty].match(pattern)) {
	            foundLeaves.push(leaf);
	          }
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator['return']) {
	            _iterator['return']();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      return foundLeaves;
	    }
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
	          if (!_iteratorNormalCompletion2 && _iterator2['return']) {
	            _iterator2['return']();
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
	          var leaf = _step3.value;

	          leaf[property] = value;
	        }
	      } catch (err) {
	        _didIteratorError3 = true;
	        _iteratorError3 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion3 && _iterator3['return']) {
	            _iterator3['return']();
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
	  }, {
	    key: 'clearSelect',
	    value: function clearSelect() {
	      this.root.cascadeFlag('selected', false);
	      this.draw();
	    }
	  }, {
	    key: 'generateBranchId',
	    value: function generateBranchId() {
	      return 'pcn' + this.lastId++;
	    }
	  }, {
	    key: 'getPngUrl',
	    value: function getPngUrl() {
	      return this.canvas.canvas.toDataURL();
	    }
	  }, {
	    key: 'hideLabels',
	    value: function hideLabels() {
	      this.showLabels = false;
	      this.draw();
	    }
	  }, {
	    key: 'load',
	    value: function load(inputString, options, callback) {
	      if (options === undefined) options = {};

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
	        this.build(inputString, _parsers2['default'][buildOptions.format], buildOptions);
	        return;
	      }

	      var _iteratorNormalCompletion4 = true;
	      var _didIteratorError4 = false;
	      var _iteratorError4 = undefined;

	      try {
	        for (var _iterator4 = Object.keys(_parsers2['default'])[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	          var parserName = _step4.value;

	          var parser = _parsers2['default'][parserName];

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
	          if (!_iteratorNormalCompletion4 && _iterator4['return']) {
	            _iterator4['return']();
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
	  }, {
	    key: 'saveOriginalTree',
	    value: function saveOriginalTree() {
	      this.originalTree.branches = this.branches;
	      this.originalTree.leaves = this.leaves;
	      this.originalTree.root = this.root;
	      this.originalTree.branchLengths = {};
	      this.originalTree.parents = {};
	    }
	  }, {
	    key: 'clearState',
	    value: function clearState() {
	      this.root = false;
	      this.leaves = [];
	      this.branches = {};
	      this.drawn = false;
	    }
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
	  }, {
	    key: 'build',
	    value: function build(formatString, parser, options) {
	      var _this2 = this;

	      this.originalTree = {};
	      this.clearState();

	      var root = new _Branch2['default']();
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
	        _this2.draw();
	        _this2.saveOriginalTree();
	        if (options.callback) {
	          options.callback();
	        }
	        if (!options.quiet) {
	          _this2.loadCompleted();
	        }
	      });
	    }
	  }, {
	    key: 'pickup',
	    value: function pickup(event) {
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
	  }, {
	    key: 'redrawOriginalTree',
	    value: function redrawOriginalTree() {
	      this.load(this.stringRepresentation, { quiet: true });
	    }
	  }, {
	    key: 'storeNode',
	    value: function storeNode(node) {
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
	  }, {
	    key: 'scroll',
	    value: function scroll(e) {
	      var z = Math.log(this.zoom) / Math.log(10);
	      this.setZoom(z + (e.detail < 0 || e.wheelDelta > 0 ? 0.12 : -0.12));
	      e.preventDefault();
	    }
	  }, {
	    key: 'selectNodes',
	    value: function selectNodes(nIds) {
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
	  }, {
	    key: 'setFont',
	    value: function setFont(font) {
	      if (isNaN(font)) {
	        this.font = font;
	        this.draw();
	      }
	    }
	  }, {
	    key: 'setNodeDisplay',
	    value: function setNodeDisplay(ids, options, waiting) {
	      var _this3 = this;

	      if (!ids) return;

	      if (this.drawn) {
	        var array = [];
	        if (typeof ids === 'string') {
	          array = ids.split(',');
	        } else {
	          array = ids;
	        }

	        if (array.length) {
	          var _iteratorNormalCompletion5 = true;
	          var _didIteratorError5 = false;
	          var _iteratorError5 = undefined;

	          try {
	            for (var _iterator5 = array[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	              var id = _step5.value;

	              if (!(id in this.branches)) {
	                continue;
	              }
	              this.branches[id].setDisplay(options);
	            }
	          } catch (err) {
	            _didIteratorError5 = true;
	            _iteratorError5 = err;
	          } finally {
	            try {
	              if (!_iteratorNormalCompletion5 && _iterator5['return']) {
	                _iterator5['return']();
	              }
	            } finally {
	              if (_didIteratorError5) {
	                throw _iteratorError5;
	              }
	            }
	          }

	          this.draw();
	        }
	      } else if (!waiting) {
	        (function () {
	          var _this = _this3;
	          var timeout = setInterval(function () {
	            if (this.drawn) {
	              _this.setNodeColourAndShape(ids, options, true);
	              clearInterval(timeout);
	            }
	          });
	        })();
	      }
	    }
	  }, {
	    key: 'setNodeSize',
	    value: function setNodeSize(size) {
	      this.baseNodeSize = Number(size);
	      this.draw();
	    }
	  }, {
	    key: 'setRoot',
	    value: function setRoot(node) {
	      node.canvas = this.canvas;
	      node.tree = this;
	      this.root = node;
	    }
	  }, {
	    key: 'setTextSize',
	    value: function setTextSize(size) {
	      this.textSize = Number(size);
	      this.draw();
	    }
	  }, {
	    key: 'setFontSize',
	    value: function setFontSize(ystep) {
	      this.textSize = this.calculateFontSize ? this.calculateFontSize(ystep) : Math.min(ystep / 2, 15);
	      this.canvas.font = this.textSize + 'pt ' + this.font;
	    }
	  }, {
	    key: 'setTreeType',
	    value: function setTreeType(type, quiet) {
	      if (!(type in _treeTypes2['default'])) {
	        return fireEvent(this.canvasEl, 'error', { error: new Error('"' + type + '" is not a known tree-type.') });
	      }

	      var oldType = this.treeType;
	      this.treeType = type;

	      this.branchRenderer = _treeTypes2['default'][type].branchRenderer;
	      this.prerenderer = _treeTypes2['default'][type].prerenderer;
	      this.labelAlign = _treeTypes2['default'][type].labelAlign;
	      this.scaleCollapsedNode = _treeTypes2['default'][type].scaleCollapsedNode;
	      this.calculateFontSize = _treeTypes2['default'][type].calculateFontSize;

	      if (this.drawn) {
	        this.drawn = false;
	        this.draw();
	      }

	      if (!quiet) {
	        this.treeTypeChanged(oldType, type);
	      }
	    }
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
	  }, {
	    key: 'setZoom',
	    value: function setZoom(z) {
	      if (z > -2 && z < 2) {
	        var oz = this.zoom;
	        this.zoom = Math.pow(10, z);

	        this.offsetx = this.offsetx / oz * this.zoom;
	        this.offsety = this.offsety / oz * this.zoom;

	        this.draw();
	      }
	    }
	  }, {
	    key: 'toggleLabels',
	    value: function toggleLabels() {
	      this.showLabels = !this.showLabels;
	      this.draw();
	    }
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
	  }, {
	    key: 'loadCompleted',
	    value: function loadCompleted() {
	      fireEvent(this.canvasEl, 'loaded');
	    }
	  }, {
	    key: 'loadStarted',
	    value: function loadStarted() {
	      fireEvent(this.canvasEl, 'loading');
	    }
	  }, {
	    key: 'loadError',
	    value: function loadError(error) {
	      fireEvent(this.canvasEl, 'error', { error: error });
	    }
	  }, {
	    key: 'subtreeDrawn',
	    value: function subtreeDrawn(node) {
	      fireEvent(this.canvasEl, 'subtree', { node: node });
	    }
	  }, {
	    key: 'nodesUpdated',
	    value: function nodesUpdated(nodeIds, property) {
	      fireEvent(this.canvasEl, 'updated', { nodeIds: nodeIds, property: property });
	    }
	  }, {
	    key: 'addListener',
	    value: function addListener(event, listener) {
	      addEvent(this.canvasEl, event, listener);
	    }
	  }, {
	    key: 'getBounds',
	    value: function getBounds() {
	      var minx = this.root.startx;
	      var maxx = this.root.startx;
	      var miny = this.root.starty;
	      var maxy = this.root.starty;

	      for (var i = this.leaves.length; i--;) {
	        var node = this.leaves[i];
	        var x = this.alignLabels ? this.labelAlign.getX(node) : node.centerx;
	        var y = this.alignLabels ? this.labelAlign.getY(node) : node.centery;
	        var theta = node.angle;
	        var pad = node.getTotalSize();

	        x = x + pad * Math.cos(theta);
	        y = y + pad * Math.sin(theta);

	        minx = Math.min(minx, x);
	        maxx = Math.max(maxx, x);
	        miny = Math.min(miny, y);
	        maxy = Math.max(maxy, y);
	      }
	      return [[minx, miny], [maxx, maxy]];
	    }
	  }, {
	    key: 'fitInPanel',
	    value: function fitInPanel() {
	      var bounds = this.getBounds();
	      var minx = bounds[0][0];
	      var maxx = bounds[1][0];
	      var miny = bounds[0][1];
	      var maxy = bounds[1][1];
	      var padding = 50;
	      var canvasSize = [this.canvas.canvas.width - padding, this.canvas.canvas.height - padding];

	      this.zoom = Math.min(canvasSize[0] / (maxx - minx), canvasSize[1] / (maxy - miny));
	      this.offsety = (maxy + miny) * this.zoom / -2;
	      this.offsetx = (maxx + minx) * this.zoom / -2;
	    }
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
	  }, {
	    key: 'treeTypeChanged',
	    value: function treeTypeChanged(oldType, newType) {
	      fireEvent(this.canvasEl, 'typechanged', { oldType: oldType, newType: newType });
	    }
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
	          if (!_iteratorNormalCompletion6 && _iterator6['return']) {
	            _iterator6['return']();
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
	  }, {
	    key: 'rotateBranch',
	    value: function rotateBranch(branch) {
	      this.branches[branch.id].rotate();
	    }
	  }, {
	    key: 'extractNestedBranches',
	    value: function extractNestedBranches() {
	      this.branches = {};
	      this.leaves = [];

	      this.storeNode(this.root);
	      this.root.extractChildren();
	    }
	  }, {
	    key: 'exportNwk',
	    value: function exportNwk() {
	      var nwk = this.root.getNwk();
	      return nwk.substr(0, nwk.lastIndexOf(')') + 1) + ';';
	    }
	  }, {
	    key: 'resizeToContainer',
	    value: function resizeToContainer() {
	      this.setSize(this.canvasEl.offsetWidth, this.canvasEl.offsetHeight);
	    }
	  }, {
	    key: 'alignLabels',
	    get: function get() {
	      return this.labelAlign && this.labelAlignEnabled;
	    },
	    set: function set(value) {
	      this.labelAlignEnabled = value;
	    }
	  }]);

	  return Tree;
	})();

	exports['default'] = Tree;

	Tree.prototype.on = Tree.prototype.addListener;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	!function(e,t){if(true)module.exports=t();else if("function"==typeof define&&define.amd)define(t);else{var n=t();for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var a=n[r]={exports:{},id:r,loaded:!1};return e[r].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}Object.defineProperty(t,"__esModule",{value:!0});var a=n(1),o=r(a),i=n(4),s=r(i),c=n(2),u=r(c),f=n(3),l=r(f);t["default"]={canvas:o,constants:s,dom:u,events:l},e.exports=t["default"]},function(e,t,n){"use strict";function r(e){return e.backingStorePixelRatio||e.webkitBackingStorePixelRatio||e.mozBackingStorePixelRatio||e.msBackingStorePixelRatio||e.oBackingStorePixelRatio||1}function a(e){return(window.devicePixelRatio||1)/r(e)}function o(e){return e=e-c.getX(this.canvas.canvas)+window.pageXOffset,e*=a(this.canvas),e-=this.canvas.canvas.width/2,e-=this.offsetx,e/=this.zoom}function i(e){return e=e-c.getY(this.canvas.canvas)+window.pageYOffset,e*=a(this.canvas),e-=this.canvas.canvas.height/2,e-=this.offsety,e/=this.zoom}function s(e,t,n){return[o.call(n,e),i.call(n,t)]}Object.defineProperty(t,"__esModule",{value:!0}),t.getBackingStorePixelRatio=r,t.getPixelRatio=a,t.translateClick=s;var c=n(2)},function(e,t,n){"use strict";function r(e){var t=new Blob([e],{type:"text/csv;charset=utf-8"});return l.createObjectURL(t)}function a(e,t){var n=document.createElement("a"),r="undefined"!=typeof n.download;n.href=e,n.target="_blank",r&&(n.download=t),f.fireEvent(n,"click"),r&&l.revokeObjectURL(n.href)}function o(e){for(var t=0;e;)t+=e.offsetLeft,e=e.offsetParent;return t}function i(e){for(var t=0;e;)t+=e.offsetTop,e=e.offsetParent;return t}function s(e,t){var n=e.className.split(" ");-1===n.indexOf(t)&&(n.push(t),e.className=n.join(" "))}function c(e,t){var n=e.className.split(" "),r=n.indexOf(t);-1!==r&&(n.splice(r,1),e.className=n.join(" "))}function u(e,t){var n=e.className.split(" "),r=n.indexOf(t);return-1!==r}Object.defineProperty(t,"__esModule",{value:!0}),t.createBlobUrl=r,t.setupDownloadLink=a,t.getX=o,t.getY=i,t.addClass=s,t.removeClass=c,t.hasClass=u;var f=n(3),l=window.URL||window.webkitURL},function(e,t){"use strict";function n(e){return e.preventDefault(),!1}function r(e,t){var n,r,a=arguments.length<=2||void 0===arguments[2]?{}:arguments[2];document.createEvent?(n=document.createEvent("HTMLEvents"),n.initEvent(t,!0,!0)):(n=document.createEventObject(),n.eventType=t),n.eventName=t;for(r in a)a.hasOwnProperty(r)&&(n[r]=a[r]);document.createEvent?e.dispatchEvent(n):e.fireEvent("on"+n.eventType,n)}function a(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent("on"+t,function(){return n.call(e,window.event)})}function o(e){e.stopPropagation(),e.preventDefault()}function i(e,t){var n;return n="string"==typeof t?function(n){return e[t]?e[t](n):void 0}:function(){return t(e)}}Object.defineProperty(t,"__esModule",{value:!0}),t.preventDefault=n,t.fireEvent=r,t.addEvent=a,t.killEvent=o,t.createHandler=i},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={FORTYFIVE:Math.PI/4,QUARTER:Math.PI/2,HALF:Math.PI,FULL:2*Math.PI};t.Angles=n;var r={x:"star",s:"square",o:"circle",t:"triangle"};t.Shapes=r}])});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _phylocanvasUtils = __webpack_require__(3);

	var _nodeRenderers = __webpack_require__(5);

	var _nodeRenderers2 = _interopRequireDefault(_nodeRenderers);

	var Angles = _phylocanvasUtils.constants.Angles;
	var Shapes = _phylocanvasUtils.constants.Shapes;
	var createBlobUrl = _phylocanvasUtils.dom.createBlobUrl;

	/**
	 * Creates a branch
	 *
	 * @constructor
	 * @memberof PhyloCanvas
	 * @public
	 *
	 */

	var Branch = (function () {
	  function Branch() {
	    _classCallCheck(this, Branch);

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
	  }

	  _createClass(Branch, [{
	    key: 'clicked',
	    value: function clicked(x, y) {
	      var i;
	      var child;

	      if (this.dragging) {
	        return;
	      }
	      if (x < this.maxx && x > this.minx && (y < this.maxy && y > this.miny)) {
	        return this;
	      }

	      for (i = this.children.length - 1; i >= 0; i--) {
	        child = this.children[i].clicked(x, y);
	        if (child) {
	          return child;
	        }
	      }
	    }
	  }, {
	    key: 'drawLabel',
	    value: function drawLabel() {
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

	      if (this.angle > Angles.QUARTER && this.angle < Angles.HALF + Angles.QUARTER) {
	        this.canvas.rotate(Angles.HALF);
	        // Angles.Half text position changes
	        tx = -tx - dimensions.width * 1;
	      }

	      this.canvas.beginPath();
	      this.canvas.fillStyle = this.getTextColour();
	      this.canvas.fillText(lbl, tx, ty);
	      this.canvas.closePath();

	      // Rotate canvas back to original position
	      if (this.angle > Angles.QUARTER && this.angle < Angles.HALF + Angles.QUARTER) {
	        this.canvas.rotate(Angles.HALF);
	      }
	    }
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
	    key: 'drawCollapsed',
	    value: function drawCollapsed(centerX, centerY) {
	      var childIds = this.getChildIds();
	      var radius = childIds.length;

	      if (this.tree.scaleCollapsedNode) {
	        radius = this.tree.scaleCollapsedNode(radius);
	      }

	      this.canvas.globalAlpha = 0.3;

	      this.canvas.beginPath();

	      this.canvas.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
	      this.canvas.fillStyle = this.tree.defaultCollapsedOptions.color ? this.tree.defaultCollapsedOptions.color : 'purple';
	      this.canvas.fill();
	      this.canvas.globalAlpha = 1;

	      this.canvas.closePath();
	    }
	  }, {
	    key: 'drawLabelConnector',
	    value: function drawLabelConnector(centerX, centerY) {
	      var originalLineWidth = this.canvas.lineWidth;
	      var labelAlign = this.tree.labelAlign;

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
	  }, {
	    key: 'drawLeaf',
	    value: function drawLeaf() {
	      _nodeRenderers2['default'][this.nodeShape](this);

	      if (this.tree.showLabels || this.tree.hoverLabel && this.isHighlighted) {
	        this.drawLabel();
	      }
	    }
	  }, {
	    key: 'drawHighlight',
	    value: function drawHighlight(centerX, centerY) {
	      this.canvas.beginPath();
	      var l = this.canvas.lineWidth;
	      this.canvas.strokeStyle = this.tree.highlightColour;
	      this.canvas.lineWidth = this.tree.highlightWidth / this.tree.zoom;
	      this.canvas.arc(centerX, centerY, (this.leaf ? this.getNodeSize() : 0) + (5 + this.tree.highlightWidth / 2) / this.tree.zoom, 0, Angles.FULL, false);
	      this.canvas.stroke();
	      this.canvas.lineWidth = l;
	      this.canvas.strokeStyle = this.tree.branchColour;
	      this.canvas.closePath();
	    }
	  }, {
	    key: 'drawNode',
	    value: function drawNode() {
	      var nodeRadius = this.getNodeSize();
	      /**
	       * theta = translation to center of node... ensures that the node edge is
	       * at the end of the branch so the branches don't look shorter than  they
	       * should
	       */
	      var theta = nodeRadius;

	      var centerX = this.leaf ? theta * Math.cos(this.angle) + this.centerx : this.centerx;
	      var centerY = this.leaf ? theta * Math.sin(this.angle) + this.centery : this.centery;

	      this.canvas.fillStyle = this.selected ? this.tree.selectedColour : this.colour;

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
	  }, {
	    key: 'getChildIds',
	    value: function getChildIds() {
	      var children = [];
	      var x;

	      if (this.leaf) {
	        // Fix for Issue #68
	        // Returning array, as expected
	        return [this.id];
	      } else {
	        children = [];
	        for (x = 0; x < this.children.length; x++) {
	          children = children.concat(this.children[x].getChildIds());
	        }
	        return children;
	      }
	    }
	  }, {
	    key: 'getChildCount',
	    value: function getChildCount() {
	      var children = 0;
	      var x;

	      if (this.leaf) return 1;

	      for (x = 0; x < this.children.length; x++) {
	        children += this.children[x].getChildCount();
	      }
	      return children;
	    }
	  }, {
	    key: 'getChildYTotal',
	    value: function getChildYTotal() {
	      var y = 0;
	      var i;

	      if (this.leaf) return this.centery;

	      for (i = 0; i < this.children.length; i++) {
	        y += this.children[i].getChildYTotal();
	      }
	      return y;
	    }
	  }, {
	    key: 'cascadeFlag',
	    value: function cascadeFlag(property, value) {
	      if (typeof this[property] === 'undefined') {
	        throw new Error('Unknown property: ' + property);
	      }
	      this[property] = value;
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = this.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var child = _step.value;

	          child.cascadeFlag(property, value);
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator['return']) {
	            _iterator['return']();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    }
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
	          this.children[child].pcReset();
	        } catch (e) {
	          return e;
	        }
	      }
	    }
	  }, {
	    key: 'redrawTreeFromBranch',
	    value: function redrawTreeFromBranch() {
	      this.tree.redrawFromBranch(this);
	    }
	  }, {
	    key: 'extractChildren',
	    value: function extractChildren() {
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = this.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var child = _step2.value;

	          this.tree.storeNode(child);
	          child.extractChildren();
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2['return']) {
	            _iterator2['return']();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'hasCollapsedAncestor',
	    value: function hasCollapsedAncestor() {
	      if (this.parent) {
	        return this.parent.collapsed || this.parent.hasCollapsedAncestor();
	      }
	      return false;
	    }
	  }, {
	    key: 'collapse',
	    value: function collapse() {
	      // don't collapse the node if it is a leaf... that would be silly!
	      this.collapsed = this.leaf === false;
	    }
	  }, {
	    key: 'expand',
	    value: function expand() {
	      this.collapsed = false;
	    }
	  }, {
	    key: 'toggleCollapsed',
	    value: function toggleCollapsed() {
	      if (this.collapsed) {
	        this.expand();
	      } else {
	        this.collapse();
	      }
	    }
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
	  }, {
	    key: 'addChild',

	    /**
	     * Add a child branch to this branch
	     * @param node {Branch} the node to add as a child
	     * @memberof Branch
	     */
	    value: function addChild(node) {
	      node.parent = this;
	      node.canvas = this.canvas;
	      node.tree = this.tree;
	      this.leaf = false;
	      this.children.push(node);
	    }
	  }, {
	    key: 'getChildColours',

	    /**
	     * Return the node colour of all the nodes that are children of this one.
	     */
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
	  }, {
	    key: 'getColour',

	    /**
	     * Get the colour(s) of the branch itself.
	     */
	    value: function getColour() {
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
	  }, {
	    key: 'getNwk',
	    value: function getNwk() {
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
	  }, {
	    key: 'getTextColour',
	    value: function getTextColour() {
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
	  }, {
	    key: 'getLabel',
	    value: function getLabel() {
	      return this.label !== undefined && this.label !== null ? this.label : '';
	    }
	  }, {
	    key: 'getLabelSize',
	    value: function getLabelSize() {
	      return this.tree.canvas.measureText(this.getLabel()).width;
	    }
	  }, {
	    key: 'getNodeSize',
	    value: function getNodeSize() {
	      return Math.max(0, this.tree.baseNodeSize * this.radius);
	    }
	  }, {
	    key: 'getLabelStartX',

	    /**
	     * Calculates label start position
	     * Diameter of the node + actual node size + extra width(baseNodeSize)
	     * @method getNodeSize
	     * @return CallExpression
	     */
	    value: function getLabelStartX() {
	      return this.getNodeSize() + this.tree.baseNodeSize + this.radius * 2;
	    }
	  }, {
	    key: 'rotate',
	    value: function rotate(evt) {
	      var newChildren = [];
	      var i;

	      for (i = this.children.length; i--;) {
	        newChildren.push(this.children[i]);
	      }

	      this.children = newChildren;

	      if (!evt.preventredraw) {
	        this.tree.extractNestedBranches();
	        this.tree.draw(true);
	      }
	    }
	  }, {
	    key: 'getChildNo',
	    value: function getChildNo() {
	      return this.parent.children.indexOf(this);
	    }
	  }, {
	    key: 'downloadLeafIdsFromBranch',
	    value: function downloadLeafIdsFromBranch() {
	      var downloadData = this.getChildIds().join('\n');
	      var filename = 'pc_leaf_ids';
	      if (!this.parent) {
	        filename += '_all.txt';
	      } else {
	        filename += '_' + this.id + '.txt';
	      }
	      return createBlobUrl(downloadData);
	    }
	  }, {
	    key: 'setDisplay',
	    value: function setDisplay(_ref) {
	      var colour = _ref.colour;
	      var shape = _ref.shape;
	      var size = _ref.size;

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
	  }, {
	    key: 'getTotalSize',
	    value: function getTotalSize() {
	      var totalSize = this.getNodeSize();

	      if (this.tree.showLabels) {
	        totalSize += this.getLabelSize() + this.tree.maxLabelLength[this.tree.treeType];
	      }

	      return totalSize;
	    }
	  }, {
	    key: 'isHighlighted',
	    get: function get() {
	      return this.highlighted || this.hovered;
	    }
	  }]);

	  return Branch;
	})();

	exports['default'] = Branch;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _phylocanvasUtils = __webpack_require__(3);

	var Angles = _phylocanvasUtils.constants.Angles;
	exports['default'] = {

	  circle: function circle(node) {
	    var r = node.getNodeSize();
	    node.canvas.beginPath();
	    node.canvas.arc(r, 0, r, 0, Angles.FULL, false);
	    node.canvas.stroke();
	    node.canvas.fill();
	    node.canvas.closePath();
	  },

	  square: function square(node) {
	    var r = node.getNodeSize();
	    var x1 = 0;
	    var x2 = r * 2;
	    var y1 = -r;
	    var y2 = r;
	    node.canvas.beginPath();
	    node.canvas.moveTo(x1, y1);
	    node.canvas.lineTo(x1, y2);
	    node.canvas.lineTo(x2, y2);
	    node.canvas.lineTo(x2, y1);
	    node.canvas.lineTo(x1, y1);
	    node.canvas.stroke();
	    node.canvas.fill();
	    node.canvas.closePath();
	  },

	  star: function star(node) {
	    var r = node.getNodeSize();
	    var cx = r;
	    var cy = 0;
	    var spikes = 8;
	    var outerRadius = r;
	    var innerRadius = r * 0.5;
	    var rot = Math.PI / 2 * 3;
	    var x = cx;
	    var y = cy;
	    var step = Math.PI / spikes;
	    var i = 0;
	    node.canvas.beginPath();
	    node.canvas.moveTo(cx, cy - outerRadius);
	    for (i = 0; i < spikes; i++) {
	      x = cx + Math.cos(rot) * outerRadius;
	      y = cy + Math.sin(rot) * outerRadius;
	      node.canvas.lineTo(x, y);
	      rot += step;

	      x = cx + Math.cos(rot) * innerRadius;
	      y = cy + Math.sin(rot) * innerRadius;
	      node.canvas.lineTo(x, y);
	      rot += step;
	    }
	    node.canvas.lineTo(cx, cy - outerRadius);
	    node.canvas.stroke();
	    node.canvas.fill();
	    node.canvas.closePath();
	  },

	  triangle: function triangle(node) {
	    var r = node.getNodeSize();
	    var lengthOfSide = 2 * r * Math.cos(30 * Math.PI / 180);

	    node.canvas.beginPath();
	    node.canvas.moveTo(0, 0);
	    node.canvas.rotate(30 * Math.PI / 180);
	    node.canvas.lineTo(lengthOfSide, 0);

	    node.canvas.rotate(-60 * Math.PI / 180);
	    node.canvas.lineTo(lengthOfSide, 0);

	    node.canvas.rotate(30 * Math.PI / 180);
	    node.canvas.lineTo(0, 0);

	    node.canvas.stroke();
	    node.canvas.fill();
	    node.canvas.closePath();
	  }

	};
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _phylocanvasUtils = __webpack_require__(3);

	var _Tooltip2 = __webpack_require__(7);

	var _Tooltip3 = _interopRequireDefault(_Tooltip2);

	var createHandler = _phylocanvasUtils.events.createHandler;
	var preventDefault = _phylocanvasUtils.events.preventDefault;

	function createAnchorElement(contextMenu, _ref) {
	  var _ref$text = _ref.text;
	  var text = _ref$text === undefined ? 'link' : _ref$text;
	  var _ref$filename = _ref.filename;
	  var filename = _ref$filename === undefined ? 'file' : _ref$filename;
	  var href = _ref.href;

	  var anchorElement = contextMenu.createElement('a', text);
	  anchorElement.style.padding = '0px';
	  anchorElement.href = href;
	  anchorElement.style.textDecoration = 'none';
	  anchorElement.download = filename;
	  return anchorElement;
	}

	function createImageLink(contextMenu) {
	  var anchorElement = createAnchorElement(contextMenu, { text: this.text, filename: 'phylocanvas_tree.png', href: contextMenu.tree.getPngUrl() });
	  return anchorElement;
	}

	function createLeafIdsLink(contextMenu) {
	  var leafdata = contextMenu.tree.root.downloadLeafIdsFromBranch();
	  var anchorElement = createAnchorElement(contextMenu, { text: this.text, filename: 'pc-leaf-ids-root.txt', href: leafdata });
	  return anchorElement;
	}

	function createBranchLeafIdsLink(contextMenu, node) {
	  var leafdata = node.downloadLeafIdsFromBranch();
	  var anchorElement = createAnchorElement(contextMenu, { text: this.text, filename: 'pc-leaf-ids-' + node.id + '.txt', href: leafdata });
	  return anchorElement;
	}

	var DEFAULT_MENU_ITEMS = [{ text: 'Collapse/Expand Branch',
	  handler: function handler(branch) {
	    branch.toggleCollapsed();
	    branch.tree.draw(); // some browsers do not fire mousemove after clicking
	  },
	  nodeType: 'internal'
	}, {
	  text: 'Rotate Branch',
	  handler: 'rotate',
	  nodeType: 'internal'
	}, {
	  text: 'Redraw Subtree',
	  handler: 'redrawTreeFromBranch',
	  nodeType: 'internal'
	}, {
	  text: 'Show/Hide Labels',
	  handler: 'toggleLabels'
	}, {
	  text: 'Redraw Original Tree',
	  handler: 'redrawOriginalTree'
	}, {
	  text: 'Export As Image',
	  element: createImageLink
	}, {
	  text: 'Export Leaf IDs',
	  element: createLeafIdsLink
	}, {
	  text: 'Export Leaf IDs on Branch',
	  element: createBranchLeafIdsLink,
	  nodeType: 'internal'
	}];

	function menuItemApplicable(menuItem, node) {
	  if (!node) {
	    return !menuItem.nodeType;
	  }

	  if (node.leaf && menuItem.nodeType !== 'internal') {
	    return true;
	  }

	  if (!node.leaf && menuItem.nodeType === 'internal') {
	    return true;
	  }

	  return false;
	}

	function mouseover(element) {
	  element.style.backgroundColor = '#d2d2c4';
	}

	function mouseout(element) {
	  element.style.backgroundColor = 'transparent';
	}

	function transferMenuItem(_ref2) {
	  var handler = _ref2.handler;
	  var _ref2$text = _ref2.text;
	  var text = _ref2$text === undefined ? 'New menu Item' : _ref2$text;
	  var nodeType = _ref2.nodeType;
	  var element = _ref2.element;

	  return { handler: handler, text: text, nodeType: nodeType, element: element };
	}

	/**
	 * The menu that is shown when the PhyloCanvas widget is right-clicked
	 *
	 * @constructor
	 * @memberOf PhyloCanvas
	 * @extends Tooltip
	 */

	var ContextMenu = (function (_Tooltip) {
	  _inherits(ContextMenu, _Tooltip);

	  function ContextMenu(tree) {
	    var menuItems = arguments.length <= 1 || arguments[1] === undefined ? DEFAULT_MENU_ITEMS : arguments[1];

	    _classCallCheck(this, ContextMenu);

	    _get(Object.getPrototypeOf(ContextMenu.prototype), 'constructor', this).call(this, tree, 'pc-context-menu');

	    this.menuItems = menuItems.map(transferMenuItem);
	    this.fontSize = '8pt';
	  }

	  _createClass(ContextMenu, [{
	    key: 'click',
	    value: function click() {
	      createHandler(this, 'close');
	    }
	  }, {
	    key: 'createContent',
	    value: function createContent(node) {
	      var list = document.createElement('ul');
	      var listElement = undefined;
	      list.style.margin = '0';
	      list.style.padding = '0';

	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = this.menuItems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var menuItem = _step.value;

	          if (!menuItemApplicable(menuItem, node)) {
	            continue;
	          }

	          if (menuItem.element) {
	            var anchorElement = menuItem.element(this, node);
	            listElement = this.createElement('li', anchorElement);
	          } else {
	            listElement = this.createElement('li', menuItem.text);
	          }

	          listElement.style.listStyle = 'none outside none';

	          if (!menuItem.element) {
	            if (menuItem.nodeType) {
	              listElement.addEventListener('click', createHandler(node, menuItem.handler));
	            } else {
	              listElement.addEventListener('click', createHandler(this.tree, menuItem.handler));
	            }
	          }
	          listElement.addEventListener('click', this.click);
	          listElement.addEventListener('contextmenu', preventDefault);
	          listElement.addEventListener('mouseover', createHandler(listElement, mouseover));
	          listElement.addEventListener('mouseout', createHandler(listElement, mouseout));

	          list.appendChild(listElement);
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator['return']) {
	            _iterator['return']();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      document.body.addEventListener('click', createHandler(this, 'close'));
	      this.element.appendChild(list);
	    }
	  }]);

	  return ContextMenu;
	})(_Tooltip3['default']);

	exports['default'] = ContextMenu;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Tooltip
	 *
	 * @constructor
	 * @memberOf PhyloCanvas
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Tooltip = (function () {
	  function Tooltip(tree) {
	    var className = arguments.length <= 1 || arguments[1] === undefined ? 'pc-tooltip' : arguments[1];
	    var element = arguments.length <= 2 || arguments[2] === undefined ? document.createElement('div') : arguments[2];

	    _classCallCheck(this, Tooltip);

	    this.tree = tree;
	    this.element = element;
	    this.element.className = className;
	    this.element.style.display = 'none';
	    this.element.style.position = 'fixed';
	    this.element.style.border = '1px solid #CCCCCC';
	    this.element.style.background = '#FFFFFF';
	    this.element.style.letterSpacing = '0.5px';
	    this.closed = true;

	    this.tree.canvasEl.appendChild(this.element);
	  }

	  _createClass(Tooltip, [{
	    key: 'close',
	    value: function close() {
	      this.element.style.display = 'none';
	      this.closed = true;
	    }
	  }, {
	    key: 'createElement',
	    value: function createElement(tagName, textContent) {
	      var element = document.createElement(tagName);
	      element.style.cursor = 'pointer';
	      element.style.padding = '0.3em 0.5em 0.3em 0.5em';
	      element.style.fontFamily = this.tree.font;
	      element.style.fontSize = this.fontSize || '12pt';
	      element.style.color = 'black';
	      if (typeof textContent === 'object') {
	        element.appendChild(textContent);
	      } else {
	        element.appendChild(document.createTextNode(textContent));
	      }
	      return element;
	    }
	  }, {
	    key: 'createContent',

	    /**
	     * Shows number of child nodes by default
	     */
	    value: function createContent(node) {
	      this.element.appendChild(this.createElement('div', node.getChildIds().length));
	    }
	  }, {
	    key: 'open',
	    value: function open(x, y, node) {
	      if (x === undefined) x = 100;
	      if (y === undefined) y = 100;

	      while (this.element.hasChildNodes()) {
	        this.element.removeChild(this.element.firstChild);
	      }

	      this.createContent(node);

	      this.element.style.top = y + 'px';
	      this.element.style.left = x + 'px';

	      this.element.style.zIndex = 2000;
	      this.element.style.display = 'block';

	      this.closed = false;
	    }
	  }]);

	  return Tooltip;
	})();

	exports['default'] = Tooltip;
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Overview window
	 *
	 * @constructor
	 * @memberof PhyloCanvas
	 */
	'use strict';

	function Navigator(tree) {
	  this.tree = tree;
	  this.cel = document.createElement('canvas');
	  this.cel.id = this.tree.canvasEl.id + 'Navi';
	  this.cel.style.zIndex = '100';
	  this.cel.style.backgroundColor = '#FFFFFF';
	  this.cel.width = this.tree.canvas.canvas.width / 3;
	  this.cel.height = this.tree.canvas.canvas.height / 3;
	  this.cel.style.position = 'absolute';
	  this.cel.style.bottom = '0px';
	  this.cel.style.right = '0px';
	  this.cel.style.border = '1px solid #CCCCCC';
	  this.tree.canvasEl.appendChild(this.cel);

	  this.ctx = this.cel.getContext('2d');
	  this.ctx.translate(this.cel.width / 2, this.cel.height / 2);
	  this.ctx.save();
	}

	Navigator.prototype.drawFrame = function () {
	  var w = this.cel.width;
	  var h = this.cel.height;
	  var hw = w / 2;
	  var hh = h / 2;
	  var url;
	  var _this;
	  var z;

	  this.ctx.restore();
	  this.ctx.save();

	  this.ctx.clearRect(-hw, -hh, w, h);

	  this.ctx.strokeStyle = 'rgba(180,180,255,1)';

	  if (!this.tree.drawn) {
	    url = this.tree.canvas.canvas.toDataURL();

	    this.img = document.createElement('img');
	    this.img.src = url;

	    _this = this;

	    this.img.onload = function () {
	      _this.ctx.drawImage(_this.img, -hw, -hh, _this.cel.width, _this.cel.height);
	    };

	    this.baseOffsetx = this.tree.offsetx;
	    this.baseOffsety = this.tree.offsety;
	    this.baseZoom = this.tree.zoom;
	  } else {
	    this.ctx.drawImage(this.img, -hw, -hh, this.cel.width, this.cel.height);
	  }

	  z = 1 / (this.tree.zoom / this.baseZoom);

	  this.ctx.lineWidth = this.ctx.lineWidth / z;

	  this.ctx.translate((this.baseOffsetx - this.tree.offsetx * z) * z, (this.baseOffsety - this.tree.offsety * z) * z);
	  this.ctx.scale(z, z);
	  this.ctx.strokeRect(-hw, -hh, w, h);
	};

	Navigator.prototype.resize = function () {
	  this.cel.width = this.tree.canvas.canvas.width / 3;
	  this.cel.height = this.tree.canvas.canvas.height / 3;
	  this.ctx.translate(this.cel.width / 2, this.cel.height / 2);
	  this.drawFrame();
	};

	module.exports = Navigator;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _rectangular = __webpack_require__(10);

	var _rectangular2 = _interopRequireDefault(_rectangular);

	var _circular = __webpack_require__(15);

	var _circular2 = _interopRequireDefault(_circular);

	var _radial = __webpack_require__(18);

	var _radial2 = _interopRequireDefault(_radial);

	var _diagonal = __webpack_require__(21);

	var _diagonal2 = _interopRequireDefault(_diagonal);

	var _hierarchical = __webpack_require__(24);

	var _hierarchical2 = _interopRequireDefault(_hierarchical);

	exports['default'] = {
	  rectangular: _rectangular2['default'],
	  circular: _circular2['default'],
	  radial: _radial2['default'],
	  diagonal: _diagonal2['default'],
	  hierarchical: _hierarchical2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _BranchRenderer = __webpack_require__(11);

	var _BranchRenderer2 = _interopRequireDefault(_BranchRenderer);

	var _Prerenderer = __webpack_require__(12);

	var _Prerenderer2 = _interopRequireDefault(_Prerenderer);

	var _branchRenderer = __webpack_require__(13);

	var _branchRenderer2 = _interopRequireDefault(_branchRenderer);

	var _prerenderer = __webpack_require__(14);

	var _prerenderer2 = _interopRequireDefault(_prerenderer);

	var labelAlign = {
	  getX: function getX(node) {
	    return node.tree.farthestNodeFromRootX + node.getNodeSize();
	  },
	  getY: function getY(node) {
	    return node.centery;
	  },
	  getLabelOffset: function getLabelOffset(node) {
	    return node.tree.farthestNodeFromRootX - node.centerx;
	  }
	};

	exports['default'] = {
	  branchRenderer: new _BranchRenderer2['default'](_branchRenderer2['default']),
	  prerenderer: new _Prerenderer2['default'](_prerenderer2['default']),
	  labelAlign: labelAlign
	};
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function BranchRenderer(options) {
	  if (!options || !options.draw) {
	    throw new Error('`draw` function is required for branch renderers');
	  }

	  this.draw = options.draw;
	  this.prepareChild = options.prepareChild;
	}

	BranchRenderer.prototype.render = function (tree, branch, collapse) {
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
	};

	module.exports = BranchRenderer;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Prerenderer = (function () {
	  function Prerenderer(options) {
	    _classCallCheck(this, Prerenderer);

	    this.getStep = options.getStep;
	    this.calculate = options.calculate;
	  }

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

	      this.calculate(tree, step);

	      // Assign root startx and starty
	      tree.root.startx = tree.root.centerx;
	      tree.root.starty = tree.root.centery;
	      // Set font size for tree and its branches
	      tree.setFontSize(step);
	      tree.setMaxLabelLength();
	    }
	  }]);

	  return Prerenderer;
	})();

	exports["default"] = Prerenderer;
	module.exports = exports["default"];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = {
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
	module.exports = exports["default"];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = {
	  getStep: function getStep(tree) {
	    return Math.max(tree.canvas.canvas.height / (tree.leaves.length + 2), (tree.leaves[0].getNodeSize() + 2) * 2);
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
	module.exports = exports["default"];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _BranchRenderer = __webpack_require__(11);

	var _BranchRenderer2 = _interopRequireDefault(_BranchRenderer);

	var _Prerenderer = __webpack_require__(12);

	var _Prerenderer2 = _interopRequireDefault(_Prerenderer);

	var _branchRenderer = __webpack_require__(16);

	var _branchRenderer2 = _interopRequireDefault(_branchRenderer);

	var _prerenderer = __webpack_require__(17);

	var _prerenderer2 = _interopRequireDefault(_prerenderer);

	var labelAlign = {
	  getX: function getX(node) {
	    return node.centerx + node.labelOffsetX;
	  },
	  getY: function getY(node) {
	    return node.centery + node.labelOffsetY;
	  },
	  getLabelOffset: function getLabelOffset(node) {
	    return node.labelOffsetX / Math.cos(node.angle) - node.getNodeSize();
	  }
	};

	exports['default'] = {
	  branchRenderer: new _BranchRenderer2['default'](_branchRenderer2['default']),
	  prerenderer: new _Prerenderer2['default'](_prerenderer2['default']),
	  labelAlign: labelAlign,
	  scaleCollapsedNode: function scaleCollapsedNode(radius) {
	    return radius / 3;
	  },
	  calculateFontSize: function calculateFontSize(ystep) {
	    return Math.min(ystep * 10 + 4, 40);
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = {
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
	module.exports = exports["default"];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _phylocanvasUtils = __webpack_require__(3);

	var Angles = _phylocanvasUtils.constants.Angles;
	exports['default'] = {
	  getStep: function getStep(tree) {
	    return Angles.FULL / tree.leaves.length;
	  },
	  calculate: function calculate(tree, step) {
	    tree.branchScalar = Math.min(tree.canvas.canvas.width, tree.canvas.canvas.height) / tree.maxBranchLength;
	    // work out radius of tree and the make branch scalar proportinal to the
	    var r = tree.leaves.length * tree.leaves[0].getNodeSize() * 2 / Angles.FULL;
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
	      node.labelOffsetX = (r + node.getNodeSize() * 4) * Math.cos(node.angle) - node.centerx;
	      node.labelOffsetY = (r + node.getNodeSize() * 4) * Math.sin(node.angle) - node.centery;

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
	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _BranchRenderer = __webpack_require__(11);

	var _BranchRenderer2 = _interopRequireDefault(_BranchRenderer);

	var _Prerenderer = __webpack_require__(12);

	var _Prerenderer2 = _interopRequireDefault(_Prerenderer);

	var _branchRenderer = __webpack_require__(19);

	var _branchRenderer2 = _interopRequireDefault(_branchRenderer);

	var _prerenderer = __webpack_require__(20);

	var _prerenderer2 = _interopRequireDefault(_prerenderer);

	exports['default'] = {
	  branchRenderer: new _BranchRenderer2['default'](_branchRenderer2['default']),
	  prerenderer: new _Prerenderer2['default'](_prerenderer2['default']),
	  scaleCollapsedNode: function scaleCollapsedNode(radius) {
	    return radius / 7;
	  },
	  calculateFontSize: function calculateFontSize(ystep) {
	    return Math.min(ystep * 50 + 5, 15);
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = {
	  draw: function draw(tree, node) {
	    node.canvas.beginPath();
	    node.canvas.moveTo(node.startx, node.starty);
	    node.canvas.lineTo(node.centerx, node.centery);
	    node.canvas.stroke();
	    node.canvas.closePath();
	  }
	};
	module.exports = exports["default"];

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _phylocanvasUtils = __webpack_require__(3);

	var Angles = _phylocanvasUtils.constants.Angles;

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

	exports['default'] = {
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
	module.exports = exports['default'];

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _BranchRenderer = __webpack_require__(11);

	var _BranchRenderer2 = _interopRequireDefault(_BranchRenderer);

	var _Prerenderer = __webpack_require__(12);

	var _Prerenderer2 = _interopRequireDefault(_Prerenderer);

	var _branchRenderer = __webpack_require__(22);

	var _branchRenderer2 = _interopRequireDefault(_branchRenderer);

	var _prerenderer = __webpack_require__(23);

	var _prerenderer2 = _interopRequireDefault(_prerenderer);

	exports['default'] = {
	  branchRenderer: new _BranchRenderer2['default'](_branchRenderer2['default']),
	  prerenderer: new _Prerenderer2['default'](_prerenderer2['default']),
	  calculateFontSize: function calculateFontSize(ystep) {
	    return Math.min(ystep / 2, 7.5);
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = {
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
	module.exports = exports["default"];

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _phylocanvasUtils = __webpack_require__(3);

	var Angles = _phylocanvasUtils.constants.Angles;
	exports['default'] = {
	  getStep: function getStep(tree) {
	    return Math.max(tree.canvas.canvas.height / (tree.leaves.length + 2), (tree.leaves[0].getNodeSize() + 2) * 2);
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
	module.exports = exports['default'];

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _BranchRenderer = __webpack_require__(11);

	var _BranchRenderer2 = _interopRequireDefault(_BranchRenderer);

	var _Prerenderer = __webpack_require__(12);

	var _Prerenderer2 = _interopRequireDefault(_Prerenderer);

	var _branchRenderer = __webpack_require__(25);

	var _branchRenderer2 = _interopRequireDefault(_branchRenderer);

	var _prerenderer = __webpack_require__(26);

	var _prerenderer2 = _interopRequireDefault(_prerenderer);

	var labelAlign = {
	  getX: function getX(node) {
	    return node.centerx;
	  },
	  getY: function getY(node) {
	    return node.tree.farthestNodeFromRootY + node.getNodeSize();
	  },
	  getLabelOffset: function getLabelOffset(node) {
	    return node.tree.farthestNodeFromRootY - node.centery;
	  }
	};

	exports['default'] = {
	  branchRenderer: new _BranchRenderer2['default'](_branchRenderer2['default']),
	  prerenderer: new _Prerenderer2['default'](_prerenderer2['default']),
	  labelAlign: labelAlign
	};
	module.exports = exports['default'];

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = {
	  draw: function draw(tree, node) {
	    node.canvas.beginPath();

	    if (node !== node.tree.root) {
	      node.canvas.moveTo(node.startx, node.starty);
	      node.canvas.lineTo(node.centerx, node.starty);
	    }

	    node.canvas.lineTo(node.centerx, node.centery);
	    node.canvas.stroke();

	    node.canvas.closePath();
	  }
	};
	module.exports = exports["default"];

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _phylocanvasUtils = __webpack_require__(3);

	var Angles = _phylocanvasUtils.constants.Angles;
	exports['default'] = {
	  getStep: function getStep(tree) {
	    return Math.max(tree.canvas.canvas.width / (tree.leaves.length + 2), (tree.leaves[0].getNodeSize() + 2) * 2);
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
	module.exports = exports['default'];

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Parser = __webpack_require__(1);

	var _Parser2 = _interopRequireDefault(_Parser);

	var _newick = __webpack_require__(28);

	var _newick2 = _interopRequireDefault(_newick);

	var _nexus = __webpack_require__(29);

	var _nexus2 = _interopRequireDefault(_nexus);

	exports['default'] = {
	  nexus: new _Parser2['default'](_nexus2['default']),
	  newick: new _Parser2['default'](_newick2['default'])
	};
	module.exports = exports['default'];

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Branch = __webpack_require__(4);

	var _Branch2 = _interopRequireDefault(_Branch);

	var format = 'newick';
	var fileExtension = /\.nwk$/;
	var validator = /^[\w\W\.\*\:(\),-\/]+;\s?$/gi;

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
	      if (!_iteratorNormalCompletion && _iterator['return']) {
	        _iterator['return']();
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
	      if (!_iteratorNormalCompletion2 && _iterator2['return']) {
	        _iterator2['return']();
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
	  branch.id = label || branch.tree.generateBranchId();
	  return postLabelIndex + branchLengthStr.length;
	}

	function parseFn(_ref, callback) {
	  var string = _ref.string;
	  var root = _ref.root;

	  var cleanString = string.replace(/(\r|\n)/g, '');
	  var currentNode = root;

	  for (var i = 0; i < cleanString.length; i++) {
	    var node = undefined;
	    switch (cleanString[i]) {
	      case '(':
	        // new Child
	        node = new _Branch2['default']();
	        currentNode.addChild(node);
	        currentNode = node;
	        break;
	      case ')':
	        // return to parent
	        currentNode = currentNode.parent;
	        break;
	      case ',':
	        // new sibiling
	        node = new _Branch2['default']();
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

	exports['default'] = {
	  format: format,
	  fileExtension: fileExtension,
	  validator: validator,
	  parseFn: parseFn
	};
	module.exports = exports['default'];

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _newick = __webpack_require__(28);

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
	  for (var i = 0; i < tArr.length; i++) {
	    if (tArr[i].trim() === '') continue;
	    var s = tArr[i].replace(/tree\s/i, '');
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
	          if (!_iteratorNormalCompletion && _iterator['return']) {
	            _iterator['return']();
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

	exports['default'] = {
	  parseFn: parseFn,
	  format: format,
	  fileExtension: fileExtension,
	  validator: validator
	};
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;