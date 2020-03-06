export default function mapPoint(tree, x = 0, y = 0) {
  return {
    x: (x - tree.state.offsetX) / tree.state.scale,
    y: (y - tree.state.offsetY) / tree.state.scale,
  };
}
