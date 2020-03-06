import resetCollapsedIds from '../functions/resetCollapsedIds';
import fitInPanel from './fitInPanel';

export default function (tree, { refit = false } = {}) {
  return tree.setState(
    tree.chain(
      resetCollapsedIds,
      refit ? fitInPanel : null
    )
  );
}
