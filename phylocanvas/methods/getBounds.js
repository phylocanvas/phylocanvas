import { TreeTypes } from '../constants';

export default function (tree) {
  const { state } = tree;

  const layout = tree.layout();

  let minX = Number.MAX_SAFE_INTEGER;
  let minY = Number.MAX_SAFE_INTEGER;
  let maxX = Number.MIN_SAFE_INTEGER;
  let maxY = Number.MIN_SAFE_INTEGER;

  const includeLabelAlignment = (state.type === TreeTypes.Circular && state.alignLabels);

  const nodePadding = 0;

  const { rootNode } = layout;
  for (let i = rootNode.preIndex; i < rootNode.preIndex + rootNode.totalNodes; i++) {
    const node = layout.preorderTraversal[i];

    const nodeStartX = node.x;
    let nodeEndX = node.x;
    const nodeStartY = node.y;
    let nodeEndY = node.y;

    if (node.isLeaf) {
      let labelLength = nodePadding;
      if (includeLabelAlignment) {
        labelLength += state.branchScale * (layout.rootNode.totalLeafLength - node.distanceFromRoot);
      }
      nodeEndX += (labelLength * Math.cos(node.angle));
      nodeEndY += (labelLength * Math.sin(node.angle));
    }

    // if (includeLabelLength) {
    //   nodeStartX += (node.x >= 0 ? -1 : 1) * actualNodeRadius;
    //   nodeEndX += + (node.x >= 0 ? 1 : -1) * actualNodeRadius;
    //   nodeStartY += (node.y >= 0 ? -1 : 1) * actualNodeRadius;
    //   nodeEndY += (node.y >= 0 ? 1 : -1) * actualNodeRadius;
    // }

    if (nodeStartX < minX) {
      minX = nodeStartX;
    }
    if (nodeEndX < minX) {
      minX = nodeEndX;
    }

    if (nodeStartX > maxX) {
      maxX = nodeStartX;
    }
    if (nodeEndX > maxX) {
      maxX = nodeEndX;
    }

    if (nodeStartY < minY) {
      minY = nodeStartY;
    }
    if (nodeEndY < minY) {
      minY = nodeEndY;
    }

    if (nodeStartY > maxY) {
      maxY = nodeStartY;
    }
    if (nodeEndY > maxY) {
      maxY = nodeEndY;
    }

    if (node.isCollapsed) {
      i += node.totalNodes - 1;
      continue;
    }
  }

  return ({
    minX,
    maxX,
    minY,
    maxY,
  });
}
