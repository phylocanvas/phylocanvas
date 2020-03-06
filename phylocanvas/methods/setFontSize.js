export default function (tree, fontSize) {
  if (typeof(fontSize) === 'number') {
    tree.setState({ fontSize });
  } else {
    tree.error('Invalid font size value, expected number, got ', typeof(fontSize));
  }
}
