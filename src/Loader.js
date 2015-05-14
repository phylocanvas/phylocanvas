/**
 * @constructor
 * @memberof PhyloCanvas
 */
function Loader(div) {
  this.div = div;
  this.cl = document.createElement('canvas');
  this.cl.id = div.id + 'Loader';
  this.cl.style.position = 'absolute';
  this.cl.style.backgroundColor = '#FFFFFF';
  this.cl.style.top = (div.offsetHeight / 4) + 'px';
  this.cl.style.left = (div.offsetWidth / 4) + 'px';
  this.cl.height = div.offsetHeight / 2;
  this.cl.width = div.offsetWidth / 2;
  this.cl.style.zIndex = '1000';
  div.appendChild(this.cl);

  this.ctx = document.getElementById(div.id + 'Loader').getContext('2d');
  this.drawer = null;
  this.loaderRadius = null;
  this.loaderStep = (2 * Math.PI) / 360;

  this.message = 'Loading ...';
}

Loader.prototype.run = function () {
  var i = 0;
  var _this = this;
  this.cl.style.diangle = 'block';
  this.initLoader();
  this.drawer = setInterval(function () {
    _this.drawLoader(i);
    i++;
  }, 10);
};

Loader.prototype.resize = function () {
  this.cl.style.top = '2px';
  this.cl.style.left = '2px';
  this.cl.height = this.div.offsetHeight * 0.75;
  this.cl.width = this.div.offsetWidth * 0.75;

  this.ctx.strokeStyle = 'rgba(180,180,255,1)';
  this.ctx.fillStyle = 'rgba(180,180,255,1)';
  this.ctx.lineWidth = 10.0;

  this.ctx.font = '24px sans-serif';

  this.ctx.shadowOffsetX = 2.0;
  this.ctx.shadowOffsetY = 2.0;
};

Loader.prototype.initLoader = function () {
  this.ctx.strokeStyle = 'rgba(180,180,255,1)';
  this.ctx.fillStyle = 'rgba(180,180,255,1)';
  this.ctx.lineWidth = 10.0;

  this.ctx.font = '24px sans-serif';

  this.ctx.shadowOffsetX = 2.0;
  this.ctx.shadowOffsetY = 2.0;
};

Loader.prototype.drawLoader = function (t) {
  this.ctx.restore();

  this.ctx.translate(0, 0);
  this.loaderRadius = Math.min(
    this.ctx.canvas.width / 4, this.ctx.canvas.height / 4
  );

  this.ctx.save();
  this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  this.ctx.translate(this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);

  this.ctx.beginPath();
  this.ctx.arc(
    0, 0, this.loaderRadius, this.loaderStep * t, this.loaderStep * t + 2
  );
  this.ctx.stroke();

  this.ctx.beginPath();
  this.ctx.arc(
    0, 0,
    this.loaderRadius,
    this.loaderStep * t + 3,
    this.loaderStep * t + 5
  );
  this.ctx.stroke();
  this.ctx.fillText(
    this.message,
    -(this.ctx.measureText(this.message).width / 2),
    this.loaderRadius + 50, this.cl.width
  );
};

Loader.prototype.stop = function () {
  clearInterval(this.drawer);
  this.cl.style.display = 'none';
};

Loader.prototype.fail = function (message) {
  clearInterval(this.drawer);
  this.loaderRadius = Math.min(
    this.ctx.canvas.width / 4,
    this.ctx.canvas.height / 4
  );
  this.ctx.restore();

  this.ctx.translate(0, 0);
  this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

  this.ctx.beginPath();

  this.ctx.strokeStyle = 'rgba(255,180,180,1)';
  this.ctx.fillStyle = 'rgba(255,180,180,1)';

  this.ctx.translate(this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);

  this.ctx.beginPath();

  this.ctx.moveTo(0, 0);
  this.ctx.lineTo(this.loaderRadius, this.loaderRadius);
  this.ctx.moveTo(0, 0);
  this.ctx.lineTo(-this.loaderRadius, this.loaderRadius);
  this.ctx.moveTo(0, 0);
  this.ctx.lineTo(-this.loaderRadius, -this.loaderRadius);
  this.ctx.moveTo(0, 0);
  this.ctx.lineTo(this.loaderRadius, -this.loaderRadius);
  this.ctx.stroke();

  this.ctx.fillText(
    message,
    -(this.ctx.measureText(message).width / 2),
    this.loaderRadius + 50,
    this.loaderRadius * 2
  );
};

module.exports = Loader;
