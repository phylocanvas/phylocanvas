import BranchRenderer from '../../BranchRenderer';
import Prerenderer from '../../Prerenderer';

import branchRendererOptions from './branchRenderer';
import prerendererOptions from './prerenderer';

import { Angles } from '../../utils/constants';

const labelAlign = {
  getX(node) {
    return node.centerx;
  },
  getY(node) {
    return node.tree.farthestNodeFromRootY * node.tree.currentBranchScale;
  },
  getLabelOffset(node) {
    return (node.tree.farthestNodeFromRootY * node.tree.currentBranchScale - node.centery);
  }
};

export default {
  branchRenderer: new BranchRenderer(branchRendererOptions),
  prerenderer: new Prerenderer(prerendererOptions),
  labelAlign,
  branchScalingAxis: 'y',
  getCollapsedMeasurements(branch) {
    return {
      angle: Angles.QUARTER,
      radius: branch.tree.step * branch.getNumberOfLeaves(),
    };
  },
};
