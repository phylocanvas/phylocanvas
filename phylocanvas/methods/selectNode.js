import { EmptyArray } from '../constants';

import selectLeaf from '../functions/selectLeaf';
import selectSubtree from '../functions/selectSubtree';
import deselect from '../functions/deselect';

export default function (tree, nodeOrId, append) {
  const node = nodeOrId ? tree.getNodeById(nodeOrId) : null;

  if (node && node.isLeaf) {
    tree.setState(
      selectLeaf(tree, node.id, append)
    );
  } else if (node) {
    const ids = (node && !node.isHidden) ? tree.getLeafIds(node) : EmptyArray;
    tree.setState(
      selectSubtree(tree, ids, append)
    );
  } else {
    tree.setState(
      deselect(tree)
    );
  }
}
