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

function translateClickX(x) {
  x = (x - getX(this.canvas.canvas) + window.pageXOffset);
  x *= getPixelRatio(this.canvas);
  x -= this.canvas.canvas.width / 2;
  x -= this.offsetx;
  x = x / this.zoom;

  return x;
}

function translateClickY(y) {
  y = (y - getY(this.canvas.canvas) + window.pageYOffset); // account for positioning and scroll
  y *= getPixelRatio(this.canvas);
  y -= this.canvas.canvas.height / 2;
  y -= this.offsety;
  y = y / this.zoom;

  return y;
}

export function translateClick(x, y, tree) {
  return [ translateClickX.call(tree, x), translateClickY.call(tree, y) ];
}
