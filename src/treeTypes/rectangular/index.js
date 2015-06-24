import branchRenderer from './branchRenderer';
import prerenderer from './prerenderer';

const labelAlign = {
  moveToPosition(node) {
    node.canvas.moveTo(node.tree.farthestNodeFromRootX, (node.centery));
  },
  getLabelOffset(node) {
    return (node.tree.farthestNodeFromRootX - node.centerx);
  }
};

export default {
  branchRenderer,
  prerenderer,
  labelAlign
};
