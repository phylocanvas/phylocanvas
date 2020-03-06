// require('../polyfill');

import createTree from '@cgps/phylocanvas/createTree';

import exportSVGPlugin from '@cgps/phylocanvas-plugin-svg-export';

const newick = '(Bovine:0.69395,(Gibbon:0.36079,(Orangutan:0.33636,(Gorilla:0.17147,(Chimp:0.19268,Human:0.11927):0.08386):0.06124):0.15057):0.54939,Mouse:1.21460);';

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
  },
  [
    exportSVGPlugin,
  ]
);

window.tree = tree;
