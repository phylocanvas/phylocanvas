/*global describe, it */

(function () {
    'use strict';
    describe('Phlocanvas', function () {
        
        describe('Branch Functions', function () {
            it('should get the right colour', function()
               {
                var colour1 = 'rgba(255,0,0,1)';
                var colour2 = 'rgba(0,255,0,1)',
                   div = document.createElement('div');
                   
                   document.body.appendChild(div);
                    
                   var tree = new PhyloCanvas.Tree(div);
                   
                   tree.backColour = true;

                var branch = new PhyloCanvas.Branch(),
                    branch1 = new PhyloCanvas.Branch(),
                    branch2 = new PhyloCanvas.Branch();

                    branch1.colour = colour1;
                    branch2.colour = colour1;
                   
                   branch.addChild(branch1);
                   branch.addChild(branch2);
                   
                   branch.tree = tree;
                   
                   var cols = branch.getChildColours();
                   
                   expect(cols.length).to.equal(1);
                   expect(cols[0]).to.equal(colour1);
                   
               });
            
             it('should get the right colours', function()
               {
                var colour1 = 'rgba(255,0,0,1)';
                var colour2 = 'rgba(0,255,0,1)',
                    div = document.createElement('div');
                   
                   document.body.appendChild(div);
                    
                   var tree = new PhyloCanvas.Tree(div);
                   
                   tree.backColour = true;

                var branch = new PhyloCanvas.Branch(),
                    branch1 = new PhyloCanvas.Branch(),
                    branch2 = new PhyloCanvas.Branch();

                    branch1.colour = colour1;
                    branch2.colour = colour2;
                   
                   branch.addChild(branch1);
                   branch.addChild(branch2);
                   
                   branch.tree = tree;
                   
                   var cols = branch.getChildColours();
                   
                   expect(cols.length).to.equal(2);
                   expect(cols[0]).to.equal(colour1);
                   expect(cols[1]).to.equal(colour2);
                   
               });
            
             it('should get the right parent branch colour', function()
               {
                var colour1 = 'rgba(255,0,0,1)',
                 colour2 = 'rgba(0,255,0,1)',
                    div = document.createElement('div');
                   
                   document.body.appendChild(div);
                    
                   var tree = new PhyloCanvas.Tree(div);
                   
                   tree.backColour = true;
                   
                   
                   
                var branch = new PhyloCanvas.Branch(),
                    branch1 = new PhyloCanvas.Branch(),
                    branch2 = new PhyloCanvas.Branch();

                    branch1.colour = colour1;
                    branch2.colour = colour1;
                   
                   branch.addChild(branch1);
                   branch.addChild(branch2);
                   
                   
                   branch.tree = tree;
                   
                   var col = branch.getColour();
                
                   expect(col).to.equal(colour1);
                   
               });
            
             it('should get the right colours', function()
               {
                var colour1 = 'rgba(255,0,0,1)',
                    colour2 = 'rgba(0,255,0,1)',
                    colour3 = 'rgba(0,0,0,1)',
                    div = document.createElement('div');
                   document.body.appendChild(div);
                    var tree = new PhyloCanvas.Tree(div);
                   
                   tree.branchColour = colour3;
                       tree.backColour = true;
                   
                   
                var branch = new PhyloCanvas.Branch(),
                    branch1 = new PhyloCanvas.Branch(),
                    branch2 = new PhyloCanvas.Branch();

                    branch1.colour = colour1;
                    branch2.colour = colour2;
                   
                   branch.addChild(branch1);
                   branch.addChild(branch2);
                   
                   branch.tree = tree;
                   
                   var col = branch.getColour();
                   
                   expect(col).to.equal(colour3);
                   
               });
            
        });
    });
})();
