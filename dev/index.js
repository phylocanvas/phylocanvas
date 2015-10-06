require('../src/polyfill');

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

tree.hoverLabel = true;
tree.alignLabels = true;
tree.padding = 0;
tree.setTreeType('rectangular');

// ./data/tree.nwk
// (A:0.1,B:0.1,(C:0.1,D:0.1):0.1);
tree.load('(A:0.1,B:0.1,(C:0.1,D:0.1):0.1);', function () {
  tree.backColour = true;
  tree.setNodeSize(10);
  // tree.textSize = 20;
  tree.setNodeDisplay('B', { colour: 'red', shape: 'triangle' });
  tree.setNodeDisplay('C', { colour: 'blue', shape: 'star' });
  tree.setNodeDisplay('D', { colour: 'green' });
  tree.updateLeaves(tree.findLeaves('(A|B)'), 'highlighted', true);

  tree.root.cascadeFlag('interactive', false);
  tree.updateLeaves(tree.findLeaves('C'), 'interactive', true);

  // let branch = tree.branches.C;
  // branch.label = 'Charlie';
  // branch.labelStyle = {
  //   textSize: 50,
  //   font: 'ubuntu',
  //   format: 'italic',
  //   colour: 'purple'
  // };
  // branch.radius = 2;

  tree.fitInPanel();

  tree.draw();
});
