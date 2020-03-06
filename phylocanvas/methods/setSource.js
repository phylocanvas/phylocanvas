import setSource from '../functions/setSource';

export default function (tree, source) {
  tree.setState(
    setSource(tree, source),
  );
}
