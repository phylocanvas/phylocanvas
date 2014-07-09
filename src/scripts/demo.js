window.onload = function(){
   "use strict";

    // Construct tree object
    var phylocanvas = new PhyloCanvas.Tree('phylocanvas', { history_collapsed : true });
    phylocanvas.showLabels = true;
    phylocanvas.hoverLabel = true;
    phylocanvas.setTreeType('rectangular');

    // load tree via AJAX and render using default params
    phylocanvas.load('./tree.nwk');

    window.phylocanvas = phylocanvas;


};
