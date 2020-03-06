import getScaleBounds from '../functions/getScaleBounds';

export default function (viewport, padding, width, height) {
  const { startPoint, centrePoint, endPoint } = viewport;
  const canvasWidth = width - 2 * padding;
  const canvasHeight = height - 2 * padding;
  const xScale = canvasWidth / (endPoint.x - startPoint.x);
  const yScale = canvasHeight / (endPoint.y - startPoint.y);
  const scale = Math.min(xScale, yScale);
  const offsetX = width / 2 - centrePoint.x * scale;
  const offsetY = height / 2 - centrePoint.y * scale;
  return {
    offsetX,
    offsetY,
    scale,
    ...getScaleBounds(scale),
  };
}
