import appendToArray from '../utils/appendToArray';
import fitInPanel from './fitInPanel';

export default function (tree, id, refit) {
  const collapsedIds = appendToArray(tree.state.collapsedIds, id);
  return tree.chain(
    () => ({ collapsedIds }),
    refit ? fitInPanel : null
  );
}
