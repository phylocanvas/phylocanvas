import * as PhyloCanvas from '../src/index';
import historyPlugin from '../src/plugins/History';
import ajaxPlugin from '../src/plugins/Ajax';

PhyloCanvas.plugin(historyPlugin);
PhyloCanvas.plugin(ajaxPlugin);

let buttonForm = document.getElementById('buttons');
let tree = PhyloCanvas.createTree('phylocanvas', {
  history: {
    collapsed: true
  },
  defaultCollapsed: {
    // min: 30,
    // max: 50,
    color: 'green'
  }
});

tree.showLabels = true;
tree.hoverLabel = true;

// create buttons
buttonForm.addEventListener('submit', function (e) {
  e.preventDefault();
});

for (let treeType of Object.keys(PhyloCanvas.treeTypes)) {
  let button = document.createElement('button');

  button.innerHTML = treeType;

  button.addEventListener('click', () => tree.setTreeType(treeType));

  buttonForm.appendChild(button);
}

tree.on('error', function (event) { throw event.error; });

tree.on('loaded', function () {
  console.log('loaded');
  // tree.viewMetadataColumns();
});

tree.alignLabels = true;
tree.setTreeType('circular');

tree.load('./data/tree.nwk', function () {
  tree.backColour = true;
  tree.setNodeSize(5);
  tree.setNodeDisplay('B', { colour: 'red', shape: 'triangle' });
  tree.setNodeDisplay('C', { colour: 'blue', shape: 'star' });
  tree.setNodeDisplay('D', { colour: 'green' });
});
// tree.load('./data/tree.nwk', {}, () => { console.log('callback!'); });
window.tree = tree;
window.PhyloCanvas = PhyloCanvas;
// tree.load('(A:0.1,B:0.1,(C:0.1,D:0.1):0.1);');
