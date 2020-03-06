import types from '../types';
import getScaleBounds from './getScaleBounds';

export default function (tree) {
  const bounds = tree.getBounds(false);
  const area = tree.getDrawingArea();

  const treeWidth = bounds.maxX - bounds.minX;
  const treeHeight = bounds.maxY - bounds.minY;
  const canvasWidth = Math.max(
    area.width * 0.333,
    area.right - area.left - tree.state.nodeSize
  );
  const canvasHeight = Math.max(
    area.height * 0.333,
    area.bottom - area.top - tree.state.nodeSize
  );
  const xZoomRatio = canvasWidth / treeWidth;
  const yZoomRatio = canvasHeight / treeHeight;
  const scale = Math.min(xZoomRatio, yZoomRatio);

  const pad =
    tree.state.padding + Math.max(tree.state.nodeSize, tree.state.fontSize) / 2;
  let offsetX = -1 * bounds.minX * scale;
  let offsetY = -1 * bounds.minY * scale;

  if (xZoomRatio > yZoomRatio) {
    offsetX += pad + (canvasWidth - treeWidth * scale) / 2;
    offsetY += pad;
  } else if (xZoomRatio < yZoomRatio) {
    offsetX += pad;
    offsetY += pad + (canvasHeight - treeHeight * scale) / 2;
  } else {
    offsetX += pad;
    offsetY += pad;
  }

  const typeDef = types[tree.state.type];
  if (typeDef.mainAxis === undefined) {
    offsetX += (area.width - canvasWidth) / 2 - pad;
    offsetY += (area.height - canvasHeight) / 2 - pad;
  }

  // not using spread for "yarn link" compatibility
  const { minScale, maxScale } = getScaleBounds(scale);
  return {
    offsetX,
    offsetY,
    scale,
    minScale,
    maxScale,
  };
}
