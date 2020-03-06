export default function (tree, node) {
  const { styles } = tree.state;
  return (node.id in styles && styles[node.id].label) || node.label || node.id;
}
