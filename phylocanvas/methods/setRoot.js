import setRoot from '../functions/setRoot';

export default function (tree, nodeOrId) {
  let node = null;
  if (nodeOrId !== null) {
    node = tree.getNodeById(nodeOrId);
  }
  tree.setState(
    setRoot(tree, node ? node.id : null)
  );
}
