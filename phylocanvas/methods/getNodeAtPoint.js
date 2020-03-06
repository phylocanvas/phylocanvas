import types from '../types';
import mapScalar from '../utils/mapScalar';

export default function (tree, x, y) {
  const pad = (tree._.actualNodeSize / 2) + mapScalar(tree, 3);
  const layout = tree.layout();

  const { rootNode } = layout;
  for (let i = rootNode.preIndex; i < rootNode.preIndex + rootNode.totalNodes; i++) {
    const node = layout.preorderTraversal[i];
    if (!node.isHidden && (x > node.x - pad) && (x < node.x + pad) && (y > node.y - pad) && (y < node.y + pad)) {
      return node;
    }
  }

  const typeDef = types[tree.state.type];
  if (typeDef.getNodeAtPoint) {
    return typeDef.getNodeAtPoint(tree, x, y, pad);
  }

  return null;
}
