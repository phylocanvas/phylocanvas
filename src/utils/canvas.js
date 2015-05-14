/**
 * Return backing store pixel ratio of context.
 *
 * @param context - The rendering context of HTMl5 canvas.
 *
 */
function getBackingStorePixelRatio(context) {
  return (
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    1
  );
}

module.exports.getBackingStorePixelRatio = getBackingStorePixelRatio;
