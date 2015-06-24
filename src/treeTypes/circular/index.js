import branchRenderer from './branchRenderer';
import prerenderer from './prerenderer';

const labelAlign = {
  moveToPosition(node) {
    node.canvas.moveTo(node.centerx, node.centery);
  },
  getLabelOffset(node) {

  }
};

export default {
  branchRenderer,
  prerenderer,
  labelAlign
};
