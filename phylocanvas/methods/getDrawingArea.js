export default function (tree) {
  const width = tree.state.size.width;
  const height = tree.state.size.height;
  const padding = tree.state.padding;
  return ({
    width,
    height,
    left: padding,
    top: padding,
    right: width - padding,
    bottom: height - padding,
  });
}
