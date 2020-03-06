import { Angles } from '../constants';

function getTotalLength(tree) {
  return Math.min(tree.ctx.canvas.width, tree.ctx.canvas.height);
}

function getBranchScale(tree) {
  const totalLength = getTotalLength(tree) / 2;

  const { rootNode } = tree.getVirtualTree();

  if (rootNode.totalLeafLength > 0) {
    return totalLength / rootNode.totalLeafLength;
  }

  if (rootNode.totalLeafLength < 0) {
    return totalLength * rootNode.totalLeafLength;
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
      node.angle = stepOffset * (Angles.Degrees360 / layout.rootNode.visibleLeaves);
    } else {
      // internal nodes are angled half-way between first and last descendant
      const startAngle = node.children[0].angle;
      const endAngle = node.children[node.children.length - 1].angle;
      node.angle = (endAngle + startAngle) / 2;
    }

    // calculate vector horizontal and vertical components to position the node
    const distanceFromRoot = node.distanceFromRoot - layout.rootNode.distanceFromRoot;
    const dist = distanceFromRoot * tree.state.branchScale;
    node.x = dist * Math.cos(node.angle);
    node.y = dist * Math.sin(node.angle);

    if (node.isLeaf && !node.isHidden || node.isCollapsed && !node.isHidden) {
      stepOffset += 1;
    }

    if (node.parent) {
      node.slope = Math.tan(node.angle); // (node.parent.y - node.y) / (node.parent.x - node.x);
      node.intercept = node.y - node.slope * node.x;
    }
  }
}

function drawLine(tree, layout, node) {
  const { rootNode } = layout;

  const pDistanceFromRoot = node.parent.distanceFromRoot - rootNode.distanceFromRoot;
  tree.ctx.beginPath();
  tree.ctx.moveTo(node.x, node.y);
  tree.ctx.lineTo(
    pDistanceFromRoot * tree.state.branchScale * Math.cos(node.angle),
    pDistanceFromRoot * tree.state.branchScale * Math.sin(node.angle)
  );
  tree.ctx.stroke();
  tree.ctx.closePath();

  if (node.children && node.children.length && !node.isCollapsed) {
    const startAngle = node.children[0].angle;
    const endAngle = node.children[node.children.length - 1].angle;
    const distanceFromRoot = Math.abs(node.distanceFromRoot - rootNode.distanceFromRoot);
    tree.ctx.beginPath();
    tree.ctx.arc(0, 0,
      distanceFromRoot * tree.state.branchScale,
      startAngle, endAngle,
      endAngle < startAngle
    );
    tree.ctx.stroke();
    tree.ctx.closePath();
  }
}

function getNodeAtPoint(tree, x, y, pad) {
  const { rootNode, postorderTraversal } = tree.layout();
  for (let i = rootNode.postIndex - rootNode.totalNodes + 1; i <= rootNode.postIndex; i++) {
    const node = postorderTraversal[i];
    if (!node.parent) continue;
    const distanceFromRoot = node.parent.distanceFromRoot - rootNode.distanceFromRoot;
    const parentX = distanceFromRoot * tree.state.branchScale * Math.cos(node.angle);
    if ((node.x > parentX) ? (x < node.x && x > parentX) : (x < parentX && x > node.x)) {
      if (isNaN(node.slope)) {
        const parentY = distanceFromRoot * tree.state.branchScale * Math.sin(node.angle);
        if ((node.y > parentY) ? (y < node.y && y > parentY) : (y < parentY && y > node.y)) {
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
  alignableLabels: true,
  branchScalingAxis: 'xy',
  drawLine,
  getBranchScale,
  getNodeAtPoint,
  layoutNodes,
};
