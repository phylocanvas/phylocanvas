(function () {
  'use strict';
  // window.devicePixelRatio = 2;

  // Construct tree object
  var phylocanvas = new window.PhyloCanvas.Tree('phylocanvas');
  phylocanvas.baseNodeSize = 5;

  function colour(response) {
    var colours = [ 'rgb(255, 0, 0)', 'rgb(0, 255, 0)', 'rgb(255,255,0)' ];

    var data = JSON.parse(response.response);

    phylocanvas.setNodeColourAndShape(data.positive, colours[0], 't');
    phylocanvas.setNodeColourAndShape(data.negative, colours[1], 'o');

    phylocanvas.showLabels = false;
    phylocanvas.backColour = function (node) {
      if (node.children.length) {
        var childColours = node.getChildColours();
        if (childColours.length === 1) {
          return childColours[0];
        } else {
          return colours[2];
        }
      } else {
        return node.colour;
      }
    };
  }

  function getData() {
    phylocanvas.AJAX('/data/mrsa.json', 'GET', '', colour);
  }

  phylocanvas.addListener('loaded', getData);
  phylocanvas.addListener('error', function (evt) {
    alert(evt.message);
  });

  phylocanvas.setTreeType('rectangular');
  // load tree via AJAX and render using default params
  phylocanvas.load('./data/tree.nwk');

  window.phylocanvas = phylocanvas;
})();
