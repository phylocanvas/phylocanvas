/* eslint no-else-return: 0 */

export default function (tree, nodeOrId) {
  const virtualTree = tree.getVirtualTree();
  if (typeof(nodeOrId) === 'string') {
    const node = virtualTree.nodeById[nodeOrId];

    if (!node) {
      tree.error('Cannot find node of ID=', nodeOrId);
    }

    return node;
  } else {
    const node = virtualTree.nodeById[nodeOrId.id];

    if (!node || node !== nodeOrId) {
      tree.error('Node not found', nodeOrId);
    }

    return node;
  }
}
