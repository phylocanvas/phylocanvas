const windowURL = window.URL || window.webkitURL;
function createBlobUrl(data, type = 'text/plain;charset=utf-8') {
  const blob = new Blob([ data ], { type });
  return windowURL.createObjectURL(blob);
}

export function createAnchorElement(text = 'link', filename = 'file', getBlobUrl) {
  const anchorElement = document.createElement('a');
  anchorElement.appendChild(document.createTextNode(text));
  anchorElement.download = filename;
  anchorElement.addEventListener('click', () => {
    anchorElement.href = getBlobUrl();
  });

  return anchorElement;
}

export function createImageLink(tree, node, text) {
  const { filenames } = tree.contextMenu;
  return createAnchorElement(
    text,
    filenames.image,
    () => tree.ctx.canvas.toDataURL(),
  );
}

export function createLeafLabelsLink(tree, node, text) {
  const { filenames } = tree.contextMenu;
  return createAnchorElement(
    text,
    filenames.leafLabels,
    () => createBlobUrl(tree.getLeafLabels(node).join('\n')),
  );
}

export function createSelectedLabelsLink(tree, node, text) {
  const { contextMenu, state } = tree;
  const { selectedIds } = state;
  const { filenames } = contextMenu;
  if (selectedIds.length === 0) {
    return null;
  }
  return createAnchorElement(
    text,
    filenames.leafLabels,
    () => createBlobUrl(tree.getNodeLabels(selectedIds).join('\n')),
  );
}

export function createNewickLink(tree, node, text) {
  const { filenames } = tree.contextMenu;
  return createAnchorElement(
    text,
    filenames.newick,
    () => createBlobUrl(tree.getNewick(node)),
  );
}
