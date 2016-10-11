import BranchRenderer from '../../BranchRenderer';
import Prerenderer from '../../Prerenderer';

import branchRendererOptions from './branchRenderer';
import prerendererOptions from './prerenderer';

import { Angles } from '../../utils/constants';

export default {
  branchRenderer: new BranchRenderer(branchRendererOptions),
  prerenderer: new Prerenderer(prerendererOptions),
  getCollapsedMeasurements(branch) {
    return {
      angle: Angles.QUARTER,
      radius: branch.getNumberOfLeaves() * Angles.QUARTER,
    };
  },
  calculateFontSize(ystep) {
    return Math.min((ystep * 50) + 5, 15);
  },
};
