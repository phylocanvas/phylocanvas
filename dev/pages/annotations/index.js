// require('../polyfill');

import { TreeTypes } from '@cgps/phylocanvas/constants';
// import parse from '@cgps/phylocanvas/parse';
import createTree from '@cgps/phylocanvas/createTree';

import logPlugin from '../../plugins/log';
// import drawSteps from '../plugins/draw-steps';
import annotationsPlugin from '@cgps/phylocanvas-plugin-annotations';
import interactionsPlugin from '@cgps/phylocanvas-plugin-interactions';

const newick = '(Bovine:0.69395,(Gibbon:0.36079,(Orangutan:0.33636,(Gorilla:0.17147,(Chimp:0.19268,Human:0.11927):0.08386):0.06124):0.15057):0.54939,Mouse:1.21460);';

const tree = createTree(
  document.querySelector('#phylocanvas'),
  {
    source: newick,
    alignLabels: true,
    renderInternalLabels: true,
    // renderLeafLabels: false,
    // autoHideLabelSize: 1,
    // type: TreeTypes.Radial,
    type: TreeTypes.Circular,
    // type: TreeTypes.Hierarchical,
    // type: TreeTypes.Diagonal,
    // padding: 0,
    collapsedIds: [
      // '9',
      // '700',
    ],
    styles: {
      Mouse: { shape: 'square', fillStyle: 'red' },
      Human: { shape: 'triangle', fillStyle: 'green' },
      Gibbon: { shape: 'star', fillStyle: 'blue' },
      Bovine: { shape: 'hexagon', fillStyle: 'orange' },
      Chimp: { shape: 'hexastar', fillStyle: 'grey' },
      Orangutan: { shape: 'octastar', fillStyle: 'indigo' },
    },
    annotations: [
      {
        nodes: [ 'Human', 'Mouse' ],
        fillStyle: 'rgba(255, 0, 0, 0.14)',
        strokeStyle: '#EB2E6C',
        labelFillStyle: 'black',
        label: [ 'Are you a man', 'or a mouse?' ],
        callout: [ 5, 10, 45, 10 ],
      },
    ],
  },
  [
    interactionsPlugin,
    logPlugin,
    // drawSteps,
    annotationsPlugin,
  ]
);

window.tree = tree;
