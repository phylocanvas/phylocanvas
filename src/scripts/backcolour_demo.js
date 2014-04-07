(function(){
   "use strict";
    //window.devicePixelRatio = 2;

    // Construct tree object
    var phylocanvas = new PhyloCanvas.Tree('phylocanvas');
    phylocanvas.baseNodeSize = 5;

    phylocanvas.addListener('loaded', getData);
    phylocanvas.addListener('error', function(evt){
        alert(evt.message);
    });

    function getData()
    {
        phylocanvas.AJAX('/data/mrsa.json', 'GET', '', colour);
    }

    function colour(response){
        var colours = ['rgb(255, 0, 0)', 'rgb(0, 255, 0)', 'rgb(0,0,255)'];

        var data = JSON.parse(response.response);

        phylocanvas.setNodeColourAndShape(data.positive, colours[0], 't');
        phylocanvas.setNodeColourAndShape(data.negative, colours[1], 'o');

        phylocanvas.showLabels = false;
        phylocanvas.backColour = true;
        phylocanvas.setTreeType('circular');
    }

    // load tree via AJAX and render using default params
    phylocanvas.load('./tree.nwk');

})();
