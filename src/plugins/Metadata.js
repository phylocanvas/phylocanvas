import { Tree, Branch } from '../index';
import PhyloCanvas from '../index';

Tree.prototype.viewMetadataColumns =
  function (metadataColumnArray = this.getMetadataColumnHeadings()) {
    this.showMetadata = true;
    this.selectedMetadataColumns = metadataColumnArray;
    // Fit to canvas window
    this.fitInPanel();
    this.draw();
  };

Tree.prototype.getMetadataColumnHeadings = function () {
  var metadataColumnArray = [];
  for (var i = 0; i < this.leaves.length; i++) {
    if (Object.keys(this.leaves[i].data).length > 0) {
      metadataColumnArray = Object.keys(this.leaves[i].data);
      break;
    }
  }
  return metadataColumnArray;
};

Tree.prototype.clearMetadata = function () {
  for (var i = 0; i < this.leaves.length; i++) {
    if (Object.keys(this.leaves[i].data).length > 0) {
      this.leaves[i].data = {};
    }
  }
};

Branch.prototype.drawMetadata = function () {
  var padMaxLabelWidth = 0;
  if (this.tree.showLabels || (this.tree.hoverLabel && this.highlighted)) {
    padMaxLabelWidth = this.tree.maxLabelLength[this.tree.treeType];
  }
  var tx = this.getLabelStartX() + padMaxLabelWidth;
  var ty = 0;
  var metadata = [];
  var height = this.tree.textSize;
  var width = this.tree.metadataXStep / 2;
  var i;
  var columnName;

  if (this.tree.alignLabels) {
    if (this.tree.treeType === 'rectangular') {
      tx += (this.tree.farthestNodeFromRootX - this.centerx);
    } else if (this.tree.treeType === 'hierarchical') {
      tx += (this.tree.farthestNodeFromRootY - this.centery);
    }
  }

  if (!this.tree.metadataHeadingDrawn && this.tree.alignLabels &&
    this.tree.treeType !== 'circular' && this.tree.treeType !== 'radial') {
    this.drawMetadataHeading(tx, ty);
    this.tree.metadataHeadingDrawn = true;
  }

  var metadataXStep = this.tree.metadataXStep;

  if (Object.keys(this.data).length > 0) {
    this.canvas.beginPath();

    // If no columns specified, then draw all columns
    if (this.tree.selectedMetadataColumns.length > 0) {
      metadata = this.tree.selectedMetadataColumns;
    } else {
      metadata = Object.keys(this.data);
    }

    ty = ty - (height / 2);

    for (i = 0; i < metadata.length; i++) {
      columnName = metadata[i];
      tx += metadataXStep;

      if (window.parseInt(this.data[columnName])) {
        this.canvas.fillStyle = this.tree.colour1;
        this.canvas.fillRect(tx, ty, width, height);
      } else if (window.parseInt(this.data[columnName]) === 0) {
        this.canvas.fillStyle = this.tree.colour0;
        this.canvas.fillRect(tx, ty, width, height);
      }
    }
    this.canvas.stroke();
    this.canvas.closePath();
  }
};

Branch.prototype.drawMetadataHeading = function (tx, ty) {
  var metadata;
  var columnName;
  var i;

  if (this.tree.selectedMetadataColumns.length > 0) {
    metadata = this.tree.selectedMetadataColumns;
  } else {
    metadata = Object.keys(this.data);
  }

  // Drawing Column headings
  this.canvas.font = '12px Sans-serif';
  this.canvas.fillStyle = 'black';

  for (i = 0; i < metadata.length; i++) {
    columnName = metadata[i];
    tx += this.tree.metadataXStep;
    // Rotate canvas to write column headings
    this.canvas.rotate(-Math.PI / 2);
    if (this.tree.treeType === 'rectangular') {
      this.canvas.textAlign = 'left';
      // x and y axes changed because of rotate
      // Adding + 6 to adjust the position
      this.canvas.fillText(columnName, 20, tx + 6);
    } else if (this.tree.treeType === 'hierarchical') {
      this.canvas.textAlign = 'right';
      this.canvas.fillText(columnName, -20, tx + 8);
    } else if (this.tree.treeType === 'diagonal') {
      this.canvas.textAlign = 'left';
      this.canvas.fillText(columnName, 20, tx + 6);
    }
    // Rotate canvas back to normal position
    this.canvas.rotate(Math.PI / 2);
  }
};

export default function metadataPlugin(decorate) {
  decorate(PhyloCanvas, 'createTree', function (delegate, args) {
    const tree = delegate(...args);

    tree.showMetadata = false;
    // Takes an array of metadata column headings to overlay on the tree
    tree.selectedMetadataColumns = [];
    // x step for metadata
    tree.metadataXStep = 15;
    // Boolean to detect if metadata heading is drawn or not
    tree.metadataHeadingDrawn = false;

    return tree;
  });

  decorate(Tree, 'draw', function (delegate, args) {
    delegate.apply(this, args);
    this.metadataHeadingDrawn = false;
  });

  decorate(Branch, 'drawLeaf', function (delegate) {
    delegate.call(this);
    if (this.tree.showMetadata) {
      this.drawMetadata();
    }
  });

  decorate(Branch, 'getTotalSize', function (delegate) {
    let totalSize = delegate.call(this);

    if (this.tree.showMetadata) {
      totalSize +=
        this.tree.getMetadataColumnHeadings().length * this.tree.metadataXStep;
    }

    return totalSize;
  });
}
