var Angles = require('../utils/constants').Angles;

module.exports = {
  circle: function (node) {
    var r = node.getNodeSize();
    node.canvas.arc(r, 0, r, 0, Angles.FULL, false);
    node.canvas.stroke();
    node.canvas.fill();
  },
  square: function (node) {
    var r = node.getNodeSize();
    var x1 = 0;
    var x2 = r * 2;
    var y1 = -r;
    var y2 = r;
    node.canvas.moveTo(x1, y1);
    node.canvas.lineTo(x1, y2);
    node.canvas.lineTo(x2, y2);
    node.canvas.lineTo(x2, y1);
    node.canvas.lineTo(x1, y1);
    node.canvas.stroke();
    node.canvas.fill();
  },
  star: function (node) {
    var r = node.getNodeSize();
    var cx = r;
    var cy = 0;
    var spikes = 6;
    var outerRadius = 6;
    var innerRadius = 2;
    var rot = Math.PI / 2 * 3;
    var x = cx;
    var y = cy;
    var step = Math.PI / spikes;
    var i = 0;
    node.canvas.beginPath();
    node.canvas.moveTo(cx, cy - outerRadius);
    for (i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      node.canvas.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      node.canvas.lineTo(x, y);
      rot += step;
    }
    node.canvas.lineTo(cx, cy - outerRadius);
    node.canvas.stroke();
    node.canvas.fill();
    node.canvas.moveTo(cx, cy);
    node.canvas.lineTo(cx - (outerRadius - 1), cy);
    node.canvas.stroke();
    node.canvas.closePath();
  },
  triangle: function (node) {
    var r = node.getNodeSize();
    var cx = r;
    var cy = 0;
    var x1 = cx - r;
    var x2 = cx + r;
    var y1 = cy - r;
    var y2 = cy + r;
    node.canvas.moveTo(cx, y1);
    node.canvas.lineTo(x2, y2);
    node.canvas.lineTo(x1, y2);
    node.canvas.lineTo(cx, y1);
    node.canvas.stroke();
    node.canvas.fill();
    node.canvas.moveTo(x1, (y1 + y2) / 2);
    node.canvas.lineTo((x1 + x2) / 2, (y1 + y2) / 2);
    node.canvas.stroke();
  }
};
