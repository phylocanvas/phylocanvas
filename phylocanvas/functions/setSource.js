import resetCollapsedIds from './resetCollapsedIds';
import resetRootId from './resetRootId';
import resetRotatedIds from './resetRotatedIds';
import resetView from './resetView';

export default function (tree, source) {
  return tree.chain(
    () => ({ source }),
    resetRootId,
    resetCollapsedIds,
    resetRotatedIds,
    resetView,
  );
}
