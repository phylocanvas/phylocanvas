// require('../polyfill');
import '@cgps/phylocanvas-plugin-interactions/styles.css';
import '@cgps/phylocanvas-plugin-context-menu/styles.css';

import { TreeTypes } from '@cgps/phylocanvas/constants';
// import parse from '@cgps/phylocanvas/parse';
import createTree from '@cgps/phylocanvas/createTree';

import logPlugin from '../plugins/log';
import drawStepsPlugin from '../plugins/draw-steps';
import interactionsPlugin from '@cgps/phylocanvas-plugin-interactions/index';
import contextMenuPlugin from '@cgps/phylocanvas-plugin-context-menu/index';
import svgExportPlugin from '@cgps/phylocanvas-plugin-svg-export/index';
import scaleBarPlugin from '@cgps/phylocanvas-plugin-scalebar/index';

const newick =
  '(Bovine:0.69395,(Gibbon:0.36079,(Orangutan:0.33636,(Gorilla:0.17147,(Chimp:0.19268,Human:0.11927):0.08386):0.06124):0.15057):0.54939,Mouse:1.21460);';

// import { demoTree as newick } from '../files/trees';
// import { ZikaTree as newick } from '../files/trees';
// import { largeTree as newick } from '../files/trees';
// import { KlebsiellaTree as newick } from '../files/trees';
// import { HugeTree as newick } from '../files/trees';
// import { StrepTree as newick } from '../files/trees';

// import newick from '../files/tree.nwk';
// import newick from '../files/strep-tree.nwk';
// import cladogram from '../files/MLPhylogeny_Cdiff3monthEIP.nwk';

const tree = createTree(
  document.querySelector('#phylocanvas'),
  {
    source: newick,
    // alignLabels: true,
    // renderInternalLabels: true,
    // renderLeafLabels: false,
    // autoHideLabelSize: 1,
    // type: TreeTypes.Radial,
    // type: TreeTypes.Circular,
    // type: TreeTypes.Hierarchical,
    // type: TreeTypes.Diagonal
    type: TreeTypes.Rectangular,
    // padding: 0,
    nodeSize: 14,
    collapsedIds: [
      // '9',
      // '700',
    ],
    styles: {
      Mouse: { shape: 'square', fillStyle: 'red', strokeStyle: 'red' },
      Human: { shape: 'triangle', fillStyle: 'green', strokeStyle: 'green', fontStyle: 'bold italic' },
      Gibbon: { shape: 'star', fillStyle: 'blue', strokeStyle: 'green' },
      Bovine: { shape: 'hexagon', fillStyle: 'orange', strokeStyle: 'orange' },
      Chimp: { shape: 'none', fillStyle: 'grey', strokeStyle: 'green', fontStyle: 'italic' },
      Orangutan: {
        shape: 'octastar',
        fillStyle: 'indigo',
        strokeStyle: 'indigo',
      },
      Gorilla: { strokeStyle: 'green', fontStyle: 'bold' },
    },
    styleNodeLines: true,
  },
  [
    contextMenuPlugin,
    interactionsPlugin,
    logPlugin,
    svgExportPlugin,
    // drawStepsPlugin,
  ]
);

const button = document.createElement('button');
button.innerText = 'Set Viewport';

button.onclick = () => {
  createTree(document.querySelector('#phylocanvas2'), tree.state);
};

document.body.appendChild(button);

window.tree = tree;
