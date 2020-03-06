import types from '../types';
import rotateSubtree from '../utils/rotateSubtree';

export default function (tree) {
  const { state } = tree;
  const nodes = tree.getVirtualTree();
  const cache = tree.cache('layout');

  if (isNaN(nodes.maxLabelWidth) || cache.get('styles') !== state.styles) {
    let maxLabel = '';

    for (const node of nodes.leafNodes) {
      const label = tree.getLabel(node);
      if (label.length > maxLabel.length) {
        maxLabel = label;
      }
    }
    nodes.maxLabelWidth = tree.measureTextWidth(maxLabel);
  }

  if (cache.get('rotatedIds') !== state.rotatedIds) {
    const rotatedIds = new Set(state.rotatedIds);
    if (cache.get('rotatedIds')) {
      for (const id of cache.get('rotatedIds')) {
        const node = nodes.nodeById[id];
        if (rotatedIds.has(node.id)) continue;
        rotateSubtree(tree, nodes, node);
        node.isInverted = false;
      }
    }
    for (const id of state.rotatedIds) {
      const node = nodes.nodeById[id];
      if (node.isInverted) continue;
      rotateSubtree(tree, nodes, node);
      node.isInverted = true;
    }
  }

  if (cache.get('collapsedIds') !== state.collapsedIds) {
    const collapsedIds = new Set(state.collapsedIds);
    for (let i = 0; i < nodes.postorderTraversal.length; i++) {
      const node = nodes.preorderTraversal[i];
      node.isCollapsed = collapsedIds.has(node.id);
      if (node.parent && (node.parent.isCollapsed || node.parent.isHidden)) {
        node.isHidden = true;
      } else {
        node.isHidden = false;
      }
    }

    for (let i = 0; i < nodes.postorderTraversal.length; i++) {
      const node = nodes.postorderTraversal[i];
      if (node.isLeaf) {
        node.visibleLeaves = 1;
      } else {
        if (node.isCollapsed) {
          node.visibleLeaves = 1;
        } else {
          node.visibleLeaves = 0;
          for (const child of node.children) {
            node.visibleLeaves += child.visibleLeaves;
          }
        }
      }
    }
  }

  if (
    cache.get('branchScale') !== state.branchScale ||
    cache.get('collapsedIds') !== state.collapsedIds ||
    cache.get('rootId') !== state.rootId ||
    cache.get('rotatedIds') !== state.rotatedIds ||
    cache.get('stepScale') !== state.stepScale ||
    cache.get('type') !== state.type
  ) {
    const t0 = performance.now();

    types[state.type].layoutNodes(tree, nodes);

    const t1 = performance.now();
    tree.log('layout nodes took ', (t1 - t0), ' milliseconds.');
  }

  cache.set('branchScale', state.branchScale);
  cache.set('collapsedIds', state.collapsedIds);
  cache.set('rootId', state.rootId);
  cache.set('rotatedIds', state.rotatedIds);
  cache.set('stepScale', state.stepScale);
  cache.set('type', state.type);
  cache.set('styles', state.styles);

  return nodes;
}
