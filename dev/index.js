import * as PhyloCanvas from '../src/index';

let buttonForm = document.getElementById('buttons');
let tree = new PhyloCanvas.Tree('phylocanvas', {
  history: {
    collapsed: true
  }
  // defaultCollapsed: {
  //   min: 30,
  //   max: 100,
  //   color: 'green'
  // }
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

tree.on('error', function (e) { throw e; });

tree.on('loaded', function () {
  tree.setNodeSize(5);
  tree.backColour = true;
  tree.setNodeColourAndShape('BBBBB', 'red');
  tree.setNodeColourAndShape('CCCCC', 'blue');
  tree.setNodeColourAndShape('DDDDD', 'green');
  tree.alignLabels = true;
  tree.setTreeType('circular');
  tree.viewMetadataColumns();
});

tree.load('((B:0.1,(C:0.2,D:0.3)E:0.1)F:0.1)A:0.1;');
// tree.load('./data/tree.nwk');
// tree.load('(A:0.1,B:0.1,(C:0.1,D:0.1):0.1);');
