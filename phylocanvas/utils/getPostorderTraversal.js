// https://en.wikipedia.org/wiki/Tree_traversal#Post-order
export default function getPostOrderTraversal(rootNode) {
  const nodes = [];
  const queue = [ rootNode ];

  while (queue.length) {
    const node = queue.pop();
    if (Array.isArray(node.children)) {
      queue.push(...node.children);
    }
    nodes.push(node);
  }

  return nodes.reverse();
}
