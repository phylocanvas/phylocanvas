import appendToArray from '../utils/appendToArray';
import fitInPanel from './fitInPanel';

export default function (tree, id, refit) {
  const rotatedIds = appendToArray(tree.state.rotatedIds, id);
  return tree.chain(
    () => ({ rotatedIds }),
    refit ? fitInPanel : null
  );
}
