import BranchRenderer from '../../BranchRenderer';
import Prerenderer from '../../Prerenderer';

import branchRendererOptions from './branchRenderer';
import prerendererOptions from './prerenderer';

const labelAlign = {
  getX(node) {
    return node.centerx + node.labelOffsetX + (node.getDiameter() * Math.cos(node.angle));
  },
  getY(node) {
    return node.centery + node.labelOffsetY + (node.getDiameter() * Math.sin(node.angle));
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
    return radius / 2;
  },
  calculateFontSize: function (ystep) {
    return Math.min((ystep * 10) + 4, 40);
  }
};
