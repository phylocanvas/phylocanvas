require('../src/polyfill');

import PhyloCanvas, * as phyloComponents from '../src/index';

const buttonForm = document.getElementById('buttons');
const tree = PhyloCanvas.createTree('phylocanvas', {
  history: {
    collapsed: true,
  },
  defaultCollapsed: {
    // min: 30,
    // max: 50,
    color: 'green',
  },
});

// create buttons
buttonForm.addEventListener('submit', function (e) {
  e.preventDefault();
});

for (const treeType of Object.keys(phyloComponents.treeTypes)) {
  const button = document.createElement('button');

  button.innerHTML = treeType;

  button.addEventListener('click', tree.setTreeType.bind(tree, treeType));

  buttonForm.appendChild(button);
}

const subtreeButton = document.createElement('button');
subtreeButton.innerHTML = 'subtree';
subtreeButton.addEventListener('click', () => {
  const branch = tree.root.children[2];
  console.log(tree.root);
  branch.redrawTreeFromBranch();
});
document.body.appendChild(subtreeButton);

const resetButton = document.createElement('button');
resetButton.innerHTML = 'Redraw Original';
resetButton.addEventListener('click', () => tree.redrawOriginalTree());
document.body.appendChild(resetButton);


tree.on('error', function (event) { throw event.error; });

tree.on('loaded', function () {
  console.log('loaded');
});

tree.on('original-tree', function () {
  console.log('original');
});

tree.hoverLabel = true;
tree.alignLabels = true;
tree.padding = 100;
tree.setTreeType('rectangular');

// ./data/tree.nwk
// (A:0.1,B:0.1,(C:0.1,D:0.1):0.1);
tree.load('(A:0.1,B:0.1,(C:0.2,D:0.1):0.1);', function () {
  tree.backColour = true;
  tree.setNodeSize(10);
  // tree.textSize = 20;
  tree.setNodeDisplay('B', {
    colour: 'red',
    shape: 'triangle',
    leafStyle: {
      strokeStyle: '#777',
      lineWidth: 3,
    },
  });
  tree.setNodeDisplay('C', {
    colour: 'blue',
    shape: 'star',
    leafStyle: {
      lineWidth: 0,
    },
    labelStyle: {
      colour: 'red',
    },
  });
  tree.setNodeDisplay('D', {
    colour: 'green',
    shape: 'square',
    leafStyle: {
      strokeStyle: '#222',
      fillStyle: 'green',
      lineWidth: 6,
    },
  });

  tree.updateLeaves(tree.findLeaves('(A|B)'), 'highlighted', true);

  // tree.branches.A.radius = 2;
  // tree.branches.B.radius = 2;

  // tree.root.cascadeFlag('interactive', false);
  // tree.updateLeaves(tree.findLeaves('C'), 'interactive', true);

  const branch = tree.branches.B;
  branch.label = 'Bravo';
  branch.labelStyle = {
    textSize: 50,
    font: 'ubuntu',
    format: 'italic',
    colour: 'purple',
  };
  branch.radius = 2;

  tree.fitInPanel();

  tree.draw();
});
