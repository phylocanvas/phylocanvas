export default function (tree, nodeSize) {
  if (typeof(nodeSize) === 'number') {
    tree.setState({ nodeSize });
  } else {
    tree.error('Invalid node size value, expected number, got ', typeof(nodeSize));
  }
}
