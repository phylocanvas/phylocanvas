import appendToArray from '../utils/appendToArray';

export default function (tree, id, append) {
  const selectedIds = appendToArray(tree.state.selectedIds, id, append);
  return {
    selectedIds,
  };
}
