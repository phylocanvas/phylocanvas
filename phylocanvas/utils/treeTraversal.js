import getPreorderTraversal from './getPreorderTraversal';
import getPostorderTraversal from './getPostorderTraversal';

export default function (rootNode, { trimQuotes = true } = {}) {
  const postorderTraversal = getPostorderTraversal(rootNode);
  const preorderTraversal = getPreorderTraversal(rootNode);

  // Detect cladograms
  const isCladogram = postorderTraversal.every((x) => (x.branchLength || x.branch_length || 0) === 0);
  if (isCladogram) {
    rootNode.branchLength = 0;
    for (let nodeIndex = 0; nodeIndex < preorderTraversal.length; nodeIndex++) {
      const node = preorderTraversal[nodeIndex];
      if (node.children) {
        for (const child of node.children) {
          child.branchLength = node.branchLength + 1;
        }
      }
    }
  }

  // bottom-up traversal starting from leaves to root
  for (let nodeIndex = 0; nodeIndex < postorderTraversal.length; nodeIndex++) {
    const node = postorderTraversal[nodeIndex];
    node.postIndex = nodeIndex; // the zero-based index of the node in POst Order Traversal array
    node.isLeaf = !Array.isArray(node.children);
    node.branchLength = Math.abs(node.branchLength || node.branch_length || 0);
    delete node.branch_length;
    if (node.isLeaf && typeof node.name === 'string') {
      if (trimQuotes) {
        node.id = node.name.trim().replace(/^['"]|['"]$/g, '');
      } else {
        node.id = node.name;
      }
      delete node.name;
    }
    node.totalNodes = 1;
    node.totalLeaves = 1;
    node.totalLeafLength = node.branchLength;
    if (!node.isLeaf) {
      node.totalNodes = 1;
      node.totalLeaves = 0;
      let longestLeaf = 0;
      for (const child of node.children) {
        node.totalNodes += child.totalNodes;
        node.totalLeaves += child.totalLeaves;
        if (child.totalLeafLength > longestLeaf) {
          longestLeaf = child.totalLeafLength;
        }
        child.parent = node;
      }
      node.totalLeafLength = node.branchLength + longestLeaf;
      node.longestLeaf = longestLeaf;
    }
  }

  const nodeById = {};
  const leafNodes = [];
  // top-down traversal starting from root to leaves
  for (let nodeIndex = 0; nodeIndex < preorderTraversal.length; nodeIndex++) {
    const node = preorderTraversal[nodeIndex];
    node.preIndex = nodeIndex; // the zero-based index of the node in PRe Order Traversal array
    if (!node.id) {
      node.id = nodeIndex.toString();
    }
    nodeById[node.id] = node;
    node.distanceFromRoot = (node.parent ? node.parent.distanceFromRoot : 0) + node.branchLength;
    if (node.isLeaf) {
      leafNodes.push(node);
    }
    node.visibleLeaves = node.totalLeaves;
  }


  return {
    nodeById,
    rootNode,
    leafNodes,
    postorderTraversal,
    preorderTraversal,
  };
}
