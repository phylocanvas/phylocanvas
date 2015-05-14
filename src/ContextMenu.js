var createHandler = require('./utils/events').createHandler;
var preventDefault = require('./utils/events').preventDefault;

/**
 * The menu that is shown when the PhyloCanvas widget is right-clicked
 *
 * @constructor
 * @memberOf PhyloCanvas
 *
 */
function ContextMenu(tree, options) {
  var i;
  var menuItem;

  /**
   * The Tree object that this context menu influences
   */
  this.tree = tree;
  /**
   * The div of the menu
   */
  this.div = document.createElement('div');
  this.div.style.display = 'none';
  this.div.style.position = 'fixed';
  this.div.style.border = '1px solid #CCCCCC';
  this.div.style.background = '#FFFFFF';
  this.div.style.letterSpacing = '0.5px';
  this.div.className = 'contextMenu';
  this.closed = true;
  /**
   * The options in this menu
   */
  this.elements = [];
  if (options && options.length > 0) {
    for (i = 0; i < options.length; i++) {
      menuItem = {};

      if (options[i].handler) {
        menuItem.handler = options[i].handler;
        menuItem.text = options[i].text || 'New Menu Item';
        menuItem.internal = options[i].internal || false;
        menuItem.leaf = options[i].leaf || false;
        this.elements.push(menuItem);
      }
    }
  } else {
    this.elements = [ {
      text: 'Redraw Subtree',
      handler: 'redrawTreeFromBranch',
      internal: true,
      leaf: false
    }, {
      text: 'Show Labels',
      handler: 'displayLabels',
      internal: false,
      leaf: false
    }, {
      text: 'Hide Labels',
      handler: 'hideLabels',
      internal: false,
      leaf: false
    }, {
      text: 'Collapse/Expand branch',
      handler: 'toggleCollapsed',
      internal: true,
      leaf: false
    }, {
      text: 'Rotate Branch',
      handler: 'rotate',
      internal: true,
      leaf: false
    }, {
      text: 'Download All Leaf IDs',
      handler: 'downloadAllLeafIds',
      internal: false,
      leaf: false
    }, {
      text: 'Download Branch Leaf IDs',
      handler: 'downloadLeafIdsFromBranch',
      internal: true,
      leaf: false
    } ];
  }
  this.tree.canvasEl.appendChild(this.div);
}

ContextMenu.prototype.close = function () {
  this.div.style.display = 'none';
  this.closed = true;
};

ContextMenu.prototype.mouseover = function (element) {
  element.style.backgroundColor = '#E2E3DF';
};

ContextMenu.prototype.mouseout = function (element) {
  element.style.backgroundColor = 'transparent';
};

ContextMenu.prototype.click = function () {
  createHandler(this, 'close');
  this.closed = true;
};

ContextMenu.prototype.open = function (x, y) {
  var i;
  var node;
  var element;

  while (this.div.hasChildNodes()) {
    this.div.removeChild(this.div.firstChild);
  }

  for (i = 0; i < this.elements.length; i++) {
    node = this.tree.root.clicked(
      this.tree.translateClickX(x),
      this.tree.translateClickY(y)
    );
    if ((node && ((node.leaf && !this.elements[i].leaf && this.elements[i].internal) ||
      (!node.leaf && !this.elements[i].internal && this.elements[i].leaf))) ||
      (!node && (this.elements[i].leaf || this.elements[i].internal))) {
      continue;
    }
    element = document.createElement('div');
    element.appendChild(document.createTextNode(this.elements[i].text));
    if (this.elements[i].leaf || this.elements[i].internal) {
      element.addEventListener(
        'click', createHandler(node, this.elements[i].handler)
      );
    } else {
      element.addEventListener(
        'click', createHandler(this.tree, this.elements[i].handler)
      );
    }
    element.style.cursor = 'pointer';
    element.style.padding = '0.3em 0.5em 0.3em 0.5em';
    element.style.fontFamily = this.tree.font;
    element.style.fontSize = '8pt';
    element.addEventListener('click', this.click);
    document.body.addEventListener('click', createHandler(this, 'close'));
    element.addEventListener('contextmenu', preventDefault);
    element.addEventListener('mouseover', createHandler(element, this.mouseover));
    element.addEventListener('mouseout', createHandler(element, this.mouseout));
    this.div.appendChild(element);
  }

  if (x && y) {
    this.div.style.top = y + 'px';
    this.div.style.left = x + 'px';
  } else {
    this.div.style.top = '100px';
    this.div.style.left = '100px';
  }

  this.div.style.zIndex = 2000;
  this.div.style.display = 'block';

  this.div.style.backgroundColor = '#FFFFFF';
};

module.exports = ContextMenu;
