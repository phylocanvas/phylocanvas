import Tooltip from './Tooltip';
import { createHandler, preventDefault } from './utils/events';

function createAnchorElement(contextMenu, { text='link', filename='file', href }) {
  let anchorElement = contextMenu.createElement('a', text);
  anchorElement.style.padding = '0px';
  anchorElement.href = href;
  anchorElement.style.textDecoration = 'none';
  anchorElement.download = filename;
  return anchorElement;
}

function createImageLink(contextMenu) {
  let anchorElement = createAnchorElement(contextMenu, { text: this.text, filename: 'phylocanvas_tree.png', href: contextMenu.tree.getPngUrl() });
  return anchorElement;
}

function createLeafIdsLink(contextMenu) {
  let leafdata = contextMenu.tree.root.downloadLeafIdsFromBranch()
  let anchorElement = createAnchorElement(contextMenu, { text: this.text , filename: 'pc-leaf-ids-root.txt', href: leafdata });
  return anchorElement;
}

function createBranchLeafIdsLink(contextMenu, node) {
  let leafdata = node.downloadLeafIdsFromBranch()
  let anchorElement = createAnchorElement(contextMenu, { text: this.text, filename: `pc-leaf-ids-${node.id}.txt`, href: leafdata });
  return anchorElement;
}

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
    element: createImageLink
  }, {
    text: 'Export Leaf IDs',
    element: createLeafIdsLink
  }, {
    text: 'Export Leaf IDs on Branch',
    element: createBranchLeafIdsLink,
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
  element.style.backgroundColor = '#d2d2c4';
}

function mouseout(element) {
  element.style.backgroundColor = 'transparent';
}

function transferMenuItem({ handler, text = 'New menu Item', nodeType, element }) {
  return { handler, text, nodeType, element};
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
    let listElement;
    list.style.margin = '0';
    list.style.padding = '0';

    for (let menuItem of this.menuItems) {
      if (!menuItemApplicable(menuItem, node)) {
        continue;
      }

      if(menuItem.element) {
        let anchorElement = menuItem.element(this, node);
        listElement = this.createElement('li', anchorElement);
      }
      else {
        listElement = this.createElement('li', menuItem.text);
      }

      listElement.style.listStyle = 'none outside none';

      if(!menuItem.element) {
        if (menuItem.nodeType) {
          listElement.addEventListener(
            'click', createHandler(node, menuItem.handler)
          );
        } else {
          listElement.addEventListener(
            'click', createHandler(this.tree, menuItem.handler)
          );
        }
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



