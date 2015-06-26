import BranchRenderer from '../../BranchRenderer';
import Prerenderer from '../../Prerenderer';

import branchRendererOptions from './branchRenderer';
import prerendererOptions from './prerenderer';

const labelAlign = {
  getX(node) {
    return node.centerx + node.labelOffsetX;
  },
  getY(node) {
    return node.centery + node.labelOffsetY;
  },
  getLabelOffset(node) {
    return (node.labelOffsetX / Math.cos(node.angle)) - node.getNodeSize();
  }
};

export default {
  branchRenderer: new BranchRenderer(branchRendererOptions),
  prerenderer: new Prerenderer(prerendererOptions),
  labelAlign,
  scaleCollapsedNode: function (radius) {
    return radius / 3;
  },
  calculateFontSize: function (ystep) {
    return Math.min((ystep * 10) + 4, 40);
  }
};
