import { Angles } from '../constants';

function getBranchScale(tree, stepScale = tree.state.stepScale) {
  const layout = tree.getVirtualTree();

  const treeWidth = layout.rootNode.totalLeaves * stepScale;
  const treeHeight = (tree.ctx.canvas.height / tree.ctx.canvas.width) * treeWidth;

  const totalLeafLength = layout.rootNode.totalLeafLength - layout.rootNode.branchLength;

  if (totalLeafLength === 0) {
    tree.error(501);
  }

  return treeHeight / totalLeafLength;
}

function layoutNodes(tree, layout) {
  let stepOffset = 0;
  const { rootNode } = layout;

  for (let i = rootNode.postIndex - rootNode.totalNodes + 1; i <= rootNode.postIndex; i++) {
    const node = layout.postorderTraversal[i];

    // render all nodes vertically
    node.angle = Angles.Degrees90;
    node.y = node.distanceFromRoot * tree.state.branchScale;

    if (node.isLeaf) {
      // leaf nodes are positioned at step offsets
      node.x = -1 * stepOffset * tree.state.stepScale;
    } else {
      if (node.isCollapsed) {
        // collapsed internal nodes are positioned at the first leaf in the subtree
        node.x = stepOffset * tree.state.stepScale;
      } else {
        // internal nodes are positioned half-way between first and last descendant
        const startX = node.children[0].x;
        const endX = node.children[node.children.length - 1].x;
        node.x = (endX + startX) / 2;
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
  tree.ctx.lineTo(node.x, node.parent.y);
  tree.ctx.lineTo(node.parent.x, node.parent.y);
  tree.ctx.stroke();
  tree.ctx.closePath();
}

function getNodeAtPoint(tree, x, y, pad) {
  const { rootNode, preorderTraversal } = tree.layout();

  for (let i = rootNode.preIndex; i < rootNode.preIndex + rootNode.totalNodes; i++) {
    const node = preorderTraversal[i];
    if (!node.parent) continue;
    if (
      x < node.x + pad && x > node.x - pad &&
      y < node.y + pad && y > node.parent.y - pad
      ||
      y < node.parent.y + pad && y > node.parent.y - pad &&
      ((x < node.parent.x) ? (x > node.x - pad) : (x < node.x + pad))
    ) {
      return node;
    }
  }
  return null;
}

export default {
  alignableLabels: true,
  drawLine,
  branchScalingAxis: 'y',
  getBranchScale,
  getNodeAtPoint,
  mainAxis: 'y',
  layoutNodes,
  stepScalingAxis: 'x',
};
