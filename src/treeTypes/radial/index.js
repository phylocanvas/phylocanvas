import BranchRenderer from '../../BranchRenderer';
import Prerenderer from '../../Prerenderer';

import branchRendererOptions from './branchRenderer';
import prerendererOptions from './prerenderer';

export default {
  branchRenderer: new BranchRenderer(branchRendererOptions),
  prerenderer: new Prerenderer(prerendererOptions),
  scaleCollapsedNode: function (radius) {
    return radius / 3;
  },
  calculateFontSize: function (ystep) {
    return Math.min((ystep * 50) + 5, 15);
  }
};
