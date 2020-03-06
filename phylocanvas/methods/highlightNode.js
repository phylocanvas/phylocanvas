export default function (tree, nodeOrId) {
  const node = (typeof nodeOrId === 'string') ? tree.getNodeById(nodeOrId) : nodeOrId;

  const highlightedId = (node && !node.isHidden) ? node.id : null;
  if (tree._.highlightedId !== highlightedId) {
    tree._.highlightedId = highlightedId;
    tree.render();
  }
}
