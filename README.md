#PhyloCanvas - HTML5 Phylogenetic Tree visualisation

Written By Christopher I Powell under the supervision of Dr David Aanensen in the Labarotory of Professor Brian Spratt
Department of Infectious Disease Epidemiology, Imperial College London

PhyloCanvas is released under a GPL v3 Licence and documentation is realeased under a Creative Commons Share Alike Licence (CC BY-SA)

## Getting started

PhyloCanvas is now built using [Grunt](http://gruntjs.com) and tested using [Mocha](http://visionmedia.github.io/mocha/), [chai](http://chaijs.com) and [expect.js](https://github.com/LearnBoost/expect.js/)

To build PhyloCanvas, after cloning
    
    npm install
    bower install //currently there are no dependencies so this is redundant
    grunt test
    grunt build //or grunt serve to run the demo locally
    

## To start using PhyloCanvas : 

    // Construct tree object
    var phylocanvas = new PhyloCanvas.Tree('phylocanvas');
    
    // load tree via AJAX and render using default params - NB: uses AJAX
    phylocanvas.load('./tree.nwk');

