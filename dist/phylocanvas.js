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

	var addClass = __webpack_require__(2).addClass;
	var hasClass = __webpack_require__(2).hasClass;
	var removeClass = __webpack_require__(2).removeClass;

	var fireEvent = __webpack_require__(1).fireEvent;
	var addEvent = __webpack_require__(1).addEvent;
	var killEvent = __webpack_require__(1).killEvent;

	/**
	 * @namespace PhyloCanvas
	 */

	var Tree = __webpack_require__(3);

	function History(tree) {
	  this.tree = tree;

	  this.injectCss();
	  this.div = this.createDiv(tree.canvasEl);

	  this.resizeTree(tree);

	  this.tree.addListener('subtree', function (evt) {
	    this.addSnapshot(evt.node);
	  }.bind(this));
	  this.tree.addListener('loaded', this.reset.bind(this));
	  this.tree.addListener('typechanged', function () {
	    this.addSnapshot(this.tree.root.id);
	  }.bind(this));

	  if (tree.historyCollapsed) {
	    this.collapse();
	  }
	}

	History.prototype.reset = function () {
	  this.clear();
	  // Fixing initial snapshot - draw only after the tree is drawn
	  if (this.tree.drawn) {
	    this.addSnapshot(this.tree.root.id);
	  }
	};

	History.prototype.collapse = function () {
	  addClass(this.div, 'collapsed');
	  this.toggleDiv.firstChild.data = '>';
	  this.resizeTree();
	};

	History.prototype.expand = function () {
	  removeClass(this.div, 'collapsed');
	  this.toggleDiv.firstChild.data = '<';
	  this.resizeTree();
	};

	History.prototype.isCollapsed = function () {
	  return hasClass(this.div, 'collapsed');
	};

	History.prototype.toggle = function () {
	  if (this.isCollapsed()) {
	    this.expand();
	  } else {
	    this.collapse();
	  }
	  fireEvent(this.tree.canvasEl, 'historytoggle', { isOpen: !this.isCollapsed() });
	};

	History.prototype.createDiv = function (parentDiv) {
	  var div = document.createElement('div');
	  div.className = 'pc-history';
	  addEvent(div, 'click', killEvent);
	  addEvent(div, 'contextmenu', killEvent);

	  var title = document.createElement('div');
	  title.innerHTML = 'History';
	  title.className = 'pc-history-title';
	  div.appendChild(title);

	  var tabDiv = document.createElement('div');
	  tabDiv.appendChild(document.createTextNode('<'));
	  tabDiv.className = 'toggle';
	  addEvent(tabDiv, 'click', this.toggle.bind(this));
	  div.appendChild(tabDiv);
	  this.toggleDiv = tabDiv;

	  var snapshotList = document.createElement('ul');
	  snapshotList.className = 'pc-history-snapshots';
	  div.appendChild(snapshotList);
	  this.snapshotList = snapshotList;

	  parentDiv.appendChild(div);
	  return div;
	};

	History.prototype.resizeTree = function () {
	  var tree = this.tree;
	  this.width = this.div.offsetWidth;
	  tree.setSize(tree.canvasEl.offsetWidth - this.width, tree.canvasEl.offsetHeight);
	  if (this.isCollapsed()) {
	    tree.canvasEl.getElementsByTagName('canvas')[0].style.marginLeft = this.width + 'px';
	  } else {
	    tree.canvasEl.getElementsByTagName('canvas')[0].style.marginLeft = '20%';
	  }
	};

	/**
	 * Add a snapshot of the tree to the history
	 * 1.0.6-1 (08/04/2014) - put the new snapshot at the top of the list github issue #17
	 */
	History.prototype.addSnapshot = function (id) {
	  var historyIdPrefix = 'phylocanvas-history-';
	  // So that addSnapshot will not be invoked on drawing the subtree
	  // You dont need to create a snapshot of an already created one.
	  var treetype = this.tree.treeType;
	  var match = false;
	  var init = true;

	  // Check if there is a snapshot already available. If not, then add a snapshot
	  this.tree.historySnapshots.forEach(function (ele) {
	    var dataTreeType = ele.getAttribute('data-tree-type');
	    ele.style.background = 'transparent';
	    if (ele.id == historyIdPrefix + id && ele.getAttribute('data-tree-type') == treetype) {
	      // History already present
	      match = true;
	      ele.style.background = 'lightblue';
	    }
	  });

	  // Check if there is a snapshot already available. If not, then add a snapshot
	  if (match) {
	    return;
	  }
	  var url = this.tree.getPngUrl();
	  var listElement = document.createElement('li');
	  var thumbnail = document.createElement('img');

	  thumbnail.width = this.width;
	  thumbnail.src = url;
	  thumbnail.id = historyIdPrefix + id;
	  thumbnail.setAttribute('data-tree-type', this.tree.treeType);
	  thumbnail.style.background = 'lightblue';
	  // Creating the snapshot array which is used to check if the element exists in history in further clicks
	  this.tree.historySnapshots.push(thumbnail);

	  listElement.appendChild(thumbnail);
	  this.snapshotList.appendChild(listElement);

	  addEvent(thumbnail, 'click', this.goBackTo.bind(this));
	};

	History.prototype.clear = function () {
	  var listElements = this.snapshotList.getElementsByTagName('li');
	  for (var i = listElements.length; i-- ;) {
	    this.snapshotList.removeChild(listElements[0]);
	  }
	};

	History.prototype.goBackTo = function (evt) {
	  var ele = evt.target;
	  this.tree.treeType = ele.getAttribute('data-tree-type');
	  this.tree.redrawFromBranch(this.tree.origBranches[ele.id.replace('phylocanvas-history-', '')]);
	};

	History.prototype.injectCss = function () {
	  var css =
	    '.pc-history { position: absolute; top: 0; bottom: 0; left: 0; box-sizing: border-box; width: 20%; overflow: hidden; background: #EEE }' +
	    '.pc-history .pc-history-title { box-sizing: border-box; height: 20px; text-align: center; font-size: 13px; color: #666; padding: 2px; border-bottom: 1px solid #bbb }' +
	    '.pc-history .toggle { position: absolute; top: 0; right: 0; padding: 2px 8px; cursor: pointer; border-top-left-radius: 50%; border-bottom-left-radius: 50%; background-color: #666; color: #FFF; box-sizing: border-box; height: 20px; }' +
	    '.pc-history.collapsed .toggle { border-radius: 0 50% 50% 0 }' +
	    '.pc-history .toggle:hover { background-color: #FFF; color: #CCC }' +
	    '.pc-history.collapsed { width: 25px }' +
	    '.pc-history.collapsed .pc-history-snapshots { display: none }' +
	    '.pc-history.collapsed .pc-history-title { writing-mode: tb-rl; -webkit-transform: rotate(270deg); -moz-transform: rotate(270deg); -o-transform: rotate(270deg); -ms-transform: rotate(270deg); transform: rotate(270deg); margin-top: 70px; background: 0 0; color: #666; letter-spacing: 1.2px; border-bottom: none }' +
	    '.pc-history-snapshots { position: absolute; top: 20px; bottom: 0; margin: 0; padding: 0; overflow-x: hidden; overflow-y: scroll; }' +
	    '.pc-history-snapshots li { list-style: outside none none }' +
	    '.pc-history img { border: 0px solid #CCC; border-top-width: 1px; cursor: pointer; width: 100%; box-sizing: border-box; transition: background-color .25s ease; display: block }' +
	    '.pc-history img:hover { background-color: #fff }';
	  var head = document.head || document.getElementsByTagName('head')[0];
	  var style = document.createElement('style');

	  style.type = 'text/css';
	  if (style.styleSheet) {
	    style.styleSheet.cssText = css;
	  } else {
	    style.appendChild(document.createTextNode(css));
	  }
	  head.appendChild(style);
	};


	Tree.prototype.initialiseHistory = function (config) {
	  var isCollapsedConfigured;

	  if (config.history || typeof config.history === 'undefined') {
	    isCollapsedConfigured = (config.history && typeof config.history.collapsed !== 'undefined');
	    this.historyCollapsed = isCollapsedConfigured ? config.history.collapsed : true;
	    this.historySnapshots = [];
	    this.history = new History(this);
	  }
	};

	module.exports = {
	  Tree: Tree,
	  Branch: __webpack_require__(4),
	  Loader: __webpack_require__(10),
	  ContextMenu: __webpack_require__(6),
	  History: History
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	function preventDefault(event) {
	  event.preventDefault();
	  return false;
	}

	function fireEvent(element, type, params) {
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
	  event.bubbles = false;
	  if (params) {
	    for (param in params) {
	      if (params.hasOwnProperty(param)) {
	        event[param] = params[param];
	      }
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
	      return (fn.call(elem, window.event));
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

	  if (typeof func === typeof 'aaa') {
	    handler = function (e) {
	      if (obj[func]) {
	        return obj[func](e);
	      }
	    };
	  } else {
	    handler = function () { return func(obj); };
	  }
	  return handler;
	}

	module.exports.preventDefault = preventDefault;
	module.exports.fireEvent = fireEvent;
	module.exports.addEvent = addEvent;
	module.exports.killEvent = killEvent;
	module.exports.createHandler = createHandler;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var fireEvent = __webpack_require__(1).fireEvent;

	function setupDownloadLink(data, filename) {
	  var blob = new Blob([ data ], { type: 'text/csv;charset=utf-8' });
	  var url = window.URL || window.webkitURL;
	  var anchor = document.createElement('a');
	  var isDownloadSupported = (typeof anchor.download !== 'undefined');

	  anchor.href = url.createObjectURL(blob);
	  anchor.target = '_blank';
	  if (isDownloadSupported) {
	    anchor.download = (filename) ? filename : 'pc-download.txt';
	  }
	  fireEvent(anchor, 'click');
	}

	/**
	 * Get the x coordinate of oElement
	 *
	 * @param domElement - The element to get the X position of.
	 *
	 */
	function getX(domElement) {
	  var xValue = 0;
	  while (domElement != null) {
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

	module.exports.setupDownloadLink = setupDownloadLink;
	module.exports.getX = getX;
	module.exports.getY = getY;
	module.exports.addClass = addClass;
	module.exports.removeClass = removeClass;
	module.exports.hasClass = hasClass;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Branch = __webpack_require__(4);
	var ContextMenu = __webpack_require__(6);
	var Tooltip = __webpack_require__(7);
	var Navigator = __webpack_require__(8);

	var Angles = __webpack_require__(5).Angles;
	var Shapes = __webpack_require__(5).Shapes;

	var addClass = __webpack_require__(2).addClass;
	var getX = __webpack_require__(2).getX;
	var getY = __webpack_require__(2).getY;

	var fireEvent = __webpack_require__(1).fireEvent;
	var addEvent = __webpack_require__(1).addEvent;

	var getBackingStorePixelRatio =
	  __webpack_require__(9).getBackingStorePixelRatio;

	/**
	 * The instance of a PhyloCanvas Widget
	 *
	 * @constructor
	 * @memberof PhyloCanvas
	 * @param div {string|HTMLDivElement} the div or id of a div that phylocanvas
	 * will be drawn in
	 *
	 * {@link PhyoCanvas.Tree}
	 *
	 * @example
	 *  new PhyloCanvas.Tree('div_id');
	 *
	 * @example
	 *  new PhyloCanvas.Tree(div);
	 */
	function Tree(div, conf) {
	  if (!conf) conf = {};
	  // if the ID is provided get the element, if not assume div
	  if (typeof div === 'string') div = document.getElementById(div);

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
	   * Loading dialog displayed while waiting for the tree
	   */
	  // this.loader = new Loader(div);
	  /**
	   * The root node of the tree
	   * (not neccesarily a root in the Phylogenetic sense)
	   */
	  this.root = false;

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

	  this.origBL = {};
	  this.origP = {};

	  this.canvasEl = div;

	  addClass(this.canvasEl, 'pc-container');

	  //Set up the div and canvas element
	  if (window.getComputedStyle(this.canvasEl).position === 'static') {
	    this.canvasEl.style.position = 'relative';
	  }
	  this.canvasEl.style.boxSizing = 'border-box';
	  var cl = document.createElement('canvas');
	  cl.id = div.id + 'pCanvas';
	  cl.className = 'phylocanvas';
	  cl.style.position = 'relative';
	  cl.style.backgroundColor = '#FFFFFF';
	  cl.height = div.clientHeight || 400;
	  cl.width = div.clientWidth || 400;
	  cl.style.zIndex = '1';
	  this.canvasEl.appendChild(cl);

	  /***
	   * Right click menu
	   * Users could pass options while creating the Tree object
	   */
	  var menuOptions = [];
	  if (conf.contextMenu !== undefined) {
	    menuOptions = conf.contextMenu;
	  }
	  this.contextMenu = new ContextMenu(this, menuOptions);

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

	  this.canvas = cl.getContext('2d');

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

	  this.treeType = 'radial';
	  this.maxBranchLength = 0;
	  this.lineWidth = 1.0;
	  this.textSize = 7;
	  this.font = 'sans-serif';

	  this.unselectOnClickAway = true;
	  this.rightClickZoom = true;

	  if (this.useNavigator) {
	    this.navigator = new Navigator(this);
	  }

	  this.adjustForPixelRatio();

	  this.initialiseHistory(conf);

	  this.addListener('contextmenu', this.clicked.bind(this));
	  this.addListener('click', this.clicked.bind(this));

	  this.addListener('mousedown', this.pickup.bind(this));
	  this.addListener('mouseup', this.drop.bind(this));
	  this.addListener('mouseout', this.drop.bind(this));

	  addEvent(this.canvas.canvas, 'mousemove', this.drag.bind(this));
	  addEvent(this.canvas.canvas, 'mousewheel', this.scroll.bind(this));
	  addEvent(this.canvas.canvas, 'DOMMouseScroll', this.scroll.bind(this));
	  addEvent(window, 'resize', function (evt) {
	    this.resizeToContainer();
	  }.bind(this));

	  this.addListener('loaded', function (evt) {
	    this.origBranches = this.branches;
	    this.origLeaves = this.leaves;
	    this.origRoot = this.root;
	  }.bind(this));

	  /**
	   * Align nodes vertically
	   */
	  this.nodeAlign = false;
	  /**
	   * X and Y axes of the node that is farther from the root
	   * Used to align node vertically
	   */
	  this.farthestNodeFromRootX = 0;
	  this.farthestNodeFromRootY = 0;
	  this.showMetadata = false;
	  // Takes an array of metadata column headings to overlay on the tree
	  this.selectedMetadataColumns = [];
	  // Colour for 1 and 0s. Currently 0s are not drawn
	  this.colour1 = 'rgba(206,16,16,1)';
	  this.colour0 = '#ccc';
	  /**
	     Maximum length of label for each tree type.
	     Because label length pixel differes for different tree types for some reason
	   */
	  this.maxLabelLength = {};
	  // x step for metadata
	  this.metadataXStep = 15;
	  // Boolean to detect if metadata heading is drawn or not
	  this.metadataHeadingDrawn = false;
	}


	Tree.prototype.AJAX = function (url, method, params, callback, callbackPars, scope, errorCallback) {
	  var xmlhttp;
	  if (window.XMLHttpRequest) {
	    // code for IE7+, Firefox, Chrome, Opera, Safari
	    xmlhttp = new XMLHttpRequest();
	  } else {
	    // code for IE6, IE5
	    xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
	  }

	  xmlhttp.onreadystatechange = function () {
	    if (xmlhttp.readyState === 4) {
	      if (xmlhttp.status === 200) {
	        callback(xmlhttp, callbackPars, scope);
	      } else {
	        if (errorCallback) errorCallback(xmlhttp, callbackPars, scope);
	      }
	    }
	  };
	  xmlhttp.open(method, url, true);
	  if (method === 'GET') {
	    xmlhttp.send();
	  }
	  else {
	    xmlhttp.send(params);
	  }
	};

	Tree.prototype.checkInitialTreeCollapseRange = function (node) {
	  // Collapse nodes on default
	  var childIds = node.getChildIds();
	  if (childIds && childIds.length > this.defaultCollapsedOptions.min &&
	      childIds.length < this.defaultCollapsedOptions.max) {
	    node.collapsed = true;
	  }
	};

	/**
	 * A dictionary of functions. Each function draws a different tree structure
	 */
	Tree.prototype.branchRenderers = {
	  rectangular: function (tree, node, collapse) {
	    var  bl = node.branchLength * tree.branchScalar;
	    node.angle = 0;
	    if (node.parent) {
	      node.centerx = node.startx + bl;
	    }
	    if (node.selected) {
	      //this.parent && this.parent.selected ? this.tree.selectedColour : this.tree.branchColour;
	      node.canvas.fillStyle = tree.selectedColour;
	    } else {
	      node.canvas.fillStyle = node.colour;
	    }

	    node.canvas.strokeStyle = node.getColour();
	    node.canvas.beginPath();

	    if (!collapse) {
	      node.canvas.moveTo(node.startx, node.starty);
	      node.canvas.lineTo(node.startx, node.centery);
	      node.canvas.lineTo(node.centerx, node.centery);
	      node.canvas.stroke();
	      node.canvas.closePath();

	      // Check initial tree collapse range
	      if (tree.defaultCollapsed && tree.defaultCollapsedOptions) {
	        tree.checkInitialTreeCollapseRange(node);
	      }
	      node.drawNode();
	    }

	    node.canvas.closePath();

	    for (var i = 0; i < node.children.length && !collapse; i++) {
	      node.children[i].startx = node.centerx;
	      node.children[i].starty = node.centery;
	      tree.branchRenderers.rectangular(tree, node.children[i], node.collapsed || collapse);
	    }
	  },
	  circular: function (tree, node, collapse) {
	    var bl = node.totalBranchLength * tree.branchScalar;
	    node.canvas.strokeStyle = node.getColour();

	    if (node.selected) {
	      node.canvas.fillStyle = node.tree.selectedColour;
	    } else {
	      node.canvas.fillStyle = node.colour;
	    }

	    if (!collapse) {
	      node.canvas.beginPath();
	      node.canvas.moveTo(node.startx, node.starty);
	      if (node.leaf) {
	        node.canvas.lineTo(node.interx, node.intery);
	        node.canvas.stroke();
	        var ss = node.getColour();
	        node.canvas.strokeStyle = node.selected ? node.tree.selectedColour :  'rgba(0,0,0,0.5)';
	        node.canvas.lineTo(node.centerx, node.centery);
	        node.canvas.stroke();
	        node.canvas.strokeStyle = ss;
	      } else {
	        node.canvas.lineTo(node.centerx, node.centery);
	        node.canvas.stroke();
	      }

	      node.canvas.strokeStyle = node.getColour();
	      // Check initial tree collapse range
	      if (tree.defaultCollapsed && tree.defaultCollapsedOptions) {
	        tree.checkInitialTreeCollapseRange(node);
	      }

	      if (node.children.length > 1 && !node.collapsed) {
	        node.canvas.beginPath();
	        node.canvas.arc(0, 0, (bl), node.minChildAngle, node.maxChildAngle, node.maxChildAngle < node.minChildAngle);
	        node.canvas.stroke();
	        node.canvas.closePath();
	      }
	      node.drawNode();
	    }

	    for (var i = 0; i < node.children.length && !collapse; i++) {
	      tree.branchRenderers.circular(tree, node.children[i], node.collapsed || collapse);
	    }
	  },
	  radial: function (tree, node, collapse) {
	    node.canvas.strokeStyle = node.getColour();

	    if (node.selected) {
	      node.canvas.fillStyle = node.tree.selectedColour;
	    }
	    else {
	      node.canvas.fillStyle = node.colour;
	    }

	    if (node.parent && !collapse) {
	      node.canvas.beginPath();
	      node.canvas.moveTo(node.startx, node.starty);
	      node.canvas.lineTo(node.centerx, node.centery);
	      node.canvas.stroke();
	      node.canvas.closePath();

	      // Check initial tree collapse range
	      if (tree.defaultCollapsed && tree.defaultCollapsedOptions) {
	        tree.checkInitialTreeCollapseRange(node);
	      }
	      node.drawNode();
	    }

	    for (var i = 0; i < node.children.length && !collapse; i++) {
	      tree.branchRenderers.radial(tree, node.children[i], node.collapsed || collapse);
	    }
	  },
	  diagonal: function (tree, node, collapse) {
	    node.angle = 0;
	    node.canvas.strokeStyle = node.getColour();

	    if (node.selected) {
	      node.canvas.fillStyle = node.tree.selectedColour;
	    } else {
	      node.canvas.fillStyle = node.colour;
	    }

	    node.canvas.beginPath();
	    // alert(node.starty);

	    if (!collapse) {
	      node.canvas.moveTo(node.startx, node.starty);
	      node.canvas.lineTo(node.centerx, node.centery);
	      node.canvas.stroke();
	      node.canvas.closePath();

	      // Check initial tree collapse range
	      if (tree.defaultCollapsed && tree.defaultCollapsedOptions) {
	        tree.checkInitialTreeCollapseRange(node);
	      }
	      node.drawNode();
	    }

	    node.canvas.closePath();

	    for (var i = 0; i < node.children.length && !collapse; i++) {
	      node.children[i].startx = node.centerx;
	      node.children[i].starty = node.centery;
	      tree.branchRenderers.diagonal(tree, node.children[i], node.collapsed || collapse);
	    }
	  },
	  hierarchy: function (tree, node, collapse) {
	    node.canvas.strokeStyle = node.getColour();

	    if (node.selected) {
	      node.canvas.fillStyle = node.tree.selectedColour;
	    } else {
	      node.canvas.fillStyle = node.colour;
	    }

	    if (!collapse) {
	      node.canvas.beginPath();
	      if (node !== node.tree.root) {
	        node.canvas.moveTo(node.startx, node.starty);
	        node.canvas.lineTo(node.centerx, node.starty);
	      }

	      node.canvas.lineTo(node.centerx, node.centery);
	      node.canvas.stroke();

	      // Check initial tree collapse range
	      if (tree.defaultCollapsed && tree.defaultCollapsedOptions) {
	        tree.checkInitialTreeCollapseRange(node);
	      }
	      node.drawNode();
	    }
	    node.canvas.closePath();

	    for (var i = 0; i < node.children.length && !collapse; i++) {
	      tree.branchRenderers.hierarchy(tree, node.children[i], node.collapsed || collapse);
	    }
	  }
	};

	Tree.prototype.clicked = function (e) {
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
	    node = this.root.clicked(this.translateClickX(e.clientX), this.translateClickY(e.clientY));

	    if (node) {
	      this.root.setSelected(false, true);
	      if (this.internalNodesSelectable || node.leaf) {
	        node.setSelected(true, true);
	        nids = node.getChildIds();
	      }
	      this.draw();
	    } else if (this.unselectOnClickAway && this.contextMenu.closed && !this.dragging) {
	      this.root.setSelected(false, true);
	      this.draw();
	    }

	    if (!this.pickedup) {
	      this.dragging = false;
	    }

	    this.nodesSelected(nids);
	  } else if (e.button === 2) {
	    e.preventDefault();
	    node = this.root.clicked(
	      this.translateClickX(e.clientX), this.translateClickY(e.clientY)
	    );
	    this.contextMenu.open(e.clientX, e.clientY, node);
	    this.contextMenu.closed = false;
	    this.tooltip.close();
	  }
	};

	Tree.prototype.dblclicked = function (e) {
	  if (!this.root) return false;
	  var nd = this.root.clicked(this.translateClickX(e.clientX * 1.0), this.translateClickY(e.clientY * 1.0));
	  if (nd) {
	    nd.setSelected(false, true);
	    nd.toggleCollapsed();
	  }

	  if (!this.pickedup) {
	    this.dragging = false;
	  }
	  this.draw();
	};

	Tree.prototype.displayLabels = function () {
	  this.showLabels = true;
	  this.draw();
	};

	Tree.prototype.drag = function (event) {
	  // get window ratio
	  var ratio = (window.devicePixelRatio || 1) / getBackingStorePixelRatio(this.canvas);

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
	    var nd = this.root.clicked(this.translateClickX(e.clientX * 1.0), this.translateClickY(e.clientY * 1.0));

	    if (nd && (this.internalNodesSelectable || nd.leaf)) {
	      this.root.setHighlighted(false);
	      nd.setHighlighted(true);
	      // For mouseover tooltip to show no. of children on the internal nodes
	      if (!nd.leaf && this.contextMenu.closed) {
	        this.tooltip.open(e.clientX, e.clientY, nd);
	      }
	    } else {
	      this.tooltip.close();
	      this.contextMenu.close();
	      this.root.setHighlighted(false);
	    }
	    this.draw();
	  }
	};

	/**
	 * Draw the frame
	 */
	Tree.prototype.draw = function (forceRedraw) {
	  this.selectedNodes = [];

	  if (this.maxBranchLength === 0) {
	    this.loadError('All branches in the tree are identical.');
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
	    this.prerenderers[this.treeType](this);
	    if (!forceRedraw) { this.fitInPanel(); }
	  }

	  this.canvas.lineWidth = this.lineWidth / this.zoom;
	  this.canvas.translate(this.offsetx, this.offsety);
	  this.canvas.scale(this.zoom, this.zoom);

	  this.branchRenderers[this.treeType](this, this.root);
	  // Making default collapsed false so that it will collapse on initial load only
	  this.defaultCollapsed = false;
	  this.metadataHeadingDrawn = false;
	  this.drawn = true;
	};

	Tree.prototype.drop = function () {
	  if (!this.drawn) return false;
	  this.pickedup = false;
	  this.zoomPickedUp = false;
	};

	Tree.prototype.findBranch = function (patt) {
	  this.root.setSelected(false, true);
	  for (var i = 0; i < this.leaves.length; i++) {
	    if (this.leaves[i].id.match(new RegExp(patt, 'i'))) {
	      this.leaves[i].setSelected(true, true);
	    }
	  }
	  this.draw();
	};

	Tree.prototype.clearSelect = function () {
	  this.root.setSelected(false, true);
	  this.draw();
	};

	Tree.prototype.genId = function () {
	  return 'pcn' + this.lastId++;
	};

	Tree.prototype.getPngUrl = function () {
	  return this.canvas.canvas.toDataURL();
	};

	Tree.prototype.hideLabels = function () {
	  this.showLabels = false;
	  this.draw();
	};

	Tree.prototype.dangerouslySetData = function (treeData) {
	  this.parseNwk(treeData, null);
	  this.draw();
	  this.loadCompleted();
	};

	Tree.prototype.load = function (tree, name, format) {
	  if (format) {
	    if (format.match(/nexus/i)) {
	      if (tree.match(/\.\w+$/)) {
	        this.AJAX(tree, 'GET', '', this.loadFileCallback, { format: 'nexus', name: name }, this);
	      } else {
	        this.parseNexus(tree, name);
	      }
	    } else if (format.match(/newick/i)) {
	      if (tree.match(/\.\w+$/)) {
	        this.AJAX(tree, 'GET', '', this.loadFileCallback, { format: 'newick' }, this);
	      } else {
	        this.parseNwk(tree, name);
	      }
	    }
	  } else {
	    if (tree.match(/\.n(ex|xs)$/)) {
	      this.AJAX(tree, 'GET', '', this.loadFileCallback, { format: 'nexus', name: name }, this);
	    } else if (tree.match(/\.nwk$/)) {
	      this.AJAX(tree, 'GET', '', this.loadFileCallback, { format: 'newick' }, this);
	    } else if (tree.match(/^#NEXUS[\s\n;\w\W\.\*\:(\),-=\[\]\/&]+$/i)) {
	      this.parseNexus(tree, name);
	      this.draw();
	      this.loadCompleted();
	    } else if (tree.match(/^[\w\W\.\*\:(\),-\/]+;\s?$/gi)) {
	      this.parseNwk(tree, name);
	      this.draw();
	      this.loadCompleted();
	    } else {
	      this.loadError('PhyloCanvas did not recognise the string as a file or a newick or Nexus format string');
	    }
	  }
	};

	Tree.prototype.loadFileCallback = function (response, opts, scope) {
	  if (opts.format.match(/nexus/i)) {
	    scope.parseNexus(response.responseText, opts.name);
	  } else if (opts.format.match(/newick/i)) {
	    scope.parseNwk(response.responseText);
	  } else {
	    throw new Error('file type not recognised by PhyloCanvas');
	  }
	  scope.draw();
	  scope.loadCompleted();
	};

	Tree.prototype.nodePrerenderers = {
	  radial: function (tree, node) {
	    if (node.parent) {
	      node.startx = node.parent.centerx;
	      node.starty = node.parent.centery;
	    } else {
	      node.startx = 0;
	      node.starty = 0;
	    }
	    node.centerx = node.startx + (node.branchLength * tree.branchScalar * Math.cos(node.angle));
	    node.centery = node.starty + (node.branchLength * tree.branchScalar * Math.sin(node.angle));

	    for (var i = 0; i < node.children.length; i++) {
	      this.radial(tree, node.children[i]);
	    }
	  }
	};

	Tree.prototype.nodeRenderers = {
	  circle: function (node) {
	    var r = node.getNodeSize();
	    node.canvas.arc(r, 0, r, 0, Angles.FULL, false);
	    node.canvas.stroke();
	    node.canvas.fill();
	  },
	  square: function (node) {
	    var r = node.getNodeSize();
	    var x1 = 0;
	    var x2 = r * 2;
	    var y1 = -r;
	    var y2 = r;
	    node.canvas.moveTo(x1, y1);
	    node.canvas.lineTo(x1, y2);
	    node.canvas.lineTo(x2, y2);
	    node.canvas.lineTo(x2, y1);
	    node.canvas.lineTo(x1, y1);
	    node.canvas.stroke();
	    node.canvas.fill();
	  },
	  star: function (node) {
	    var r = node.getNodeSize();
	    var cx = r;
	    var cy = 0;
	    var spikes = 6;
	    var outerRadius = r * 1.6;
	    var innerRadius = r;
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
	  triangle: function (node) {
	    var r = node.getNodeSize();
	    var cx = r;
	    var cy = 0;
	    var x1 = cx - r;
	    var x2 = cx + r;
	    var y1 = cy - r;
	    var y2 = cy + r;

	    node.canvas.moveTo(x2, y1);
	    node.canvas.lineTo(x2, y2);
	    node.canvas.lineTo(x1, (y2+y1)/2);
	    node.canvas.lineTo(x2, y1);

	    node.canvas.stroke();
	    node.canvas.fill();
	  }
	};

	Tree.prototype.parseNexus = function (str, name) {
	  if (!str.match(/BEGIN TREES/gi)) {
	    throw 'The nexus file does not contain a tree block';
	  }

	  //Get everything between BEGIN TREES and next END;
	  var treeSection = str.match(/BEGIN TREES;[\S\s]+END;/i)[0].replace(/BEGIN TREES;\n/i, '').replace(/END;/i, '');
	  //get translate section

	  var leafNameObject = {};
	  var translateSection = treeSection.match(/TRANSLATE[^;]+;/i);
	  if (translateSection && translateSection.length) {
	    translateSection = translateSection[0];
	    //remove translate section from tree section
	    treeSection = treeSection.replace(translateSection, '');

	    //parse translate section into kv pairs
	    translateSection = translateSection.replace(/translate|;/gi, '');

	    var tIntArr = translateSection.split(',');
	    var ia;
	    for (var i = 0; i < tIntArr.length; i++) {
	      ia = tIntArr[i].trim().replace('\n', '').split(' ');
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
	      name = s.trim().match(/^\w+/)[0]
	    }
	    trees[name] = s.trim().match(/[\S]*$/)[0];
	  }
	  if (!trees[name]) throw 'tree ' + name + ' does not exist in this NEXUS file';

	  this.parseNwk(trees[name].trim());
	  // translate in accordance with translate block
	  if (leafNameObject) {
	    for (var n in leafNameObject) {
	      var b = this.branches[n];
	      delete this.branches[n];
	      b.id = leafNameObject[n];
	      this.branches[b.id] = b;
	    }
	  }
	};

	Tree.prototype.parseNwk = function (nwk) {
	  this.origBranches = false;
	  this.origLeaves = false;
	  this.origRoot = false;
	  this.origBL = {};
	  this.origP = {};

	  this.root = false;
	  this.leaves = [];
	  this.branches = {};
	  this.drawn = false;
	  var curNode = new Branch();
	  curNode.id = 'root';
	  this.branches.root = curNode;
	  this.setRoot(curNode);

	  for (var i = 0; i < nwk.length; i++) {
	    var node;
	    switch (nwk[i]) {
	      case '(': // new Child
	        node = new Branch();
	        curNode.addChild(node);
	        curNode = node;
	        break;
	      case ')': // return to parent
	        curNode = curNode.parent;
	        break;
	      case ',': // new sibiling
	        node = new Branch();
	        curNode.parent.addChild(node);
	        curNode = node;
	        break;
	      case ';':
	        for (var l = 0; l < this.leaves.length; l++) {
	          if (this.leaves[l].totalBranchLength > this.maxBranchLength) {
	            this.maxBranchLength = this.leaves[l].totalBranchLength;
	          }
	        }
	        break;
	      default:
	        try {
	          i = curNode.parseNwk(nwk, i);
	          i--;
	        } catch (e) {
	          this.loadError('Error parsing nwk file' + e);
	          return;
	        }
	        break;
	    }
	  }

	  this.saveNode(this.root);
	  this.root.saveChildren();

	  this.root.branchLength = 0;
	  this.maxBranchLength = 0;
	  this.root.setTotalLength();

	  if (this.maxBranchLength === 0) {
	    this.loadError('All branches in the tree are identical.');
	    return;
	  }

	  this.buildLeaves();

	  this.loadCompleted();
	};

	Tree.prototype.pickup = function (event) {
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
	};

	Tree.prototype.prerenderers = {
	  rectangular: function (tree, forcedDraw) {
	    tree.root.startx = 0;
	    tree.root.starty = 0;
	    tree.root.centerx = 0;
	    tree.root.centery = 0;
	    tree.farthestNodeFromRootX = 0;
	    tree.farthestNodeFromRootY = 0;

	    // Calculate branchScalar based on canvas width and total branch length
	    // This is used to transform the X coordinate based on the canvas width and no. of branches
	    tree.branchScalar = tree.canvas.canvas.width / tree.maxBranchLength;
	    // ystep is the vertical distance between 2 nodes
	    var ystep = Math.max(tree.canvas.canvas.height / (tree.leaves.length + 2), (tree.leaves[0].getNodeSize() + 2) * 2);

	    //set initial positons of the branches
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
	    // Assign root startx and starty
	    tree.root.startx = tree.root.centerx;
	    tree.root.starty = tree.root.centery;
	    // Set font size for tree and its branches
	    tree.setFontSize(ystep);
	    tree.setMaxLabelLength();
	  },
	  circular: function (tree) {
	    tree.root.startx = 0;
	    tree.root.starty = 0;
	    tree.root.centerx = 0;
	    tree.root.centery = 0;

	    tree.branchScalar = Math.min(tree.canvas.canvas.width, tree.canvas.canvas.height) / tree.maxBranchLength;
	    // work out radius of tree and the make branch scalar proportinal to the
	    var r = (tree.leaves.length * tree.leaves[0].getNodeSize() * 2) / Angles.FULL;
	    if (tree.branchScalar * tree.maxBranchLength > r) {
	      r = tree.branchScalar * tree.maxBranchLength;
	    } else {
	      tree.branchScalar = r / tree.maxBranchLength;
	    }

	    var step = Angles.FULL / tree.leaves.length;

	    for (var i = 0; i < tree.leaves.length; i++) {
	      tree.leaves[i].angle = step * i;
	      tree.leaves[i].centery = r * Math.sin(tree.leaves[i].angle);
	      tree.leaves[i].centerx = r * Math.cos(tree.leaves[i].angle);
	      tree.leaves[i].starty = ((tree.leaves[i].parent.totalBranchLength * tree.branchScalar)) * Math.sin(tree.leaves[i].angle);
	      tree.leaves[i].startx = ((tree.leaves[i].parent.totalBranchLength * tree.branchScalar)) * Math.cos(tree.leaves[i].angle);
	      tree.leaves[i].intery = ((tree.leaves[i].totalBranchLength * tree.branchScalar)) * Math.sin(tree.leaves[i].angle);
	      tree.leaves[i].interx = ((tree.leaves[i].totalBranchLength * tree.branchScalar)) * Math.cos(tree.leaves[i].angle);
	      for (var nd = tree.leaves[i]; nd.parent; nd = nd.parent) {
	        if (nd.getChildNo() == 0) {
	          nd.parent.angle = nd.angle;
	          nd.parent.minChildAngle = nd.angle;
	        }
	        if (nd.getChildNo() == nd.parent.children.length - 1) {
	          nd.parent.maxChildAngle = nd.angle;
	          nd.parent.angle = (nd.parent.minChildAngle + nd.parent.maxChildAngle) / 2;
	          nd.parent.centery = (nd.parent.totalBranchLength * tree.branchScalar) * Math.sin(nd.parent.angle);
	          nd.parent.centerx = (nd.parent.totalBranchLength * tree.branchScalar) * Math.cos(nd.parent.angle);
	          nd.parent.starty = ((nd.parent.totalBranchLength - nd.parent.branchLength) * tree.branchScalar) * Math.sin(nd.parent.angle);
	          nd.parent.startx = ((nd.parent.totalBranchLength - nd.parent.branchLength) * tree.branchScalar) * Math.cos(nd.parent.angle);
	        } else {
	          break;
	        }
	      }
	    }
	    // Assign root startx and starty
	    tree.root.startx = tree.root.centerx;
	    tree.root.starty = tree.root.centery;
	    // Set font size for tree and its branches
	    tree.setFontSize(step);
	    tree.setMaxLabelLength();
	  },
	  radial: function (tree, forcedDraw) {
	    tree.branchScalar = Math.min(tree.canvas.canvas.width, tree.canvas.canvas.height) / tree.maxBranchLength;

	    var step = Angles.FULL / tree.leaves.length;
	    tree.root.startx = 0;
	    tree.root.starty = 0;
	    tree.root.centerx = 0;
	    tree.root.centery = 0;

	    for (var i = 0.0; i < tree.leaves.length; i += 1.0) {
	      tree.leaves[i].angle = step * i;
	      tree.leaves[i].centerx = tree.leaves[i].totalBranchLength * tree.branchScalar * Math.cos(tree.leaves[i].angle);
	      tree.leaves[i].centery = tree.leaves[i].totalBranchLength * tree.branchScalar * Math.sin(tree.leaves[i].angle);

	      for (var nd = tree.leaves[i]; nd.parent; nd = nd.parent) {
	        if (nd.getChildNo() == 0) {
	          nd.parent.angle = 0;
	        }
	        nd.parent.angle += (nd.angle * nd.getChildCount());
	        if (nd.getChildNo() == nd.parent.children.length - 1) {
	          nd.parent.angle = nd.parent.angle / nd.parent.getChildCount();
	        } else {
	          break;
	        }
	      }
	    }
	    // Assign root startx and starty
	    tree.root.startx = tree.root.centerx;
	    tree.root.starty = tree.root.centery;
	    tree.nodePrerenderers.radial(tree, tree.root);
	    // Set font size for tree and its branches
	    tree.setFontSize(step);
	    tree.setMaxLabelLength();
	  },
	  diagonal: function (tree, forceRender) {
	    var ystep = Math.max(tree.canvas.canvas.height / (tree.leaves.length + 2), (tree.leaves[0].getNodeSize() + 2) * 2);
	    tree.root.startx = 0;
	    tree.root.starty = 0;
	    tree.root.centerx = 0;
	    tree.root.centery = 0;

	    for (var i = 0; i < tree.leaves.length; i++) {
	      tree.leaves[i].centerx = 0;
	      tree.leaves[i].centery = (i > 0 ? tree.leaves[i - 1].centery + ystep : 0);
	      tree.leaves[i].angle = 0;

	      for (var nd = tree.leaves[i]; nd.parent; nd = nd.parent) {
	        if (nd.getChildNo() == nd.parent.children.length - 1) {
	          nd.parent.centery = nd.parent.getChildYTotal() / nd.parent.getChildCount(); // (nd.parent.children.length - 1);
	          nd.parent.centerx = nd.parent.children[0].centerx + ((nd.parent.children[0].centery - nd.parent.centery) * Math.tan(Angles.FORTYFIVE));
	          for (var j = 0; j < nd.parent.children.length; j++) {
	            nd.parent.children[j].startx = nd.parent.centerx;
	            nd.parent.children[j].starty = nd.parent.centery;
	          }
	        } else {
	          break;
	        }
	      }
	    }
	    // Assign root startx and starty
	    tree.root.startx = tree.root.centerx;
	    tree.root.starty = tree.root.centery;
	    // Set font size for tree and its branches
	    tree.setFontSize(ystep);
	    tree.setMaxLabelLength();
	  },
	  hierarchy: function (tree) {
	    tree.root.startx = 0;
	    tree.root.starty = 0;
	    tree.root.centerx = 0;
	    tree.root.centery = 0;
	    tree.farthestNodeFromRootX = 0;
	    tree.farthestNodeFromRootY = 0;

	    tree.branchScalar = tree.canvas.canvas.height / tree.maxBranchLength;
	    var xstep = Math.max(tree.canvas.canvas.width / (tree.leaves.length + 2),
	                    (tree.leaves[0].getNodeSize() + 2) * 2);

	    for (var i = 0; i < tree.leaves.length; i++) {
	      tree.leaves[i].angle = Angles.QUARTER;
	      tree.leaves[i].centerx = (i > 0 ? tree.leaves[i - 1].centerx + xstep : 0);
	      tree.leaves[i].centery = tree.leaves[i].totalBranchLength * tree.branchScalar;

	      for (var nd = tree.leaves[i]; nd.parent; nd = nd.parent) {
	        if (nd.getChildNo() == 0) {
	          nd.parent.centerx = nd.centerx;
	        }

	        if (nd.getChildNo() == nd.parent.children.length - 1) {
	          nd.parent.angle = Angles.QUARTER;
	          nd.parent.centerx = (nd.parent.centerx + nd.centerx) / 2;
	          nd.parent.centery = nd.parent.totalBranchLength * tree.branchScalar;
	          for (var j = 0; j < nd.parent.children.length; j++) {
	            nd.parent.children[j].startx = nd.parent.centerx;
	            nd.parent.children[j].starty = nd.parent.centery;
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
	    // Assign root startx and starty
	    tree.root.startx = tree.root.centerx;
	    tree.root.starty = tree.root.centery;
	    // Set font size for tree and its branches
	    tree.setFontSize(xstep);
	    tree.setMaxLabelLength();
	  }
	};

	Tree.prototype.redrawGetNodes = function (node, leafIds) {
	  for (var i = 0; i < node.children.length; i++) {
	    this.branches[node.children[i].id] = node.children[i];
	    if (node.children[i].leaf) {
	      leafIds.push(node.children[i].id);
	      this.leaves.push(node.children[i]);
	    } else {
	      this.redrawGetNodes(node.children[i], leafIds);
	    }
	  }
	};

	Tree.prototype.redrawFromBranch = function (node) {
	  this.drawn = false;
	  this.totalBranchLength = 0;

	  this.resetTree();

	  this.origBL[node.id] = node.branchLength;
	  this.origP[node.id] = node.parent;

	  this.root = node;
	  this.root.branchLength = 0;
	  this.root.parent = false;

	  this.branches = {};
	  this.leaves = [];
	  var leafIds = [];

	  for (var i = 0; i < this.root.children.length; i++) {
	    this.branches[this.root.children[i].id] = this.root.children[i];
	    if (this.root.children[i].leaf) {
	      this.leaves.push(this.root.children[i]);
	      leafIds.push(this.root.children[i].id);
	    } else {
	      this.redrawGetNodes(this.root.children[i], leafIds);
	    }
	  }

	  this.root.setTotalLength();
	  this.prerenderers[this.treeType](this);
	  this.draw();
	  this.subtreeDrawn(node.id);
	};

	Tree.prototype.redrawOriginalTree = function () {
	  this.drawn = false;
	  this.resetTree();

	  this.root.setTotalLength();
	  this.prerenderers[this.treeType](this);
	  this.draw();

	  this.subtreeDrawn(this.root.id);
	};

	Tree.prototype.saveNode = function (node) {
	  if (!node.id || node.id === '') {
	    node.id = node.tree.genId();
	  }
	  if (this.branches[node.id]) {
	    if (node !== this.branches[node.id]) {
	      if (!this.leaf) {
	        node.id = this.genId();
	        this.branches[node.id] = node;
	      } else {
	        throw 'Two nodes on this tree share the id ' + node.id;
	      }
	    }
	  } else {
	    this.branches[node.id] = node;
	  }
	};

	Tree.prototype.scroll = function (e) {
	  var z = Math.log(this.zoom) / Math.log(10);
	  this.setZoom(z + (e.detail < 0 || e.wheelDelta > 0 ? 0.12 : -0.12));
	  e.preventDefault();
	};

	Tree.prototype.selectNodes = function (nIds) {
	  var ns = nIds;
	  var node;
	  var nodeId;
	  var index;

	  if (this.root) {
	    this.root.setSelected(false, true);
	    if (typeof nIds === 'string') {
	      ns = ns.split(',');
	    }
	    for (nodeId in this.branches) {
	      if (this.branches.hasOwnProperty(nodeId)) {
	        node = this.branches[nodeId];
	        for (index = 0; index < ns.length; index++) {
	          if (ns[index] === node.id) {
	            node.setSelected(true, true);
	          }
	        }
	      }
	    }
	    this.draw();
	  }
	};

	Tree.prototype.setFont = function (font) {
	  if (isNaN(font)) {
	    this.font = font;
	    this.draw();
	  }
	};

	Tree.prototype.setNodeColourAndShape = function (nids, colour, shape, size, waiting) {
	  if (!nids) return;

	  if (this.drawn) {
	    var arr = [];
	    if (typeof nids === 'string') {
	      arr = nids.split(',');
	    } else {
	      arr = nids;
	    }

	    if (nids !== '') {
	      for (var i = 0; i <  arr.length; i++) {
	        if (this.branches[arr[i]]) {
	          if (colour) {
	            this.branches[arr[i]].colour = colour;
	          }
	          if (shape) {
	            this.branches[arr[i]].nodeShape = Shapes[shape] ? Shapes[shape] : shape;
	          }
	          if (size) {
	            this.branches[arr[i]].radius = size;
	          }
	        }
	      }
	      this.draw();
	    }
	  } else if (!waiting) {
	    var _this = this;
	    var timeout = setInterval(function () {
	      if (this.drawn) {
	        _this.setNodeColourAndShape(nids, colour, shape, size, true);
	        clearInterval(timeout);
	      }
	    });
	  }
	};

	Tree.prototype.setNodeSize = function (size) {
	  this.baseNodeSize = Number(size);
	  this.draw();
	};

	Tree.prototype.setRoot = function (node) {
	  node.canvas = this.canvas;
	  node.tree = this;
	  this.root = node;
	};

	Tree.prototype.setTextSize = function (size) {
	  this.textSize = Number(size);
	  this.draw();
	};

	Tree.prototype.setFontSize = function (ystep) {
	  // Setting tree text size
	  if (this.treeType === 'circular') {
	    this.textSize = Math.min((ystep * 100) + 5, 40);
	  } else if (this.treeType === 'radial') {
	    this.textSize = Math.min((ystep * 50) + 5, 20);
	  } else if (this.treeType === 'diagonal') {
	    this.textSize = Math.min((ystep / 2), 10);
	  } else {
	    this.textSize = Math.min((ystep / 2), 15);
	  }
	  this.canvas.font = this.textSize + 'pt ' + this.font;
	};

	Tree.prototype.setTreeType = function (type) {
	  var oldType = this.treeType;
	  this.treeType = type;
	  if (this.drawn) {
	    this.drawn = false;
	    this.draw();
	  }
	  this.treeTypeChanged(oldType, type);
	};

	Tree.prototype.setSize = function (width, height) {
	  this.canvas.canvas.width = width;
	  this.canvas.canvas.height = height;
	  if (this.navigator) {
	    this.navigator.resize();
	  }
	  this.adjustForPixelRatio();
	  if (this.drawn) {
	    this.draw();
	  }
	};

	Tree.prototype.setZoom = function (z) {
	  if (z > -2 && z < 2) {
	    var oz = this.zoom;
	    this.zoom = Math.pow(10, z);

	    this.offsetx = (this.offsetx / oz) * this.zoom;
	    this.offsety = (this.offsety / oz) * this.zoom;

	    this.draw();
	  }
	};

	Tree.prototype.toggleLabels = function () {
	  this.showLabels = !this.showLabels;
	  this.draw();
	};

	Tree.prototype.translateClickX = function (x) {
	  var ratio = (window.devicePixelRatio || 1) / getBackingStorePixelRatio(this.canvas);

	  x = (x - getX(this.canvas.canvas) + window.pageXOffset);
	  x *= ratio;
	  x -= this.canvas.canvas.width / 2;
	  x -= this.offsetx;
	  x = x / this.zoom;

	  return x;
	};

	Tree.prototype.translateClickY = function (y) {
	  var ratio = (window.devicePixelRatio || 1) / getBackingStorePixelRatio(this.canvas);

	  y = (y - getY(this.canvas.canvas) + window.pageYOffset); // account for positioning and scroll
	  y *= ratio;
	  y -= this.canvas.canvas.height / 2;
	  y -= this.offsety;
	  y = y / this.zoom;

	  return y;
	};

	Tree.prototype.viewMetadataColumns = function (metadataColumnArray) {
	  this.showMetadata = true;
	  if (metadataColumnArray === undefined) {
	    // Select all column headings so that it will draw all columns
	    metadataColumnArray = this.getMetadataColumnHeadings();
	  }
	  // If argument missing or no key id matching, then this array would be undefined
	  if (metadataColumnArray !== undefined) {
	    this.selectedMetadataColumns = metadataColumnArray;
	  }
	  // Fit to canvas window
	  this.fitInPanel();
	  this.draw();
	};

	Tree.prototype.getMetadataColumnHeadings = function () {
	  var metadataColumnArray = [];
	  for (var i = 0; i < this.leaves.length; i++) {
	    if (Object.keys(this.leaves[i].data).length > 0) {
	      metadataColumnArray = Object.keys(this.leaves[i].data);
	      break;
	    }
	  }
	  return metadataColumnArray;
	};

	Tree.prototype.clearMetadata = function () {
	  for (var i = 0; i < this.leaves.length; i++) {
	    if (Object.keys(this.leaves[i].data).length > 0) {
	      this.leaves[i].data = {};
	    }
	  }
	};

	Tree.prototype.setMaxLabelLength = function () {
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
	};


	Tree.prototype.loadCompleted = function () {
	  fireEvent(this.canvasEl, 'loaded');
	};

	Tree.prototype.loadStarted = function () {
	  fireEvent(this.canvasEl, 'loading');
	};

	Tree.prototype.loadError = function (message) {
	  fireEvent(this.canvasEl, 'error', { message: message });
	};

	Tree.prototype.subtreeDrawn = function (node) {
	  fireEvent(this.canvasEl, 'subtree', { node: node });
	};

	Tree.prototype.nodesSelected = function (nids) {
	  fireEvent(this.canvasEl, 'selected', { nodeIds: nids });
	};

	Tree.prototype.addListener = function (event, listener) {
	  addEvent(this.canvasEl, event, listener);
	};

	Tree.prototype.getBounds = function () {
	  var minx = this.root.startx;
	  var maxx = this.root.startx;
	  var miny = this.root.starty;
	  var maxy = this.root.starty;

	  for (var i = this.leaves.length; i--;) {
	    var x = this.leaves[i].centerx;
	    var y = this.leaves[i].centery;
	    var theta = this.leaves[i].angle;
	    var pad = this.leaves[i].getNodeSize()
	              + (this.showLabels ? this.maxLabelLength[this.treeType] + this.leaves[i].getLabelSize() : 0)
	              + (this.showMetadata ?  this.getMetadataColumnHeadings().length * this.metadataXStep : 0);

	    x = x + (pad * Math.cos(theta));
	    y = y + (pad * Math.sin(theta));

	    minx = Math.min(minx, x);
	    maxx = Math.max(maxx, x);
	    miny = Math.min(miny, y);
	    maxy = Math.max(maxy, y);
	  }
	  return [ [ minx, miny ], [ maxx, maxy ] ];
	};

	Tree.prototype.fitInPanel = function () {
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
	};

	Tree.prototype.on = Tree.prototype.addListener;

	Tree.prototype.adjustForPixelRatio = function () {
	  // Adjust canvas size for Retina screen
	  var ratio = (window.devicePixelRatio || 1) / getBackingStorePixelRatio(this.canvas);

	  this.canvas.canvas.style.height = this.canvas.canvas.height + 'px';
	  this.canvas.canvas.style.width = this.canvas.canvas.width + 'px';

	  if (ratio > 1) {
	    this.canvas.canvas.width *= ratio;
	    this.canvas.canvas.height *= ratio;
	  }
	};

	Tree.prototype.treeTypeChanged = function (oldType, newType) {
	  fireEvent(this.canvasEl, 'typechanged', { oldType: oldType, newType: newType });
	};

	Tree.prototype.resetTree = function () {
	  if (!this.origBranches) return;

	  this.branches = this.origBranches;
	  for (var n in this.origBL) {
	    this.branches[n].branchLength = this.origBL[n];
	    this.branches[n].parent = this.origP[n];
	  }

	  this.leaves = this.origLeaves;
	  this.root = this.origRoot;
	};

	Tree.prototype.rotateBranch = function (branch) {
	  this.branches[branch.id].rotate();
	};

	Tree.prototype.buildLeaves = function () {
	  this.leaves = [];

	  var leafIds = this.root.getChildIds();

	  for (var i = 0; i < leafIds.length; i++) {
	    this.leaves.push(this.branches[leafIds[i]]);
	  }
	};

	Tree.prototype.exportNwk = function () {
	  var nwk = this.root.getNwk();
	  return nwk.substr(0, nwk.lastIndexOf(')') + 1) + ';';
	};

	Tree.prototype.resizeToContainer = function () {
	  this.setSize(this.canvasEl.offsetWidth, this.canvasEl.offsetHeight);
	  this.draw();
	  this.history.resizeTree();
	};

	Tree.prototype.downloadAllLeafIds = function () {
	  this.root.downloadLeafIdsFromBranch();
	};

	Tree.prototype.exportCurrentTreeView = function () {
	  var dataUrl = this.getPngUrl();
	  var anchor = document.createElement('a');
	  var isDownloadSupported = (typeof anchor.download !== 'undefined');
	  var event = document.createEvent('Event');

	  anchor.href = dataUrl;
	  anchor.target = '_blank';

	  if (isDownloadSupported) {
	    anchor.download = 'phylocanvas.png';
	  }

	  event.initEvent('click', true, true);
	  anchor.dispatchEvent(event);

	  if (isDownloadSupported) {
	    (window.URL || window.webkitURL).revokeObjectURL(anchor.href);
	  }
	};

	module.exports = Tree;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Angles = __webpack_require__(5).Angles;
	var Shapes = __webpack_require__(5).Shapes;
	var setupDownloadLink = __webpack_require__(2).setupDownloadLink;

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
	    } else if (this.tree.treeType === 'hierarchy') {
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
	    if (this.angle > Angles.QUARTER &&
	        this.angle < (Angles.HALF + Angles.QUARTER)) {
	      this.canvas.rotate(Angles.HALF);
	      tx = -tx - (padMaxLabelWidth);
	      // Changing the xStep for radial and circular tree
	      metadataXStep = -metadataXStep;
	    }

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
	    } else if (this.tree.treeType === 'hierarchy') {
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
	  // Setting 'tx' for rectangular and hierarchy trees if node align is TRUE
	  if (this.tree.nodeAlign) {
	    if (this.tree.treeType === 'rectangular') {
	      tx += (this.tree.farthestNodeFromRootX - this.centerx);
	    } else if (this.tree.treeType === 'hierarchy') {
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
	};

	Branch.prototype.setNodeDimensions = function (centerX, centerY, radius) {
	  this.minx = centerX - radius;
	  this.maxx = centerX + radius;
	  this.miny = centerY - radius;
	  this.maxy = centerY + radius;
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
	  if ((nodeRadius * this.tree.zoom) < 5 || !this.leaf) {
	    this.setNodeDimensions(centerX, centerY, 5 / this.tree.zoom);
	  } else {
	    this.setNodeDimensions(centerX, centerY, nodeRadius);
	  }

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
	    // Store line width for swapping back after drawing lines for aligning
	    var origLineWidth = this.canvas.lineWidth;
	    // Drawing line connectors to nodes and align all the nodes vertically
	    if (this.tree.nodeAlign) {
	      this.canvas.lineWidth = this.canvas.lineWidth / 10;
	      this.canvas.beginPath();
	      // Draw line till the x position of the right-end node
	      if (this.tree.treeType === 'rectangular') {
	        this.canvas.moveTo(this.tree.farthestNodeFromRootX, (this.centery));
	      }
	      if (this.tree.treeType === 'hierarchy') {
	        this.canvas.moveTo(this.centerx, this.tree.farthestNodeFromRootY);
	      }
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
	    this.tree.nodeRenderers[this.nodeShape](this);

	    if (this.tree.showLabels || (this.tree.hoverLabel && this.highlighted)) {
	      this.drawLabel();
	    }

	    if (this.tree.showMetadata) {
	      this.drawMetadata();
	    }
	    // Restore the canvas position to original
	    this.canvas.restore();

	    // Swapping back the line width if it was changed due to nodeAlign
	    this.canvas.lineWidth = origLineWidth;
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

	Branch.prototype.parseNwk = function (nwk, idx) {
	  var idx = this.parseLabel(nwk, idx);
	  if (nwk[idx] === ':') {
	    idx = this.parseNodeLength(nwk, idx + 1);
	  } else {
	    this.branchLength = 0;
	  }
	  if (!this.id || this.id === '') {
	    this.id = this.tree.genId();
	  }
	  return idx;
	};


	Branch.prototype.parseLabel = function (nwk, idx) {
	  var lbl = '';
	  var bits;
	  var b;

	  for (idx; nwk[idx] !== ':' && nwk[idx] !== ',' && nwk[idx] !== ')' && idx < nwk.length; idx++) {
	    lbl += nwk[idx];
	  }
	  if (!lbl) return idx;
	  if (lbl.match(/\*/)) {
	    bits = lbl.split('**');
	    this.id = bits[0];
	    if (bits.length === 1) return idx;
	    bits = bits[1].split('*');

	    for (b = 0; b < bits.length; b += 2) {
	      // TODO: Define default case
	      switch (bits[b]) {
	        case 'nsz' :
	          this.radius = window.parseInt(bits[b + 1]);
	          break;
	        case 'nsh' :
	          if (Shapes[bits[b + 1]]) {
	            this.nodeShape = Shapes[bits[b + 1]];
	          } else if (this.nodeRenderers[bits[b + 1]]) {
	            this.nodeShape = bits[b + 1];
	          } else {
	            this.nodeShape = 'circle';
	          }
	          break;
	        case 'ncol' : this.colour = bits[b + 1];
	          var hexRed = '0x' + this.colour.substring(0, 2);
	          var hexGreen = '0x' + this.colour.substring(2, 4);
	          var hexBlue = '0x' + this.colour.substring(4, 6);
	          this.colour =
	            'rgba(' +
	              parseInt(hexRed, 16).toString() + ',' +
	              parseInt(hexGreen, 16).toString() + ',' +
	              parseInt(hexBlue, 16).toString() +
	            ',1)';
	          break;
	      }
	    }
	  } else {
	    this.id = lbl;
	  }
	  return idx;
	};

	Branch.prototype.parseNodeLength = function (nwk, idx) {
	  var str = '';
	  for (idx; nwk[idx] !== ')' && nwk[idx] !== ','; idx++) {
	    str += nwk[idx];
	  }
	  this.branchLength = parseFloat(str);
	  if (this.branchLength < 0) {
	    this.branchLength = 0;
	  }
	  return idx;
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
	    (this.label !== undefined && this.label !== null) ? this.label : this.id
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
	  var downloadData;
	  var childIds = this.getChildIds();
	  downloadData = childIds.join('\n');
	  setupDownloadLink(downloadData, 'pc_leaves.txt');
	};

	module.exports = Branch;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * An enumeration of certain pre-defined angles to enable faster drawing of
	 * trees. There are FORTYFIVE, QUARTER, HALF and FULL. Values are all radians.
	 *
	 * @enum
	 * @memberof PhyloCanvas
	 * @constant
	 */
	module.exports.Angles = {
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
	 * dictionary to translate annotations in NWK to branch renderer ids
	 *
	 * @enum
	 * @memberof PhyloCanvas
	 * @constant
	 */
	module.exports.Shapes = {
	  x: 'star',
	  s: 'square',
	  o: 'circle',
	  t: 'triangle'
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Tooltip = __webpack_require__(7);

	var createHandler = __webpack_require__(1).createHandler;
	var preventDefault = __webpack_require__(1).preventDefault;

	var DEFAULT_MENU_ITEMS = [ {
	    text: 'Redraw Subtree',
	    handler: 'redrawTreeFromBranch',
	    nodeType: 'internal'
	  }, {
	    text: 'Show Labels',
	    handler: 'displayLabels'
	  }, {
	    text: 'Hide Labels',
	    handler: 'hideLabels'
	  }, {
	    text: 'Collapse/Expand branch',
	    handler: 'toggleCollapsed',
	    nodeType: 'internal'
	  }, {
	    text: 'Rotate Branch',
	    handler: 'rotate',
	    nodeType: 'internal'
	  }, {
	    text: 'Export As Image',
	    handler: 'exportCurrentTreeView'
	  }, {
	    text: 'Download All Leaf IDs',
	    handler: 'downloadAllLeafIds'
	  }, {
	    text: 'Download Branch Leaf IDs',
	    handler: 'downloadLeafIdsFromBranch',
	    nodeType: 'internal'
	  }
	];


	/**
	 * The menu that is shown when the PhyloCanvas widget is right-clicked
	 *
	 * @constructor
	 * @memberOf PhyloCanvas
	 * @extends Tooltip
	 */
	function ContextMenu(tree, menuItems) {
	  Tooltip.call(this, tree, 'pc-context-menu');

	  if (menuItems && menuItems.length) {
	    this.menuItems = menuItems.map(function transferMenuItem(menuItem) {
	      return {
	        handler: menuItem.handler,
	        text: menuItem.text || 'New Menu Item',
	        nodeType: menuItem.nodeType || undefined
	      };
	    });
	  } else {
	    this.menuItems = DEFAULT_MENU_ITEMS;
	  }

	  this.fontSize = '8pt';
	}

	ContextMenu.prototype = Object.create(Tooltip.prototype);

	ContextMenu.prototype.mouseover = function (element) {
	  element.style.backgroundColor = '#E2E3DF';
	};

	ContextMenu.prototype.mouseout = function (element) {
	  element.style.backgroundColor = 'transparent';
	};

	ContextMenu.prototype.click = function () {
	  createHandler(this, 'close');
	};

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

	ContextMenu.prototype.createContent = function (node) {
	  var i;
	  var menuItem;
	  var listElement;
	  var list = document.createElement('ul');

	  list.style.margin = '0';
	  list.style.padding = '0';

	  for (i = 0; i < this.menuItems.length; i++) {
	    menuItem = this.menuItems[i];

	    if (!menuItemApplicable(menuItem, node)) {
	      continue;
	    }

	    listElement = Tooltip.prototype.createElement.call(this, 'li', menuItem.text);
	    listElement.style.listStyle = 'none outside none';

	    if (menuItem.nodeType) {
	      listElement.addEventListener(
	        'click', createHandler(node, menuItem.handler)
	      );
	    } else {
	      listElement.addEventListener(
	        'click', createHandler(this.tree, menuItem.handler)
	      );
	    }
	    listElement.addEventListener('click', this.click);
	    listElement.addEventListener('contextmenu', preventDefault);
	    listElement.addEventListener(
	      'mouseover', createHandler(listElement, this.mouseover)
	    );
	    listElement.addEventListener(
	      'mouseout', createHandler(listElement, this.mouseout)
	    );

	    list.appendChild(listElement);
	  }
	  document.body.addEventListener('click', createHandler(this, 'close'));
	  this.element.appendChild(list);
	};

	module.exports = ContextMenu;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Tooltip
	 *
	 * @constructor
	 * @memberOf PhyloCanvas
	 */
	function Tooltip(tree, className, element) {
	  this.tree = tree;
	  this.element = element || document.createElement('div');
	  this.element.style.display = 'none';
	  this.element.style.position = 'fixed';
	  this.element.style.border = '1px solid #CCCCCC';
	  this.element.style.background = '#FFFFFF';
	  this.element.style.letterSpacing = '0.5px';
	  this.element.className = className || 'pc-tooltip';
	  this.closed = true;

	  this.tree.canvasEl.appendChild(this.element);
	}

	Tooltip.prototype.close = function () {
	  this.element.style.display = 'none';
	  this.closed = true;
	};

	Tooltip.prototype.createElement = function (tagName, textContent) {
	  var element = document.createElement(tagName || 'div');
	  element.style.cursor = 'pointer';
	  element.style.padding = '0.3em 0.5em 0.3em 0.5em';
	  element.style.fontFamily = this.tree.font;
	  element.style.fontSize = this.fontSize || '12pt';
	  element.appendChild(document.createTextNode(textContent));
	  return element;
	};

	/**
	 * Shows number of child nodes by default
	 */
	Tooltip.prototype.createContent = function (node) {
	  this.element.appendChild(
	    this.createElement('div', node.getChildIds().length)
	  );
	};

	Tooltip.prototype.open = function (x, y, node) {
	  while (this.element.hasChildNodes()) {
	    this.element.removeChild(this.element.firstChild);
	  }

	  this.createContent(node);

	  if (x && y) {
	    this.element.style.top = y + 'px';
	    this.element.style.left = x + 'px';
	  } else {
	    this.element.style.top = '100px';
	    this.element.style.left = '100px';
	  }

	  this.element.style.zIndex = 2000;
	  this.element.style.display = 'block';
	  this.element.style.backgroundColor = '#FFFFFF';

	  this.closed = false;
	};

	module.exports = Tooltip;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Overview window
	 *
	 * @constructor
	 * @memberof PhyloCanvas
	 */
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
	      _this.ctx.drawImage(
	        _this.img, -hw, -hh, _this.cel.width, _this.cel.height
	      );
	    };

	    this.baseOffsetx = this.tree.offsetx;
	    this.baseOffsety = this.tree.offsety;
	    this.baseZoom = this.tree.zoom;
	  } else {
	    this.ctx.drawImage(this.img, -hw, -hh, this.cel.width, this.cel.height);
	  }

	  z = 1 / (this.tree.zoom / this.baseZoom);

	  this.ctx.lineWidth = this.ctx.lineWidth / z;

	  this.ctx.translate((this.baseOffsetx - (this.tree.offsetx * z)) * z,
	    (this.baseOffsety - (this.tree.offsety * z)) * z);
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

	/**
	 * Return backing store pixel ratio of context.
	 *
	 * @param context - The rendering context of HTMl5 canvas.
	 *
	 */
	function getBackingStorePixelRatio(context) {
	  return (
	    context.backingStorePixelRatio ||
	    context.webkitBackingStorePixelRatio ||
	    context.mozBackingStorePixelRatio ||
	    context.msBackingStorePixelRatio ||
	    context.oBackingStorePixelRatio ||
	    1
	  );
	}

	module.exports.getBackingStorePixelRatio = getBackingStorePixelRatio;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @constructor
	 * @memberof PhyloCanvas
	 */
	function Loader(div) {
	  this.div = div;
	  this.cl = document.createElement('canvas');
	  this.cl.id = div.id + 'Loader';
	  this.cl.style.position = 'absolute';
	  this.cl.style.backgroundColor = '#FFFFFF';
	  this.cl.style.top = (div.offsetHeight / 4) + 'px';
	  this.cl.style.left = (div.offsetWidth / 4) + 'px';
	  this.cl.height = div.offsetHeight / 2;
	  this.cl.width = div.offsetWidth / 2;
	  this.cl.style.zIndex = '1000';
	  div.appendChild(this.cl);

	  this.ctx = document.getElementById(div.id + 'Loader').getContext('2d');
	  this.drawer = null;
	  this.loaderRadius = null;
	  this.loaderStep = (2 * Math.PI) / 360;

	  this.message = 'Loading ...';
	}

	Loader.prototype.run = function () {
	  var i = 0;
	  var _this = this;
	  this.cl.style.diangle = 'block';
	  this.initLoader();
	  this.drawer = setInterval(function () {
	    _this.drawLoader(i);
	    i++;
	  }, 10);
	};

	Loader.prototype.resize = function () {
	  this.cl.style.top = '2px';
	  this.cl.style.left = '2px';
	  this.cl.height = this.div.offsetHeight * 0.75;
	  this.cl.width = this.div.offsetWidth * 0.75;

	  this.ctx.strokeStyle = 'rgba(180,180,255,1)';
	  this.ctx.fillStyle = 'rgba(180,180,255,1)';
	  this.ctx.lineWidth = 10.0;

	  this.ctx.font = '24px sans-serif';

	  this.ctx.shadowOffsetX = 2.0;
	  this.ctx.shadowOffsetY = 2.0;
	};

	Loader.prototype.initLoader = function () {
	  this.ctx.strokeStyle = 'rgba(180,180,255,1)';
	  this.ctx.fillStyle = 'rgba(180,180,255,1)';
	  this.ctx.lineWidth = 10.0;

	  this.ctx.font = '24px sans-serif';

	  this.ctx.shadowOffsetX = 2.0;
	  this.ctx.shadowOffsetY = 2.0;
	};

	Loader.prototype.drawLoader = function (t) {
	  this.ctx.restore();

	  this.ctx.translate(0, 0);
	  this.loaderRadius = Math.min(
	    this.ctx.canvas.width / 4, this.ctx.canvas.height / 4
	  );

	  this.ctx.save();
	  this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
	  this.ctx.translate(this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);

	  this.ctx.beginPath();
	  this.ctx.arc(
	    0, 0, this.loaderRadius, this.loaderStep * t, this.loaderStep * t + 2
	  );
	  this.ctx.stroke();

	  this.ctx.beginPath();
	  this.ctx.arc(
	    0, 0,
	    this.loaderRadius,
	    this.loaderStep * t + 3,
	    this.loaderStep * t + 5
	  );
	  this.ctx.stroke();
	  this.ctx.fillText(
	    this.message,
	    -(this.ctx.measureText(this.message).width / 2),
	    this.loaderRadius + 50, this.cl.width
	  );
	};

	Loader.prototype.stop = function () {
	  clearInterval(this.drawer);
	  this.cl.style.display = 'none';
	};

	Loader.prototype.fail = function (message) {
	  clearInterval(this.drawer);
	  this.loaderRadius = Math.min(
	    this.ctx.canvas.width / 4,
	    this.ctx.canvas.height / 4
	  );
	  this.ctx.restore();

	  this.ctx.translate(0, 0);
	  this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

	  this.ctx.beginPath();

	  this.ctx.strokeStyle = 'rgba(255,180,180,1)';
	  this.ctx.fillStyle = 'rgba(255,180,180,1)';

	  this.ctx.translate(this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);

	  this.ctx.beginPath();

	  this.ctx.moveTo(0, 0);
	  this.ctx.lineTo(this.loaderRadius, this.loaderRadius);
	  this.ctx.moveTo(0, 0);
	  this.ctx.lineTo(-this.loaderRadius, this.loaderRadius);
	  this.ctx.moveTo(0, 0);
	  this.ctx.lineTo(-this.loaderRadius, -this.loaderRadius);
	  this.ctx.moveTo(0, 0);
	  this.ctx.lineTo(this.loaderRadius, -this.loaderRadius);
	  this.ctx.stroke();

	  this.ctx.fillText(
	    message,
	    -(this.ctx.measureText(message).width / 2),
	    this.loaderRadius + 50,
	    this.loaderRadius * 2
	  );
	};

	module.exports = Loader;


/***/ }
/******/ ])
});
;