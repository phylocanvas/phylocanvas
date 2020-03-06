import { EmptyArray } from '../constants';

export default function (tree, ids, append = false) {
  if (append) {
    const selectedIds = new Set(tree.state.selectedIds);
    for (const id of ids) {
      selectedIds.add(id);
    }
    return {
      selectedIds: Array.from(selectedIds),
    };
  }

  return {
    selectedIds: ids.length ? ids : EmptyArray,
  };
}
