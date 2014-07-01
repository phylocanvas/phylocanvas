window.onload = function(){
   "use strict";

    // Construct tree object
    var phylocanvas = new PhyloCanvas.Tree('phylocanvas');
    phylocanvas.showLabels = false;
    phylocanvas.hoverLabel = true;

    // load tree via AJAX and render using default params
    phylocanvas.load('./tree.nwk');

    window.phylocanvas = phylocanvas;

};
