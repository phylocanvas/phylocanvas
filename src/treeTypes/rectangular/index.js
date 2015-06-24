import BranchRenderer from '../../BranchRenderer';
import Prerenderer from '../../Prerenderer';

import branchRendererOptions from './branchRenderer';
import prerendererOptions from './prerenderer';

const labelAlign = {
  getX(node) {
    return node.tree.farthestNodeFromRootX + node.getNodeSize();
  },
  getY(node) {
    return node.centery;
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
