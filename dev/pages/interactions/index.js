import { createTree } from '@cgps/phylocanvas';

import logPlugin from '../../plugins/log';
import interactionsPlugin from '@cgps/phylocanvas-plugin-interactions/index';
import '@cgps/phylocanvas-plugin-interactions/styles.css';

const newick =
'(Bovine:0.69395,(Gibbon:0.36079,(Orangutan:0.33636,(Gorilla:0.17147,(Chimp:0.19268,Human:0.11927):0.08386):0.06124):0.15057):0.54939,Mouse:1.2146);';

const tree = createTree(
  document.querySelector('#phylocanvas'),
  {
    source: newick,
    styles: {
      Mouse: { shape: 'square', fillStyle: 'red' },
      Human: { shape: 'triangle', fillStyle: 'green' },
      Gibbon: { shape: 'star', fillStyle: 'blue' },
      Bovine: { shape: 'hexagon', fillStyle: 'orange' },
      Chimp: { shape: 'hexastar', fillStyle: 'grey' },
      Orangutan: { shape: 'octastar', fillStyle: 'indigo' },
    },
    interactions: {
      // highlight: false,
      // pan: false,
      // selection: false,
      // tooltip: false,
      // zoom: false,
    },
  },
  [
    logPlugin,
    interactionsPlugin,
  ]
);

window.tree = tree;
