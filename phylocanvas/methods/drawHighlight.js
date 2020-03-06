import { Angles } from '../constants';

import mapScalar from '../utils/mapScalar';
import defaults from '../defaults';

export default function (tree, node) {
  const { ctx, state } = tree;

  const { actualNodeSize, actualHaloWidth } = tree._;
  ctx.lineWidth = actualHaloWidth;
  ctx.strokeWidth = actualHaloWidth;
  ctx.strokeStyle = state.haloStyle;

  const actualRadius = actualNodeSize / 2;
  const defaultRadius = mapScalar(tree, defaults.nodeSize / 2);

  const globalStyle = node.isLeaf ? state.leafNodeStyle : state.internalNodeStyle;
  const { shape = globalStyle.shape } = state.styles[node.id] || globalStyle;

  const radius = shape === 'none' ?
    actualHaloWidth * 1.5 :
    actualRadius + defaultRadius + Math.floor((actualRadius / defaultRadius) / 2);

  ctx.beginPath();
  ctx.arc(node.x, node.y, radius, 0, Angles.Degrees360, false);
  ctx.closePath();
  ctx.stroke();
}
