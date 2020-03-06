export default function (tree) {
  tree.setState({
    renderLeafLabels: !tree.state.renderLeafLabels,
  });
}
