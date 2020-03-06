export default function (tree, nodeIds) {
  const labels = [];
  for (const id of nodeIds) {
    const node = tree.getNodeById(id);
    if (node && node.isLeaf) {
      labels.push(tree.getLabel(node));
    }
  }
  return labels;
}
