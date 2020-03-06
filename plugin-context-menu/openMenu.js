import render from './render';
import show from './show';

export default function openMenu(tree, x, y, nodeId) {
  const node = nodeId ? tree.getNodeById(nodeId) : null;
  render(tree, node);
  show(tree.contextMenu, x, y);
  tree.contextMenu.isOpen = true;
}
