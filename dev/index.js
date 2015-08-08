import PhyloCanvas, * as phyloComponents from '../src/index';

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

for (let treeType of Object.keys(phyloComponents.treeTypes)) {
  let button = document.createElement('button');

  button.innerHTML = treeType;

  button.addEventListener('click', () => tree.setTreeType(treeType));

  buttonForm.appendChild(button);
}

tree.on('error', function (event) { throw event.error; });

tree.on('loaded', function () {
  console.log('loaded');
});

tree.alignLabels = true;
tree.setTreeType('circular');

// ./data/tree.nwk
// (A:0.1,B:0.1,(C:0.1,D:0.1):0.1);
tree.load('(A:0.1,B:0.1,(C:0.1,D:0.1):0.1);', function () {
  tree.backColour = true;
  tree.setNodeSize(5);
  tree.setNodeDisplay('B', { colour: 'red', shape: 'triangle' });
  tree.setNodeDisplay('C', { colour: 'blue', shape: 'star' });
  tree.setNodeDisplay('D', { colour: 'green' });
});
