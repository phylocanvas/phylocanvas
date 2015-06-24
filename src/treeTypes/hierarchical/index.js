import branchRenderer from './branchRenderer';
import prerenderer from './prerenderer';

const labelAlign = {
  moveToPosition(node) {
    node.canvas.moveTo(node.centerx, node.tree.farthestNodeFromRootY);
  },
  getLabelOffset(node) {
    return (node.tree.farthestNodeFromRootY - node.centery);
  }
};

export default {
  branchRenderer,
  prerenderer,
  labelAlign
};
