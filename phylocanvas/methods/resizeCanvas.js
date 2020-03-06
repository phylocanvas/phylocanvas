export default function (tree) {
  const { width, height } = tree.state.size;
  // guard because svg ctx.canvas has no style object
  if (tree.ctx.canvas.style) {
    tree.ctx.canvas.style.width = `${width}px`;
    tree.ctx.canvas.style.height = `${height}px`;
    tree.ctx.canvas.width = width * tree.pixelRatio;
    tree.ctx.canvas.height = height * tree.pixelRatio;
  }
}
