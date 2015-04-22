window.onload = function(){
   "use strict";

    // Construct tree object
    var phylocanvas = new PhyloCanvas.Tree('phylocanvas', { historyCollapsed: true });
    phylocanvas.showLabels = true;
    phylocanvas.hoverLabel = true;
    phylocanvas.setTreeType('rectangular');

    // load tree via AJAX and render using default params
    phylocanvas.load('./tree.nwk');

    phylocanvas.on('historytoggle', function (e) {
      alert(e.isOpen ? 'history is open' : 'history is closed');
    });

    window.phylocanvas = phylocanvas;


};
