/* eslint no-else-return:0 */
import zoomLevelToScale from '../utils/zoomLevelToScale';

export default function (tree, dx = 0, dy = 0, dz = 0, point) {
  const x = point.x;
  const y = point.y;
  const offsetX = tree.state.offsetX + dx;
  const offsetY = tree.state.offsetY + dy;
  if (dz === 0) {
    return {
      offsetX,
      offsetY,
    };
  } else {
    const newScale = zoomLevelToScale(tree, tree.state.scale, dz);
    const oldScale = tree.state.scale;
    return {
      offsetX: -1 * ((((-1 * offsetX) + x) / oldScale * newScale) - x),
      offsetY: -1 * ((((-1 * offsetY) + y) / oldScale * newScale) - y),
      scale: newScale,
    };
  }
}
