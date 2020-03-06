import { utils } from '@cgps/phylocanvas';

import closeMenu from './closeMenu';
import mergeMenuItems from './mergeMenuItems';
import openMenu from './openMenu';

import { treeMenuItems, nodeMenuItems } from './menuItems';
import defaults from './defaults';

export default function (tree, decorate) {
  decorate('init', (delegate, args) => {
    const state = delegate(...args);
    const [ options ] = args;
    const { contextMenu = {} } = options;

    tree.contextMenu = {};
    tree.contextMenu.invalidate = true;

    if (contextMenu && typeof contextMenu.parent === 'string') {
      tree.contextMenu.parent =
        document.querySelector(contextMenu.parent);
    } else if (contextMenu) {
      tree.contextMenu.parent = contextMenu.parent;
    }

    if (!tree.contextMenu.parent) {
      tree.contextMenu.parent = document.body;
    }

    tree.contextMenu.el = document.createElement('ul');
    tree.contextMenu.el.className = 'phylocanvas-context-menu';
    tree.contextMenu.parent.appendChild(tree.contextMenu.el);

    tree.contextMenu.treeMenuItems = mergeMenuItems(treeMenuItems, contextMenu.treeMenuItems);
    tree.contextMenu.nodeMenuItems = mergeMenuItems(nodeMenuItems, contextMenu.nodeMenuItems);
    tree.contextMenu.filenames = { ...defaults.filenames, ...contextMenu.filenames };

    tree.contextMenu.open = openMenu.bind(null, tree);
    tree.contextMenu.close = closeMenu.bind(null, tree);

    return state;
  });

  function openContextMenu(e) {
    const point = utils.mapPoint(tree, e.offsetX, e.offsetY);
    const node = tree.getNodeAtPoint(point.x, point.y);
    tree.contextMenu.open(e.pageX, e.pageY, node ? node.id : null);
  }

  const handleTouchStartEvent = () => { tree.contextMenu.touching = true; };
  tree.ctx.canvas.addEventListener('touchstart', handleTouchStartEvent);

  const handleContextMenuEvent = e => {
    e.preventDefault();
    if (tree.contextMenu.touching) {
      openContextMenu(e);
      tree.contextMenu.touching = false;
    }
  };
  tree.ctx.canvas.addEventListener('contextmenu', handleContextMenuEvent);

  const handleMouseDownEvent = e => {
    if (tree.contextMenu.isOpen || !tree.contextMenu.isOpen && e.button === 2) {
      e.stopImmediatePropagation();
    }
  };
  tree.ctx.canvas.addEventListener('mousedown', handleMouseDownEvent);

  const handleMouseUpEvent = e => {
    if (e.button === 2) {
      e.stopImmediatePropagation();
      openContextMenu(e);
    } else if (tree.contextMenu.isOpen) {
      e.stopImmediatePropagation();
      tree.contextMenu.close();
    }
  };
  tree.ctx.canvas.addEventListener('mouseup', handleMouseUpEvent);

  decorate('mergeState', (delegate, args) => {
    const { contextMenu } = tree;
    if (contextMenu.isOpen && contextMenu.invalidate) {
      contextMenu.close();
    }
    contextMenu.invalidate = true;
    delegate(...args);
  });

  decorate('destroy', (delegate, args) => {
    tree.contextMenu.parent.removeChild(tree.contextMenu.el);
    tree.ctx.canvas.removeEventListener('touchstart', handleTouchStartEvent);
    tree.ctx.canvas.removeEventListener('contextmenu', handleContextMenuEvent);
    tree.ctx.canvas.removeEventListener('mousedown', handleMouseDownEvent);
    tree.ctx.canvas.removeEventListener('mouseup', handleMouseUpEvent);
    delegate(...args);
  });
}
