import BranchRenderer from '../../BranchRenderer';
import Prerenderer from '../../Prerenderer';

import branchRendererOptions from './branchRenderer';
import prerendererOptions from './prerenderer';

const labelAlign = {
  getX(node) {
    return node.centerx + node.labelOffsetX + (node.getNodeSize() * 2 * Math.cos(node.angle));
  },
  getY(node) {
    return node.centery + node.labelOffsetY + (node.getNodeSize() * 2 * Math.sin(node.angle));
  },
  getLabelOffset(node) {
    return (node.labelOffsetX) / Math.cos(node.angle);
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
