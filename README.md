###PhyloCanvas - HTML5 Phylogenetic Tree visualisation

Written By Christopher I Powell under the supervision of Dr David Aanensen in the Labarotory of Professor Brian Spratt
Department of Infectious Disease Epidemiology, Imperial College London

PhyloCanvas is released under a GPL v3 Licence and documentation is realeased under a Creative Commons Share Alike Licence (CC BY-SA)

to start using PhyloCanvas : 

    // Construct tree object
    var phylocanvas = new PhyloCanvas.Tree('phylocanvas');
    
    // load tree via AJAX and render using default params
    phylocanvas.load('./tree.nwk');
