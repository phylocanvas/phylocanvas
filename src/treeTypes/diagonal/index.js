import BranchRenderer from '../../BranchRenderer';
import Prerenderer from '../../Prerenderer';

import branchRendererOptions from './branchRenderer';
import prerendererOptions from './prerenderer';

export default {
  branchRenderer: new BranchRenderer(branchRendererOptions),
  prerenderer: new Prerenderer(prerendererOptions),
  calculateFontSize: function (ystep) {
    return Math.min((ystep / 2), 10);
  }
};
