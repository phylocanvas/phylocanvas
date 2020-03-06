export default function closeMenu(tree) {
  tree.contextMenu.el.classList.remove('visible');
  tree.contextMenu.isOpen = false;
}
