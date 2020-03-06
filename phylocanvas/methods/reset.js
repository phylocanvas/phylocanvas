import resetView from '../functions/resetView';

export default function (tree, source) {
  tree.setState(
    resetView(tree, source),
  );
}
