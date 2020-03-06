function createSublist(tree, menuItems, node) {
  const { el } = tree.contextMenu;

  const sublist = document.createElement('ul');
  for (const menuItem of menuItems) {
    let listElement = null;

    if (menuItem instanceof HTMLElement) {
      listElement = document.createElement('li');
      listElement.appendChild(menuItem);
    } else if (typeof menuItem === 'function') {
      const menuItemContent = menuItem(tree, node);
      if (menuItemContent) {
        listElement = document.createElement('li');
        listElement.appendChild(menuItemContent);
      }
    } else {
      const { text, handler, visible, isActive } = menuItem;
      if (visible ? visible(tree) : true) {
        listElement = document.createElement('li');

        const isToggle = typeof isActive === 'function';

        const buttonElement = document.createElement('button');
        buttonElement.addEventListener('click', () => {
          if (isToggle) tree.contextMenu.invalidate = false;
          handler(tree, node);
        });

        const label = typeof text === 'function' ? text(tree, node) : text;
        buttonElement.appendChild(document.createTextNode(label));

        if (isToggle) {
          const toggle = document.createElement('span');
          toggle.classList.add('phylocanvas-context-menu-toggle');
          if (isActive(tree, node)) toggle.classList.add('is-active');
          buttonElement.appendChild(toggle);
          buttonElement.classList.add('phylocanvas-context-menu-has-toggle');
          listElement.addEventListener('click', () => {
            if (isActive(tree, node)) {
              toggle.classList.add('is-active');
            } else {
              toggle.classList.remove('is-active');
            }
          });
        }

        listElement.appendChild(buttonElement);
      }
    }

    if (listElement) {
      if (!menuItem.isActive) {
        listElement.addEventListener('click', () => tree.contextMenu.close());
      }
      listElement.addEventListener('contextmenu', e => {
        e.preventDefault();
        return false;
      });

      sublist.appendChild(listElement);
    }
  }

  if (sublist.hasChildNodes()) {
    el.appendChild(sublist);
  }
}

export default function createMenuItems(tree, node) {
  const { el } = tree.contextMenu;
  while (el.hasChildNodes()) {
    el.removeChild(el.firstChild);
  }

  const menuItems =
    node && !node.isLeaf ?
      tree.contextMenu.nodeMenuItems :
      tree.contextMenu.treeMenuItems;

  for (const subgroup of menuItems) {
    createSublist(tree, subgroup, node || undefined);
  }
}
