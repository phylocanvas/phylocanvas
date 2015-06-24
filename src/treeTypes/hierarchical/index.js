import BranchRenderer from '../../BranchRenderer';
import Prerenderer from '../../Prerenderer';

import branchRendererOptions from './branchRenderer';
import prerendererOptions from './prerenderer';

const labelAlign = {
  moveToPosition(node) {
    node.canvas.moveTo(node.centerx, node.tree.farthestNodeFromRootY + node.getNodeSize());
  },
  getLabelOffset(node) {
    return (node.tree.farthestNodeFromRootY - node.centery);
  }
};

export default {
  branchRenderer: new BranchRenderer(branchRendererOptions),
  prerenderer: new Prerenderer(prerendererOptions),
  labelAlign
};
