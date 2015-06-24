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
    return node.labelOffsetX / Math.cos(node.angle);
  }
};

export default {
  branchRenderer: new BranchRenderer(branchRendererOptions),
  prerenderer: new Prerenderer(prerendererOptions),
  labelAlign
};
