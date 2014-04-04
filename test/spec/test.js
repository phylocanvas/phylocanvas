/*global describe, it */

(function () {
    'use strict';
    describe('Phlocanvas', function () {
        
        describe('Branch Functions', function () {
            it('should get the right colour', function()
               {
                var color1 = 'rgba(255,0,0,1)';
                var color2 = 'rgba(0,255,0,1)';

                var branch = new PhyloCanvas.Branch(),
                    branch1 = new PhyloCanvas.Branch(),
                    branch2 = new PhyloCanvas.Branch();

                    branch1.color = color1;
                    branch2.color = color1;
                   
                   branch.addChild(branch1);
                   branch.addChild(branch2);
                   
                   var cols = branch.getChildColours();
                   
                   expect(cols.length).to.equal(1);
                   expect(cols[0]).to.equal(color1);
                   
               });
            
             it('should get the right colours', function()
               {
                var color1 = 'rgba(255,0,0,1)';
                var color2 = 'rgba(0,255,0,1)';

                var branch = new PhyloCanvas.Branch(),
                    branch1 = new PhyloCanvas.Branch(),
                    branch2 = new PhyloCanvas.Branch();

                    branch1.color = color1;
                    branch2.color = color2;
                   
                   branch.addChild(branch1);
                   branch.addChild(branch2);
                   
                   var cols = branch.getChildColours();
                   
                   expect(cols.length).to.equal(2);
                   expect(cols[0]).to.equal(color1);
                   expect(cols[1]).to.equal(color2);
                   
               });
            
        });
    });
})();
