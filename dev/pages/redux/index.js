// require('../polyfill');

import { createSelector } from 'reselect';

import createTree from '@cgps/phylocanvas/createTree';

import logPlugin from '../../plugins/log';
import reduxPlugin from '@cgps/phylocanvas-plugin-redux';
import interactionsPlugin from '@cgps/phylocanvas-plugin-interactions';

import store from './store';

const newick = '(Bovine:0.69395,(Gibbon:0.36079,(Orangutan:0.33636,(Gorilla:0.17147,(Chimp:0.19268,Human:0.11927):0.08386):0.06124):0.15057):0.54939,Mouse:1.21460);';
// import { StrepTree as newick } from '../../tmp/trees';

const selector = createSelector(
  state => state.tree.firstTree,
  state => state.filter.items,
  (tree, items) => ({ ...tree, selectedIds: items })
);

const tree = createTree(
  document.querySelector('#phylocanvas'),
  {
    source: newick,
    type: 'cr',
    // ...JSON.parse('{"autoCentre":true,"autoSize":true,"autoHideLabelSize":6,"branchScale":459.9260176180269,"collapsedIds":[],"fillStyle":"#222","fontFamily":"serif","fontSize":6,"highlightedId":null,"highlightedStyle":"#3C7383","internalNodeStyle":{"shape":"dot"},"leafNodeStyle":{"shape":"circle"},"maxFontSize":24,"maxLabelLength":26,"maxScale":10,"maxSize":16,"minFontSize":1,"minScale":0.4853697748135467,"minSize":1,"nodeSize":3,"offsetX":281.30673951143206,"offsetY":291.5859442712076,"padding":32,"scale":0.9707395496270934,"selectableInternalNodes":true,"selectableLeafNodes":true,"selectedIds":[],"selectedStyle":"#3C7383","stepScale":8,"strokeStyle":"#222","lineWidth":1,"type":"cr","renderLabels":true,"renderLeafLabels":true,"renderInternalLabels":true,"zoomFactor":3,"enableHighlight":true,"enableSelection":true,"enableZoom":true,"enablePanning":true,"stateKey":"firstTree","source":"(Bovine:0.69395,(Gibbon:0.36079,(Orangutan:0.33636,(Gorilla:0.17147,(Chimp:0.19268,Human:0.11927):0.08386):0.06124):0.15057):0.54939,Mouse:1.21460);"}'),
  },
  [
    logPlugin,
    interactionsPlugin,
    reduxPlugin(store, selector, 'firstTree'),
  ]
);
window._tree = tree;

// window._tree2 = createTree(
//   document.querySelector('#phylocanvas2'),
//   {
//     source: newick,
//   },
//   [
//     logPlugin,
//     interactionsPlugin,
//     reduxPlugin(store, state => state.tree.secondTree, 'secondTree'),
//   ]
// );

// Checkboxes

const div = document.createElement('div');
div.id = 'checkboxes';
document.body.append(div);

function renderCheckBoxes(items, filteredItems = []) {
  while (div.firstChild) div.removeChild(div.firstChild);

  for (const item of items) {
    const label = document.createElement('label');
    label.style = 'margin: 16px; cursor: pointer;';

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = filteredItems.includes(item.id);
    input.onchange = () => store.dispatch({
      type: `${input.checked ? 'APPEND_TO' : 'REMOVE_FROM'}_FILTER`,
      payload: item.id,
    });

    label.append(document.createTextNode(item.id));
    label.append(input);
    div.append(label);
  }
}

// store.subscribe(() => {
//   const { filter } = store.getState();
//   renderCheckBoxes(tree.nodes.leafNodes, filter.items);
// });

// renderCheckBoxes(tree.nodes.leafNodes);

console.log(PHYLOCANVAS_PAGE);
