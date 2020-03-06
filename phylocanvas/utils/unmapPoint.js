export default function unmapPoint(tree, x = 0, y = 0) {
  return {
    x: (x * tree.state.scale) + tree.state.offsetX,
    y: (y * tree.state.scale) + tree.state.offsetY,
  };
}
