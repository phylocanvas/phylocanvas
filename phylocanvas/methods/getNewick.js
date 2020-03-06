export default function (tree, nodeOrId, options = {}) {
  const virtualTree = tree.layout();
  const rootNode = nodeOrId ? tree.getNodeById(nodeOrId) : virtualTree.rootNode;
  const { excludeCollapsed = true } = options;

  const strings = [];
  for (let i = rootNode.postIndex - rootNode.totalNodes + 1; i < rootNode.postIndex; i++) {
    const node = virtualTree.postorderTraversal[i];
    if (node.isLeaf) {
      strings.push(`${tree.getLabel(node)}:${node.branchLength}`);
    } else {
      const chunks = strings.splice(strings.length - node.children.length, node.children.length);
      if (excludeCollapsed && node.isCollapsed) {
        strings.push(`[${node.totalLeaves} hidden ${node.totalLeaves === 1 ? 'leaf' : 'leaves'}]:${node.branchLength}`);
      } else {
        strings.push(`(${chunks.join(',')}):${node.branchLength}`);
      }
    }
  }

  return `(${strings.join(',')});`;
}
