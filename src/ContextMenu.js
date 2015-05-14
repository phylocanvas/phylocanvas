var Tooltip = require('./Tooltip');

var createHandler = require('./utils/events').createHandler;
var preventDefault = require('./utils/events').preventDefault;

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
