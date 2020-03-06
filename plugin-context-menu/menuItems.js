import aboutSection from './about';

import {
  createLeafLabelsLink,
  createSelectedLabelsLink,
  createNewickLink,
  createImageLink,
} from './createHtmlElements';

export const treeMenuItems = [
  [
    {
      text: 'Show labels',
      handler: tree => tree.toggleLeafLabels(),
      isActive: tree => tree.state.renderLeafLabels,
    },
    {
      text: 'Align labels',
      handler: tree => tree.toggleAlignLeafLabels(),
      isActive: tree => tree.state.alignLabels,
    },
  ],

  [
    {
      text: 'Fit in panel',
      handler: tree => tree.fitInPanel(),
    },
    {
      text: 'Expand collapsed subtrees',
      visible: tree => tree.state.collapsedIds.length > 0,
      handler: tree => tree.resetCollapsedNodes({ refit: true }),
    },
    {
      text: 'Redraw original tree',
      handler: tree => tree.setSource(tree.nodes.originalSource),
    },
  ],

  [
    (tree, node) => createLeafLabelsLink(tree, node, 'Export leaf labels'),
    (tree, node) =>
      createSelectedLabelsLink(tree, node, 'Export selected labels'),
    (tree, node) => createNewickLink(tree, node, 'Export as newick file'),
    (tree, node) => createImageLink(tree, node, 'Export as image'),
  ],

  aboutSection,
];

export const nodeMenuItems = [
  [
    {
      text: (tree, node) => (
        tree.state.collapsedIds.indexOf(node.id) === -1 ?
          'Collapse subtree' : 'Expand subtree'
      ),
      handler: (tree, node) => tree.collapseNode(node, { refit: true }),
    },
    {
      text: 'Rotate subtree',
      handler: (tree, node) => tree.rotateNode(node, { refit: false }),
    },
  ],

  [
    {
      text: 'View subtree',
      handler: (tree, node) => tree.setRoot(node),
    },
    {
      text: 'Re-root tree',
      handler: (tree, node) => tree.rerootNode(node),
    },
  ],

  [
    (tree, node) =>
      createLeafLabelsLink(tree, node, 'Export subtree leaf labels'),
    (tree, node) =>
      createNewickLink(tree, node, 'Export subtree as newick file'),
  ],

  aboutSection,
];
