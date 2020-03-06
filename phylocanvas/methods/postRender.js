export default function (tree, nodes) {
  const { state } = tree;

  for (let i = nodes.rootNode.preIndex; i < nodes.rootNode.preIndex + nodes.rootNode.totalNodes; i++) {
    const node = nodes.preorderTraversal[i];

    if (state.selectedIds.indexOf(node.id) !== -1 || node.id === tree._.highlightedId) {
      tree.drawHighlight(node);
    }

    if (node.isCollapsed) {
      i += node.totalNodes - 1;
    }
  }

  tree.ctx.restore();

  tree.ctx.canvas.title = '';
  if (tree.ctx.canvas.style) {
    tree.ctx.canvas.style.cursor = tree._.highlightedId ? 'pointer' : '';
  }
}
