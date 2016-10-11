import BranchRenderer from '../../BranchRenderer';
import Prerenderer from '../../Prerenderer';

import branchRendererOptions from './branchRenderer';
import prerendererOptions from './prerenderer';

import { Angles } from '../../utils/constants';

export default {
  branchRenderer: new BranchRenderer(branchRendererOptions),
  prerenderer: new Prerenderer(prerendererOptions),
  calculateFontSize: function (ystep) {
    return Math.min((ystep / 2), 10);
  },
  getCollapsedMeasurements(branch) {
    return {
      angle: Angles.QUARTER,
      radius: branch.tree.step * branch.getNumberOfLeaves(),
    };
  },
};
