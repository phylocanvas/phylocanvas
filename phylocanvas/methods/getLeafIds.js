export default function (tree, nodeOrId) {
  const virtualTree = tree.getVirtualTree();
  const subtreeRoot = tree.getNodeById(nodeOrId || virtualTree.rootNode);
  const ids = [];
  for (let i = subtreeRoot.preIndex; i < subtreeRoot.preIndex + subtreeRoot.totalNodes; i++) {
    if (virtualTree.preorderTraversal[i].isLeaf) {
      ids.push(virtualTree.preorderTraversal[i].id);
    }
  }
  return ids;
}
