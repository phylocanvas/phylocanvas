import { expect } from 'chai';

import { Tree, Branch } from '../../src/index';

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
      var tree = new Tree('test');
      var branch = new Branch();
      var branch1 = new Branch();
      var branch2 = new Branch();
      var colours;

      tree.backColour = true;

      branch1.colour = colour1;
      branch2.colour = colour2;

      branch.addChild(branch1);
      branch.addChild(branch2);

      branch.tree = tree;

      colours = branch.getChildColours();

      expect(colours.length).to.equal(2);
      expect(colours[0]).to.equal(colour1);
    });

    it('should get the right colours', function () {
      var colour1 = 'rgba(255,0,0,1)';
      var colour2 = 'rgba(0,255,0,1)';
      var tree = new Tree('test');
      var branch = new Branch();
      var branch1 = new Branch();
      var branch2 = new Branch();
      var colours;

      tree.backColour = true;

      branch1.colour = colour1;
      branch2.colour = colour2;

      branch.addChild(branch1);
      branch.addChild(branch2);

      branch.tree = tree;

      colours = branch.getChildColours();

      expect(colours.length).to.equal(2);
      expect(colours[0]).to.equal(colour1);
      expect(colours[1]).to.equal(colour2);
    });

    it('should get the right parent branch colour', function () {
      var colour1 = 'rgba(255,0,0,1)';
      var tree = new Tree('test');
      var branch = new Branch();
      var branch1 = new Branch();
      var branch2 = new Branch();
      var colour;

      tree.backColour = true;

      branch1.colour = colour1;
      branch2.colour = colour1;

      branch.addChild(branch1);
      branch.addChild(branch2);

      branch.tree = tree;

      colour = branch.getColour();

      expect(colour).to.equal(colour1);
    });

    it('should get the right colours', function () {
      var colour1 = 'rgba(255,0,0,1)';
      var colour2 = 'rgba(0,255,0,1)';
      var colour3 = 'rgba(0,0,0,1)';
      var tree = new Tree('test');
      var branch = new Branch();
      var branch1 = new Branch();
      var branch2 = new Branch();
      var colour;

      tree.branchColour = colour3;
      tree.backColour = true;

      branch1.colour = colour1;
      branch2.colour = colour2;

      branch.addChild(branch1);
      branch.addChild(branch2);

      branch.tree = tree;

      colour = branch.getColour();

      expect(colour).to.equal(colour3);
    });

    describe('hasCollapsedAncestor()', function () {

      it('should be true if parent is collapsed', function () {
        var branch = new Branch();
        var branch1 = new Branch();
        var branch2 = new Branch();

        branch.addChild(branch1);
        branch.addChild(branch2);

        branch.collapsed = true;

        expect(branch1.hasCollapsedAncestor()).to.equal(true);
        expect(branch2.hasCollapsedAncestor()).to.equal(true);
      });

      it('should be true if grandparent is collapsed', function () {
        var branch = new Branch();
        var branch1 = new Branch();
        var branch2 = new Branch();

        branch.addChild(branch1);
        branch1.addChild(branch2);

        branch.collapsed = true;

        expect(branch2.hasCollapsedAncestor()).to.equal(true);
      });

    });

    it('should return a line width of 0', function () {
      const tree = new Tree('test');
      const branch = new Branch();
      branch.tree = tree;
      branch.leafStyle = { lineWidth: 0 };
      expect(branch.getLeafStyle().lineWidth).to.equal(0);
    });

  });

});
