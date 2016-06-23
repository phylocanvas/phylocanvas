import { getX, getY } from './dom';

/**
 * Return backing store pixel ratio of context.
 *
 * @param context - The rendering context of HTMl5 canvas.
 *
 */
export function getBackingStorePixelRatio(context) {
  return (
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    1
  );
}

export function getPixelRatio(canvas) {
  return (window.devicePixelRatio || 1) / getBackingStorePixelRatio(canvas);
}

export function translateClick(event, tree) {
  const pixelRatio = getPixelRatio(tree.canvas);
  return [
    (event.offsetX - tree.offsetx) / tree.zoom * pixelRatio,
    (event.offsetY - tree.offsety) / tree.zoom * pixelRatio,
  ];
}

export function translatePoint({ x, y } = { x: 0, y: 0 }, phylocanvas) {
  const pixelRatio = getPixelRatio(phylocanvas.canvas);
  return {
    x: (x - phylocanvas.offsetx) / phylocanvas.zoom * pixelRatio,
    y: (y - phylocanvas.offsety) / phylocanvas.zoom * pixelRatio,
  };
}

export function undoPointTranslation({ x, y } = { x: 0, y: 0 }, phylocanvas) {
  const pixelRatio = getPixelRatio(phylocanvas.canvas);
  return {
    x: (x / pixelRatio * phylocanvas.zoom) + phylocanvas.offsetx,
    y: (y / pixelRatio * phylocanvas.zoom) + phylocanvas.offsety,
  };
}
