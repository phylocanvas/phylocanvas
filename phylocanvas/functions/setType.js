import resetView from './resetView';

export default function (tree, type) {
  return tree.chain(
    () => ({ type }),
    resetView,
  );
}
