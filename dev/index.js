import * as PhyloCanvas from '../src/index';

let buttonForm = document.getElementById('buttons');
let tree = new PhyloCanvas.Tree('phylocanvas', {
  history: {
    collapsed: true
  },
  defaultCollapsed: {
    min: 30,
    max: 100,
    color: 'green'
  }
});

tree.showLabels = true;
tree.hoverLabel = true;

// create buttons
buttonForm.addEventListener('submit', function (e) {
  e.preventDefault();
});

for (let treeType of Object.keys(tree.branchRenderers)) {
  let button = document.createElement('button');

  button.innerHTML = treeType;

  button.addEventListener('click', () => tree.setTreeType(treeType));

  buttonForm.appendChild(button);
}

tree.on('error', function (e) { throw e.message; });

tree.load('./data/tree.nwk');
// tree.load('(A:0.1,B:0.2,(C:0.3,D:0.4):0.5);');
