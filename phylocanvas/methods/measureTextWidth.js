export default function (tree, text, weight = tree.state.fontWeight) {
  const font = tree.ctx.font;
  tree.ctx.font = `${weight} ${tree.state.fontSize}px ${tree.state.fontFamily}`;
  const textMetrics = tree.ctx.measureText(text);
  tree.ctx.font = font;
  return Math.ceil(textMetrics.width + tree.state.fontSize);
}
