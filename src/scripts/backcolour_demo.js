(function(){
   "use strict";
    //window.devicePixelRatio = 2;
    
    // Construct tree object
    var phylocanvas = new PhyloCanvas.Tree('phylocanvas');
    
    // load tree via AJAX and render using default params
    phylocanvas.load('./tree.nwk');
    
    function colour(){
        var colours = ['rgb(255, 0, 0)', 'rgb(0, 255, 0)', 'rgb(0,0,255)'];

        for(var i = phylocanvas.leaves.length; i--; ) {
            var n = Math.round(Math.random() * (colours.length-1));
            phylocanvas.leaves[i].colour = colours[n]
        };

        phylocanvas.backColour = true;
        phylocanvas.setTreeType('rectangular');
    }
    
    colour();
    
})();