import BranchRenderer from '../../BranchRenderer';
import Prerenderer from '../../Prerenderer';

import branchRendererOptions from './branchRenderer';
import prerendererOptions from './prerenderer';

export default {
  branchRenderer: new BranchRenderer(branchRendererOptions),
  prerenderer: new Prerenderer(prerendererOptions),
  getCollapsedMeasurements(branch) {
    const numberOfLeaves = branch.getNumberOfLeaves();
    return {
      angle: numberOfLeaves * branch.tree.step,
      radius: numberOfLeaves, // wedge appears larger if contains many leaves
    };
  },
  calculateFontSize: function (ystep) {
    return Math.min((ystep * 50) + 5, 15);
  }
};
