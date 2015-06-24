import { Angles } from '../../utils/constants';

import BranchRenderer from '../../BranchRenderer';
import Prerenderer from '../../Prerenderer';

import branchRendererOptions from './branchRenderer';
import prerendererOptions from './prerenderer';


const labelAlign = {
  moveToPosition(node) {
    node.canvas.moveTo(
      node.centerx + node.labelOffsetX, node.centery + node.labelOffsetY
    );
  },
  getLabelOffset(node) {
    let trigFn =
    (node.angle >= Angles.QUARTER &&
    node.angle <= (Angles.HALF + Angles.QUARTER)) ? Math.tan : Math.cos;

    return trigFn(node.angle) * node.labelOffsetX;
  }
};

export default {
  branchRenderer: new BranchRenderer(branchRendererOptions),
  prerenderer: new Prerenderer(prerendererOptions),
  labelAlign
};
