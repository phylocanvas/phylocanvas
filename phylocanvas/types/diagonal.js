import { Angles } from '../constants';

export function getBranchScale(tree) {
  const { rootNode } = tree.getVirtualTree();

  const totalLength = (tree.ctx.canvas.width - tree.state.padding * 2);

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

    // render all nodes horizontally
    node.angle = Angles.Degrees0;

    // use subtree size to postion the current node away from tree root
    node.x = (layout.rootNode.visibleLeaves - node.visibleLeaves) * tree.state.stepScale / 2;

    if (node.isLeaf) {
      // leaf nodes are positioned at step offsets
      node.y = stepOffset * tree.state.stepScale;
    } else {
      if (node.isCollapsed) {
        // collapsed internal nodes are positioned at the first leaf in the subtree
        node.y = stepOffset * tree.state.stepScale;
      } else {
        // internal nodes are positioned in the middle point of the substree
        const startY = node.children[0].y;
        const subTreeHeight = (node.visibleLeaves - node.children[0].visibleLeaves) * tree.state.stepScale;
        node.y = startY + (subTreeHeight / 2);
      }
    }
    if (node.isLeaf) {
      stepOffset++;
    }
  }

  for (let i = rootNode.preIndex; i < rootNode.preIndex + rootNode.totalNodes; i++) {
    const node = layout.preorderTraversal[i];
    if (node.parent) {
      node.slope = (node.parent.y - node.y) / (node.parent.x - node.x);
      node.intercept = node.y - node.slope * node.x;
    }
  }
}

function drawLine(tree, layout, node) {
  if (node === layout.rootNode) return;
  tree.ctx.beginPath();
  tree.ctx.moveTo(node.x, node.y);
  tree.ctx.lineTo(node.parent.x, node.parent.y);
  tree.ctx.stroke();
  tree.ctx.closePath();
}

function getNodeAtPoint(tree, x, y, pad) {
  const { rootNode, postorderTraversal } = tree.getVirtualTree();
  for (let i = rootNode.postIndex - rootNode.totalNodes + 1; i <= rootNode.postIndex; i++) {
    const node = postorderTraversal[i];
    if (node && node.parent && x < node.x && x > node.parent.x) {
      if ((y > node.slope * x + node.intercept - pad) &&
          (y < node.slope * x + node.intercept + pad)) {
        return node;
      }
    }
  }
  return null;
}

export default {
  alignableLabels: false,
  getBranchScale,
  getNodeAtPoint,
  drawLine,
  layoutNodes,
  mainAxis: 'x',
  stepScalingAxis: 'y',
};
