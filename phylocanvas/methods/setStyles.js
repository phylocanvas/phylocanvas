export default function (tree, styles) {
  if (typeof(styles) === 'object') {
    tree.setState({ styles });
  } else {
    tree.error('Invalid node styles, expected object, got ', typeof(styles));
  }
}
