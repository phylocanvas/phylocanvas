import Tooltip from './Tooltip';
import { createHandler, preventDefault } from './utils/events';

const DEFAULT_MENU_ITEMS = [
  { text: 'Redraw Subtree',
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
  element.style.backgroundColor = '#E2E3DF';
}

function mouseout(element) {
  element.style.backgroundColor = 'transparent';
}

/**
 * The menu that is shown when the PhyloCanvas widget is right-clicked
 *
 * @constructor
 * @memberOf PhyloCanvas
 * @extends Tooltip
 */
export default class ContextMenu extends Tooltip {

  constructor(tree, menuItems = DEFAULT_MENU_ITEMS) {
    super(tree, 'pc-context-menu');
    console.log(menuItems);
    this.menuItems = menuItems.map(function transferMenuItem(menuItem) {
      return {
        handler: menuItem.handler,
        text: menuItem.text || 'New Menu Item',
        nodeType: menuItem.nodeType || undefined
      };
    });
    this.fontSize = '8pt';
  }

  click() {
    createHandler(this, 'close');
  }

  createContent(node) {
    let list = document.createElement('ul');

    list.style.margin = '0';
    list.style.padding = '0';

    for (let menuItem of this.menuItems) {
      if (!menuItemApplicable(menuItem, node)) {
        continue;
      }

      let listElement = this.createElement('li', menuItem.text);
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
        'mouseover', createHandler(listElement, mouseover)
      );
      listElement.addEventListener(
        'mouseout', createHandler(listElement, mouseout)
      );

      list.appendChild(listElement);
    }
    document.body.addEventListener('click', createHandler(this, 'close'));
    this.element.appendChild(list);
  }

}
