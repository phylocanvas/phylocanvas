export default function (tree, nodeOrId) {
  const virtualTree = tree.getVirtualTree();

  if (nodeOrId) {
    const subtreeRoot = tree.getNodeById(nodeOrId);
    const leafNodes = [];
    for (let i = subtreeRoot.preIndex; i < subtreeRoot.preIndex + subtreeRoot.totalNodes; i++) {
      const node = virtualTree.preorderTraversal[i];
      if (node.isLeaf) {
        leafNodes.push(node);
      }
    }
    return leafNodes;
  }

  return virtualTree.leafNodes;
}
