import BranchRenderer from '../../BranchRenderer';
import Prerenderer from '../../Prerenderer';

import branchRendererOptions from './branchRenderer';
import prerendererOptions from './prerenderer';

export default {
  branchRenderer: new BranchRenderer(branchRendererOptions),
  prerenderer: new Prerenderer(prerendererOptions),
  getCollapsedMeasurements(branch) {
    const { maxBranchLength, branchScalar, step } = branch.tree;
    return {
      angle: branch.getNumberOfLeaves() * step,
      radius: (maxBranchLength - branch.totalBranchLength) * branchScalar,
    };
  },
  calculateFontSize(ystep) {
    return Math.min((ystep * 50) + 5, 15);
  },
};
