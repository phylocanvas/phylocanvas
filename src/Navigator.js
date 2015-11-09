/**
 * Overview window
 *
 * @constructor
 * @memberof PhyloCanvas
 */
function Navigator(tree) {
  this.tree = tree;
  this.cel = document.createElement('canvas');
  this.cel.id = this.tree.containerElement.id + 'Navi';
  this.cel.style.zIndex = '100';
  this.cel.style.backgroundColor = '#FFFFFF';
  this.cel.width = this.tree.canvas.canvas.width / 3;
  this.cel.height = this.tree.canvas.canvas.height / 3;
  this.cel.style.position = 'absolute';
  this.cel.style.bottom = '0px';
  this.cel.style.right = '0px';
  this.cel.style.border = '1px solid #CCCCCC';
  this.tree.containerElement.appendChild(this.cel);

  this.ctx = this.cel.getContext('2d');
  this.ctx.translate(this.cel.width / 2, this.cel.height / 2);
  this.ctx.save();
}


Navigator.prototype.drawFrame = function () {
  var w = this.cel.width;
  var h = this.cel.height;
  var hw = w / 2;
  var hh = h / 2;
  var url;
  var _this;
  var z;

  this.ctx.restore();
  this.ctx.save();

  this.ctx.clearRect(-hw, -hh, w, h);

  this.ctx.strokeStyle = 'rgba(180,180,255,1)';

  if (!this.tree.drawn) {
    url = this.tree.canvas.canvas.toDataURL();

    this.img = document.createElement('img');
    this.img.src = url;

    _this = this;

    this.img.onload = function () {
      _this.ctx.drawImage(
        _this.img, -hw, -hh, _this.cel.width, _this.cel.height
      );
    };

    this.baseOffsetx = this.tree.offsetx;
    this.baseOffsety = this.tree.offsety;
    this.baseZoom = this.tree.zoom;
  } else {
    this.ctx.drawImage(this.img, -hw, -hh, this.cel.width, this.cel.height);
  }

  z = 1 / (this.tree.zoom / this.baseZoom);

  this.ctx.lineWidth = this.ctx.lineWidth / z;

  this.ctx.translate((this.baseOffsetx - (this.tree.offsetx * z)) * z,
    (this.baseOffsety - (this.tree.offsety * z)) * z);
  this.ctx.scale(z, z);
  this.ctx.strokeRect(-hw, -hh, w, h);
};

Navigator.prototype.resize = function () {
  this.cel.width = this.tree.canvas.canvas.width / 3;
  this.cel.height = this.tree.canvas.canvas.height / 3;
  this.ctx.translate(this.cel.width / 2, this.cel.height / 2);
  this.drawFrame();
};

module.exports = Navigator;
