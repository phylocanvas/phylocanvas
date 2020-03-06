import resetView from './resetView';

export default function (tree, rootId) {
  return tree.chain(
    () => ({ rootId }),
    resetView,
  );
}
