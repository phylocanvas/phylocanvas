import parse from '../utils/parse';

export default function (tree) {
  const { state = {} } = tree;
  let cache = tree.cache('virtual');

  if (cache.get('source') !== state.source) {
    const t0 = performance.now();

    const { nodeById, rootNode, leafNodes, postorderTraversal, preorderTraversal } = parse(state.source);
    tree.nodes = {
      nodeById,
      rootNode,
      leafNodes,
      postorderTraversal,
      preorderTraversal,
      source: state.source,
      originalSource: state.source.original || state.source,
    };

    const t1 = performance.now();
    tree.log('parsing virtual tree took ', (t1 - t0), ' milliseconds.');

    tree._.cache = {};
    cache = tree.cache('virtual');
  }

  if ((cache.get('rootId') || null) !== tree.state.rootId) {
    const rootNode = tree.nodes.nodeById[tree.state.rootId] || tree.nodes.preorderTraversal[0];
    const leafNodes = [];
    rootNode.distanceFromRoot = 0;
    for (let i = rootNode.preIndex + 1; i < rootNode.preIndex + rootNode.totalNodes; i++) {
      const node = tree.nodes.preorderTraversal[i];
      node.distanceFromRoot = node.parent.distanceFromRoot + node.branchLength;
      if (node.isLeaf) {
        leafNodes.push(node);
      }
    }
    tree.nodes.leafNodes = leafNodes;
    tree.nodes.rootNode = rootNode;
  }

  cache.set('source', state.source);
  cache.set('rootId', tree.state.rootId);

  return tree.nodes;
}
