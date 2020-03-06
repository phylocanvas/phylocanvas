// require('../polyfill');

import { TreeTypes } from '@cgps/phylocanvas/constants';
// import parse from '@cgps/phylocanvas/parse';
import createTree from '@cgps/phylocanvas/createTree';

import logPlugin from '../../plugins/log';
import interactionsPlugin from '@cgps/phylocanvas-plugin-interactions/index';
import '@cgps/phylocanvas-plugin-interactions/styles.css';
import contextMenu from '@cgps/phylocanvas-plugin-context-menu/index';
import '@cgps/phylocanvas-plugin-context-menu/styles.css';

const newick =
'(Bovine:0.69395,(Gibbon:0.36079,(Orangutan:0.33636,(Gorilla:0.17147,(Chimp:0.19268,Human:0.11927):0.08386):0.06124):0.15057):0.54939,Mouse:1.2146);'
// '((Bovine:0.69395,Mouse:1.2146):0.54939,(Gibbon:0.36079,(Orangutan:0.33636,(Gorilla:0.17147,(Chimp:0.19268,Human:0.11927):0.08386):0.06124):0.15057):0.54939);'
;

const tree = createTree(
  document.querySelector('#phylocanvas'),
  {
    source: newick,
    // alignLabels: true,
    renderInternalLabels: true,
    // renderLeafLabels: false,
    // autoHideLabelSize: 1,
    // type: TreeTypes.Circular,
    // padding: 0,
    // rootId: '4',
    collapsedIds: [
      // '8',
    ],
    rotatedIds: [
      '6',
    ],
    styles: {
      Mouse: { shape: 'square', fillStyle: 'red' },
      Human: { shape: 'triangle', fillStyle: 'green' },
      Gibbon: { shape: 'star', fillStyle: 'blue' },
      Bovine: { shape: 'hexagon', fillStyle: 'orange' },
      Chimp: { shape: 'hexastar', fillStyle: 'grey' },
      Orangutan: { shape: 'octastar', fillStyle: 'indigo' },
    },
    contextMenu: {
      treeMenuItems: [
        // {
        //   section: 0,
        //   index: 2,
        //   method: 'ToggleMetadataLabels',
        //   text: 'Show/Hide Block Labels',
        // },
      ],
      nodeMenuItems: [
        // {
        //   section: 0,
        //   index: 2,
        //   method: 'ToggleMetadataLabels',
        //   text: 'Hide node',
        // },
      ],
    },
  },
  [
    contextMenu,
    interactionsPlugin,
    logPlugin,
    // drawSteps,
    // annotationsPlugin,
  ]
);

// tree.collapseNode(tree.getNodeById('6'));
// tree.collapseNode(tree.getNodeById('7'));

// tree.collapseNode(tr

tree.onToggleMetadataLabels = (_, node) => console.log('HIDE', node);

window.tree = tree;
