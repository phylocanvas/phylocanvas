import mapPoint from '../utils/mapPoint';

export default function (tree) {
  const { width, height } = tree.getDrawingArea();
  const { minX, maxX, minY, maxY } = tree.getBounds();
  const topLeftPoint = mapPoint(tree, tree.state.padding, tree.state.padding);
  const bottomRightPoint = mapPoint(
    tree,
    width - tree.state.padding,
    height - tree.state.padding
  );
  const centrePoint = mapPoint(tree, width / 2, height / 2);
  const startPoint = {
    x: Math.max(topLeftPoint.x, minX),
    y: Math.max(topLeftPoint.y, minY),
  };
  const endPoint = {
    x: Math.min(bottomRightPoint.x, maxX),
    y: Math.min(bottomRightPoint.y, maxY),
  };
  return {
    startPoint,
    endPoint,
    centrePoint,
  };
}
