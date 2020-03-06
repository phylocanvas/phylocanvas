import { Angles } from '../constants';

function getBranchScale(tree, stepScale = tree.state.stepScale) {
  const layout = tree.getVirtualTree();
  const treeHeight = layout.rootNode.totalLeaves * stepScale;
  const treeWidth = (tree.ctx.canvas.width / tree.ctx.canvas.height) * treeHeight;

  const totalLeafLength = layout.rootNode.totalLeafLength - layout.rootNode.branchLength;

  if (totalLeafLength === 0) {
    tree.error(501);
  }

  return treeWidth / totalLeafLength;
}

function layoutNodes(tree, layout) {
  let stepOffset = 0;
  const { rootNode } = layout;
  for (let i = rootNode.postIndex - rootNode.totalNodes + 1; i <= rootNode.postIndex; i++) {
    const node = layout.postorderTraversal[i];

    // render nodes horizontally
    node.angle = Angles.Degrees0;
    node.x = node.distanceFromRoot * tree.state.branchScale;

    if (node.isLeaf) {
      // leaf nodes are positioned at step offsets
      node.y = stepOffset * tree.state.stepScale;
    } else {
      if (node.isCollapsed) {
        // collapsed internal nodes are positioned at the first leaf in the subtree
        node.y = (stepOffset) * tree.state.stepScale;
      } else {
        // internal nodes are positioned half-way between first and last descendant
        const startY = node.children[0].y;
        const endY = node.children[node.children.length - 1].y;
        node.y = (endY + startY) / 2;
      }
    }

    if (node.isLeaf && !node.isHidden || node.isCollapsed && !node.isHidden) {
      stepOffset += 1;
    }
  }
}

function drawLine(tree, layout, node) {
  if (node === layout.rootNode) return;
  tree.ctx.beginPath();
  tree.ctx.moveTo(node.x, node.y);
  tree.ctx.lineTo(node.parent.x, node.y);
  tree.ctx.lineTo(node.parent.x, node.parent.y);
  tree.ctx.stroke();
  tree.ctx.closePath();
}

function getNodeAtPoint(tree, x, y, pad) {
  const { rootNode, postorderTraversal } = tree.layout();
  for (let i = rootNode.postIndex - rootNode.totalNodes + 1; i <= rootNode.postIndex; i++) {
    const node = postorderTraversal[i];
    if (!node.parent) continue;
    if (
      x < node.x + pad && x > node.parent.x - pad &&
      y < node.y + pad && y > node.y - pad
      ||
      x < node.parent.x + pad && x > node.parent.x - pad &&
      ((y < node.parent.y) ? (y > node.y - pad) : (y < node.y + pad))
    ) {
      return node;
    }
  }
  return null;
}

export default {
  alignableLabels: true,
  branchScalingAxis: 'x',
  drawLine,
  getBranchScale,
  getNodeAtPoint,
  mainAxis: 'x',
  layoutNodes,
  stepScalingAxis: 'y',
};
