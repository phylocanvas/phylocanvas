export default function (tree) {
  return {
    x: (tree.ctx.canvas.width / 2) / tree.pixelRatio,
    y: (tree.ctx.canvas.height / 2) / tree.pixelRatio,
  };
}
