// require('../polyfill');

import createTree from '@cgps/phylocanvas/createTree';

import logPlugin from '../../plugins/log';
import '@cgps/phylocanvas-plugin-interactions/styles.css';
import interactionsPlugin from '@cgps/phylocanvas-plugin-interactions/index';

const newick = '(Bovine:0.69395,(Gibbon:0.36079,(Orangutan:0.33636,(Gorilla:0.17147,(Chimp:0.19268,Human:0.11927):0.08386):0.06124):0.15057):0.54939,Mouse:1.21460);';

const tree = createTree(
  document.querySelector('#phylocanvas'),
  {
    source: newick,
  },
  [
    logPlugin,
    interactionsPlugin,
    // tooltipPlugin,
  ]
);

window.tree = tree;
