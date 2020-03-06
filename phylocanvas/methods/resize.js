import resize from '../functions/resize';

export default function (tree, width, height) {
  tree.setState(
    resize(tree, width, height)
  );
}
