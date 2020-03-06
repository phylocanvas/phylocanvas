export default function (tree, scale, levels) {
  const { zoomFactor } = tree.state;

  if (levels === 0) {
    return scale;
  }

  return (
    Math.pow(10, (Math.log(scale) / Math.log(10)) + levels * zoomFactor * 0.01)
  );
}
