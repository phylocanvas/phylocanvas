/* eslint no-unused-vars: 0 */

import mapScalar from '../utils/mapScalar';

export default function (tree, layout) {
  tree.ctx.save();

  tree.ctx.clearRect(0, 0, tree.ctx.canvas.width, tree.ctx.canvas.height);

  tree._.actualMaxLabelWidth = mapScalar(tree, layout.maxLabelWidth);
  tree._.actualFontSize = mapScalar(tree, tree.state.fontSize);
  tree._.actualNodeSize = mapScalar(tree, tree.state.nodeSize);
  tree._.actualHaloRadius = mapScalar(
    tree,
    Math.max(
      tree.state.nodeSize * 0.75,
      tree.state.haloRadius
    )
  );
  tree._.actualHaloWidth = mapScalar(tree, tree.state.haloWidth);

  tree._.renderShapes = tree.state.showNodes;
  tree._.renderLabels = tree.state.showLabels || (tree.state.stepScale * tree.state.scale >= tree.state.labelThreshold);

  tree.ctx.textBaseline = 'middle';
  tree.ctx.font = `${tree._.actualFontSize}px ${tree.state.fontFamily}`;
  tree.ctx.lineWidth = mapScalar(tree, tree.state.lineWidth);
  tree.ctx.strokeWidth = tree.ctx.lineWidth; // strokeWidth is required for drawing on SVG canvas

  tree.ctx.translate(tree.state.offsetX * tree.pixelRatio, tree.state.offsetY * tree.pixelRatio);
  tree.ctx.scale(tree.state.scale * tree.pixelRatio, tree.state.scale * tree.pixelRatio);
}
