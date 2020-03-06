import types from '../types';
import { Angles } from '../constants';
const NO_STYLE = {};

export default function (tree, layout, node) {
  const { ctx, state } = tree;

  // if (node.isCollapsed) {
  //   // TODO: Draw collapsed node
  // }

  ctx.translate(node.x, node.y);
  ctx.rotate(node.angle);

  const nodeStyle = (state.styles ? state.styles[node.id] : undefined) || NO_STYLE;
  const defaultStyle = node.isLeaf ? state.leafNodeStyle : state.internalNodeStyle;

  ctx.fillStyle = nodeStyle.fillStyle || state.fillStyle || defaultStyle.fillStyle;
  ctx.strokeStyle = tree.state.strokeStyle;

  const nodeSize = tree._.actualNodeSize;
  const nodeRadius = tree._.actualNodeSize / 2;

  if (tree._.renderShapes) {
    const shape = (nodeStyle ? nodeStyle.shape : undefined) || defaultStyle.shape;
    tree.drawNodeShape(node, shape, nodeSize);
  }

  if (tree.state.showLabels || tree._.renderLabels) {
    if ((node.isLeaf && state.renderLeafLabels) || (!node.isLeaf && state.renderInternalLabels)) {
      const alignLabelGap =
        (node.isLeaf && state.alignLabels && types[state.type].alignableLabels !== false) ?
          state.branchScale * (layout.rootNode.longestLeaf - node.distanceFromRoot) :
          0;
      if (alignLabelGap > 0 && tree.state.lineWidth * tree.state.scale > 1) {
        const lineWidth = tree.ctx.lineWidth;
        tree.ctx.lineWidth = tree.ctx.lineWidth / 4;
        tree.ctx.strokeWidth = tree.ctx.lineWidth;
        ctx.beginPath();
        ctx.moveTo(nodeRadius, 0);
        ctx.lineTo(nodeRadius + alignLabelGap, 0);
        ctx.stroke();
        ctx.closePath();
        tree.ctx.lineWidth = lineWidth;
        tree.ctx.strokeWidth = tree.ctx.lineWidth;
      }
      const offset = (node.isLeaf ? 2 : 0) * nodeRadius + alignLabelGap;

      const invertedLabel = (node.angle > Angles.Degrees90) && (node.angle < Angles.Degrees270);
      if (invertedLabel) {
        ctx.rotate(Angles.Degrees180);
      }
      ctx.textAlign = invertedLabel ? 'right' : 'left';

      const font = ctx.font;
      if (nodeStyle.fontStyle) {
        ctx.font = `${nodeStyle.fontStyle} ${tree._.actualFontSize}px ${tree.state.fontFamily}`;
      }
      if (state.styleLeafLabels === false) {
        ctx.fillStyle = nodeStyle.labelFillStyle || state.fillStyle || defaultStyle.fillStyle;
      }
      ctx.fillText(
        tree.getLabel(node),
        invertedLabel ? -offset : offset,
        0
      );
      ctx.font = font;

      if (invertedLabel) {
        ctx.rotate(-Angles.Degrees180);
      }
    }
  }

  ctx.rotate(-node.angle);
  ctx.translate(-node.x, -node.y);
}
