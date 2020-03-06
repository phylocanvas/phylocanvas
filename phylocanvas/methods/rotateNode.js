import rotateNode from '../functions/rotateNode';

export default function (tree, nodeOrId, { refit = false } = {}) {
  const node = tree.getNodeById(nodeOrId);
  if (node) {
    tree.setState(
      rotateNode(tree, node.id, refit)
    );
  }
}
