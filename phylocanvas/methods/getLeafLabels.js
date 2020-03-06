export default function (tree, nodeOrId) {
  const virtualTree = tree.getVirtualTree();
  const subtreeRoot = tree.getNodeById(nodeOrId || virtualTree.rootNode);
  const labels = [];
  for (let i = subtreeRoot.preIndex; i < subtreeRoot.preIndex + subtreeRoot.totalNodes; i++) {
    const node = virtualTree.preorderTraversal[i];
    if (node.isLeaf) {
      labels.push(tree.getLabel(node));
    }
  }
  return labels;
}
