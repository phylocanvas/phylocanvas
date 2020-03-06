import { Angles } from '../constants';

function getTotalLength(tree) {
  return Math.min(tree.ctx.canvas.width, tree.ctx.canvas.height);
}

function getBranchScale(tree) {
  const totalLength = getTotalLength(tree) / 2;

  const layout = tree.getVirtualTree();

  const totalLeafLength = layout.rootNode.totalLeafLength - layout.rootNode.branchLength;

  if (totalLeafLength > 0) {
    return totalLength / totalLeafLength;
  }

  if (totalLeafLength < 0) {
    return totalLength * totalLeafLength;
  }

  return 0;
}

function layoutNodes(tree, layout) {
  let stepOffset = 0;
  const { rootNode } = layout;

  for (let i = rootNode.postIndex - rootNode.totalNodes + 1; i <= rootNode.postIndex; i++) {
    const node = layout.postorderTraversal[i];

    if (node.isLeaf) {
      // leaf nodes are angled at step offsets (use a fixed step angle for all leaf nodes)
      node.angle = stepOffset * (Angles.Degrees360 / rootNode.visibleLeaves);
    } else {
      let angle = 0;
      for (const child of node.children) {
        angle += (child.angle * child.totalLeaves);
      }
      node.angle = angle / node.totalLeaves;
    }

    if (node.isLeaf && !node.isHidden || node.isCollapsed && !node.isHidden) {
      stepOffset += 1;
    }
  }

  for (let i = rootNode.preIndex; i < rootNode.preIndex + rootNode.totalNodes; i++) {
    const node = layout.preorderTraversal[i];
    // calculate vector horizontal and vertical components to position the node
    const dist = node.branchLength * tree.state.branchScale;
    node.x = (node !== rootNode ? node.parent.x : 0) + dist * Math.cos(node.angle);
    node.y = (node !== rootNode ? node.parent.y : 0) + dist * Math.sin(node.angle);

    if (node !== rootNode) {
      node.slope = (node.parent.y - node.y) / (node.parent.x - node.x);
      node.intercept = node.y - node.slope * node.x;
    }
  }
}

function drawLine(tree, layout, node) {
  tree.ctx.beginPath();
  tree.ctx.moveTo(node.x, node.y);
  tree.ctx.lineTo(node.parent.x, node.parent.y);
  tree.ctx.stroke();
  tree.ctx.closePath();
}

function getNodeAtPoint(tree, x, y, pad) {
  const { rootNode, postorderTraversal } = tree.layout();
  for (let i = rootNode.postIndex - rootNode.totalNodes + 1; i <= rootNode.postIndex; i++) {
    const node = postorderTraversal[i];
    if (!node.parent) continue;
    if ((node.x > node.parent.x) ? (x < node.x && x > node.parent.x) : (x < node.parent.x && x > node.x)) {
      if (isNaN(node.slope)) {
        if ((node.y > node.parent.y) ? (y < node.y && y > node.parent.y) : (y < node.parent.y && y > node.y)) {
          return node;
        }
      } else {
        if ((y > node.slope * x + node.intercept - pad) &&
            (y < node.slope * x + node.intercept + pad)) {
          return node;
        }
      }
    }
  }
  return null;
}

export default {
  alignableLabels: false,
  branchScalingAxis: 'xy',
  drawLine,
  getBranchScale,
  getNodeAtPoint,
  layoutNodes,
};
