import BranchRenderer from '../../BranchRenderer';
import Prerenderer from '../../Prerenderer';

import branchRendererOptions from './branchRenderer';
import prerendererOptions from './prerenderer';

const labelAlign = {
  moveToPosition(node) {
    node.canvas.moveTo(node.tree.farthestNodeFromRootX + node.getNodeSize(), (node.centery));
  },
  getLabelOffset(node) {
    return (node.tree.farthestNodeFromRootX - node.centerx);
  }
};

export default {
  branchRenderer: new BranchRenderer(branchRendererOptions),
  prerenderer: new Prerenderer(prerendererOptions),
  labelAlign
};
