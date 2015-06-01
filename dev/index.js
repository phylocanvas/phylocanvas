var PhyloCanvas = require('../src/index');
var buttonForm = document.getElementById('buttons');

var tree = new PhyloCanvas.Tree('phylocanvas', {
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

Object.keys(tree.branchRenderers).forEach(function (treeType) {
  var button = document.createElement('button');

  button.innerHTML = treeType;
  button.style.textTransform = 'capitalize';

  button.addEventListener('click', function () {
    tree.setTreeType(treeType);
  });

  buttonForm.appendChild(button);
});

tree.load('./data/tree.nwk');
