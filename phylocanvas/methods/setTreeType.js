import setType from '../functions/setType';

export default function (tree, type) {
  tree.setState(
    setType(tree, type),
  );
}
