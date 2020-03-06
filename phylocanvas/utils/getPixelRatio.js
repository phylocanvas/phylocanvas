export default function getPixelRatio(ctx) {
  const backingStorePixelRatio = (
    ctx.backingStorePixelRatio ||
    ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    1
  );
  return (window.devicePixelRatio || 1) / backingStorePixelRatio;
}
