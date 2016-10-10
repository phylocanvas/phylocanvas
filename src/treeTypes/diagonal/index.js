import BranchRenderer from '../../BranchRenderer';
import Prerenderer from '../../Prerenderer';

import branchRendererOptions from './branchRenderer';
import prerendererOptions from './prerenderer';

export default {
  branchRenderer: new BranchRenderer(branchRendererOptions),
  prerenderer: new Prerenderer(prerendererOptions),
  calculateFontSize: function (ystep) {
    return Math.min((ystep / 2), 10);
  },
  getCollapsedMeasurements(branch) {
    return {
      angle: Math.PI / 2,
      radius: (branch.tree.step * branch.getNumberOfLeaves()) / 4,
    };
  },
};
