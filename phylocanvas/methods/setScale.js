export default function (tree, scale, point = tree.getCentrePoint()) {
  if (scale <= 0) {
    return;
  }

  if (point) {
    const scaleRatio = scale / tree.state.scale;
    const offsetX = tree.state.offsetX;
    tree.state.offsetX = offsetX + ((point.x) - ((point.x - offsetX) * scaleRatio + offsetX));
    const offsetY = tree.state.offsetY;
    tree.state.offsetY = offsetY + ((point.y) - ((point.y - offsetY) * scaleRatio + offsetY));
  }

  tree.state.scale = scale;

  tree.render();
}
