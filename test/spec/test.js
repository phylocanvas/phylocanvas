import { expect } from 'chai';

describe('PhyloCanvas', function () {

  beforeEach(function () {
    var div = document.createElement('div');
    div.id = 'test';
    document.body.appendChild(div);
  });

  afterEach(function () {
    var div = document.getElementById('test');
    document.body.removeChild(div);
  });

  describe('Branch Functions', function () {

    it('should get the right colour', function () {
      var colour1 = 'rgba(255,0,0,1)';
      var colour2 = 'rgba(0,255,0,1)';
      var tree = new PhyloCanvas.Tree('test');
      var branch = new PhyloCanvas.Branch();
      var branch1 = new PhyloCanvas.Branch();
      var branch2 = new PhyloCanvas.Branch();
      var cols;

      tree.backColour = true;

      branch1.colour = colour1;
      branch2.colour = colour2;

      branch.addChild(branch1);
      branch.addChild(branch2);

      branch.tree = tree;

      cols = branch.getChildColours();

      expect(cols.length).to.equal(2);
      expect(cols[0]).to.equal(colour1);
    });

    it('should get the right colours', function () {
      var colour1 = 'rgba(255,0,0,1)';
      var colour2 = 'rgba(0,255,0,1)';
      var tree = new PhyloCanvas.Tree('test');
      var branch = new PhyloCanvas.Branch();
      var branch1 = new PhyloCanvas.Branch();
      var branch2 = new PhyloCanvas.Branch();
      var cols;

      tree.backColour = false;

      branch1.colour = colour1;
      branch2.colour = colour2;

      branch.addChild(branch1);
      branch.addChild(branch2);

      branch.tree = tree;

      cols = branch.getChildColours();

      expect(cols.length).to.equal(2);
      expect(cols[0]).to.equal(colour1);
      expect(cols[1]).to.equal(colour2);
    });

    it('should get the right parent branch colour', function () {
      var colour1 = 'rgba(255,0,0,1)';
      var tree = new PhyloCanvas.Tree('test');
      var branch = new PhyloCanvas.Branch();
      var branch1 = new PhyloCanvas.Branch();
      var branch2 = new PhyloCanvas.Branch();
      var col;

      tree.backColour = true;

      branch1.colour = colour1;
      branch2.colour = colour1;

      branch.addChild(branch1);
      branch.addChild(branch2);

      branch.tree = tree;

      col = branch.getColour();

      expect(col).to.equal(colour1);
    });

    it('should get the right colours', function () {
      var colour1 = 'rgba(255,0,0,1)';
      var colour2 = 'rgba(0,255,0,1)';
      var colour3 = 'rgba(0,0,0,1)';
      var tree = new PhyloCanvas.Tree('test');
      var branch = new PhyloCanvas.Branch();
      var branch1 = new PhyloCanvas.Branch();
      var branch2 = new PhyloCanvas.Branch();
      var col;

      tree.branchColour = colour3;
      tree.backColour = true;

      branch1.colour = colour1;
      branch2.colour = colour2;

      branch.addChild(branch1);
      branch.addChild(branch2);

      branch.tree = tree;

      col = branch.getColour();

      expect(col).to.equal(colour3);
    });

    it('should be true if parent is collapsed', function () {
      var branch = new PhyloCanvas.Branch();
      var branch1 = new PhyloCanvas.Branch();
      var branch2 = new PhyloCanvas.Branch();

      branch.addChild(branch1);
      branch.addChild(branch2);

      branch.collapsed = true;

      expect(branch1.hasCollapsedAncestor()).to.equal(true);
      expect(branch2.hasCollapsedAncestor()).to.equal(true);
    });

    it('should be true if grandparent is collapsed', function () {
      var branch = new PhyloCanvas.Branch();
      var branch1 = new PhyloCanvas.Branch();
      var branch2 = new PhyloCanvas.Branch();

      branch.addChild(branch1);
      branch1.addChild(branch2);

      branch.collapsed = true;

      expect(branch2.hasCollapsedAncestor()).to.equal(true);
    });

  });

});
