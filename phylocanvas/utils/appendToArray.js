export default function (selectedIds, id, append = true) {
  if (append) {
    const index = selectedIds.indexOf(id);
    if (index === -1) {
      return selectedIds.concat(id);
    }
    const nextSelectedIds = selectedIds.concat();
    nextSelectedIds.splice(index, 1);
    return nextSelectedIds;
  }
  return [ id ];
}
