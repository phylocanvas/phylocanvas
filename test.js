(function(){
   "use strict";
    // Construct tree object
    var phylocanvas = new PhyloCanvas.Tree('phylocanvas');
    
    // load tree via AJAX and render using default params
    phylocanvas.load('./tree.nwk');
    
})();