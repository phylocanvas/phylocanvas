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

for (let treeType of Object.keys(PhyloCanvas.branchRenderers)) {
  let button = document.createElement('button');

  button.innerHTML = treeType;

  button.addEventListener('click', () => tree.setTreeType(treeType));

  buttonForm.appendChild(button);
}

tree.on('error', function (e) { throw e.message; });

tree.on('loaded', function () {
  // tree.setNodeSize(5);
  // tree.setNodeColourAndShape([ '3_RF122', '2_JKD6159', '272_AT_1776' ], 'orange', 't');
  for(var i=0;i<=12;i++){
    if(tree.leaves[i])
      tree.leaves[i].data = {col: 1, x: 0, a:1, c:1};
  }
  tree.nodeAlign=true;
  tree.setTreeType('rectangular');
  tree.viewMetadataColumns();

});

tree.load('((B:0.2,(C:0.3,D:0.4)E:0.5)F:0.1)A;');
// tree.load('./data/sample_nexus.nxs', { name: 'basic' });
// tree.load('(A:0.1,B:0.1,(C:0.1,D:0.1):0.1);');
