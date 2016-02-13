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

/**
 * http://phrogz.net/tmp/canvas_zoom_to_cursor.html
 *
 * Adds ctx.getTransform() - returns an SVGMatrix
 * Adds ctx.transformedPoint(x,y) - returns an SVGPoint
 */
export function trackTransforms(ctx) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  let xform = svg.createSVGMatrix();
  ctx.getTransform = function () { return xform; };

  // reused object for GC performance
  const scaledCoordinates = { x: null, y: null };
  const PIXEL_RATIO =
    (window.devicePixelRatio || 1) / getBackingStorePixelRatio(ctx);

  const savedTransforms = [];
  const save = ctx.save;
  ctx.save = function () {
    savedTransforms.push(xform.translate(0, 0));
    return save.call(ctx);
  };
  const restore = ctx.restore;
  ctx.restore = function () {
    xform = savedTransforms.pop();
    return restore.call(ctx);
  };

  const scale = ctx.scale;
  ctx.scale = function (sx, sy) {
    xform = xform.scaleNonUniform(sx, sy);
    return scale.call(ctx, sx, sy);
  };
  const rotate = ctx.rotate;
  ctx.rotate = function (radians) {
    xform = xform.rotate(radians * 180 / Math.PI);
    return rotate.call(ctx, radians);
  };
  const translate = ctx.translate;
  ctx.translate = function (dx, dy) {
    xform = xform.translate(dx, dy);
    return translate.call(ctx, dx, dy);
  };
  const transform = ctx.transform;
  ctx.transform = function (...matrix) {
    const m2 = svg.createSVGMatrix();
    m2.a = matrix[0];
    m2.b = matrix[1];
    m2.c = matrix[2];
    m2.d = matrix[3];
    m2.e = matrix[4];
    m2.f = matrix[5];
    xform = xform.multiply(m2);
    return transform.call(ctx, ...matrix);
  };
  const setTransform = ctx.setTransform;
  ctx.setTransform = function (...matrix) {
    xform.a = matrix[0];
    xform.b = matrix[1];
    xform.c = matrix[2];
    xform.d = matrix[3];
    xform.e = matrix[4];
    xform.f = matrix[5];
    return setTransform.call(ctx, ...matrix);
  };
  const pt = svg.createSVGPoint();
  ctx.transformedPoint = function (x, y) {
    pt.x = x * PIXEL_RATIO;
    pt.y = y * PIXEL_RATIO;
    return pt.matrixTransform(xform.inverse());
  };
}
