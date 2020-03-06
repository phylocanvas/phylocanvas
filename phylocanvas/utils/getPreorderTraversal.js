// https://en.wikipedia.org/wiki/Tree_traversal#Pre-order
export default function getPreOrderTraversal(rootNode) {
  const nodes = [];
  const queue = [ rootNode ];

  while (queue.length) {
    const node = queue.shift();
    nodes.push(node);
    if (Array.isArray(node.children)) {
      queue.unshift(...node.children);
    }
  }

  return nodes;
}
