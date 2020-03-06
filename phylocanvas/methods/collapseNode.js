import collapseNode from '../functions/collapseNode';

export default function (tree, nodeOrId, { refit = false } = {}) {
  const node = tree.getNodeById(nodeOrId);
  if (node) {
    tree.setState(
      collapseNode(tree, node.id, refit)
    );
  }
}
