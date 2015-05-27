window.onload = function () {
  'use strict';

  // Construct tree object
  var phylocanvas = new window.PhyloCanvas.Tree('phylocanvas', {
    history: {
      collapsed: true
    },
    defaultCollapsed: {
      min: 30,
      max: 100,
      color: 'green'
    }
  });
  phylocanvas.showLabels = true;
  phylocanvas.hoverLabel = true;

  // load tree via AJAX and render using default params
  phylocanvas.load('./data/tree.nwk');

  // phylocanvas.on('historytoggle', function (e) {
  //   alert(e.isOpen ? 'history is open' : 'history is closed');
  // });

  // phylocanvas.on('loaded', function () {
  //   phylocanvas.backColour = true;
  //   phylocanvas.setNodeColourAndShape([ '3_RF122', '272_AT_1776' ], 'rgb(250, 150, 50)', 'x');
  //   phylocanvas.draw();
  // });

  window.phylocanvas = phylocanvas;
};
