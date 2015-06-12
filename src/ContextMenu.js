import Tooltip from './Tooltip';
import { createHandler, preventDefault } from './utils/events';

const DEFAULT_MENU_ITEMS = [
  { text: 'Collapse/Expand Branch',
    handler: function (branch) {
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
    text: 'Export As Image',
    handler: 'exportCurrentTreeView'
  }, {
    text: 'Export Leaf IDs',
    handler: 'downloadAllLeafIds'
  }, {
    text: 'Export Leaf IDs on Branch',
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

function transferMenuItem({ handler, text = 'New menu Item', nodeType }) {
  return { handler, text, nodeType };
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

    this.menuItems = menuItems.map(transferMenuItem);
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
