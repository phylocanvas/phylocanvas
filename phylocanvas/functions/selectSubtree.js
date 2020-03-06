export default function (tree, ids, append) {
  if (append) {
    const selection = new Set(tree.state.selectedIds);
    for (const id of ids) {
      selection.add(id);
    }
    return {
      selectedIds: Array.from(selection),
    };
  }

  return {
    selectedIds: ids,
  };
}
