// require('../polyfill');

import createTree from '@cgps/phylocanvas/createTree';
import { TreeTypes } from '@cgps/phylocanvas/constants';

import logPlugin from '../../plugins/log';
import scalebarPlugin from '@cgps/phylocanvas-plugin-scalebar/index';
import interactionsPlugin from '@cgps/phylocanvas-plugin-interactions';

const newick = '(Bovine:0.69395,(Gibbon:0.36079,(Orangutan:0.33636,(Gorilla:0.17147,(Chimp:0.19268,Human:0.11927):0.08386):0.06124):0.15057):0.54939,Mouse:1.21460);';

const tree = createTree(
  document.querySelector('#phylocanvas'),
  {
    source: newick,
    alignLabels: true,
    renderInternalLabels: true,
    type: TreeTypes.Rectangular,
    scalebar: {
      background: 'rgba(255, 239, 213, 0.87)',
      padding: 4,
      textBaselineOffset: 2,
      digits: 0,
    },
    fontFamily: 'Ubuntu',
  },
  [
    logPlugin,
    interactionsPlugin,
    scalebarPlugin,
  ]
);

window.tree = tree;
