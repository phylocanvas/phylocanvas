window.onload = function(){
   "use strict";

    // Construct tree object
    var phylocanvas = new PhyloCanvas.Tree('phylocanvas');
    phylocanvas.setTreeType('rectangular');

    // load tree via AJAX and render using default params
    phylocanvas.load('./tree.nwk');

    window.phylocanvas = phylocanvas;

};
