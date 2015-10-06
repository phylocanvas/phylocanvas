import { constants } from 'phylocanvas-utils';

const { Angles } = constants;

export default {

  circle(node) {
    var r = node.getRadius();
    node.canvas.beginPath();
    node.canvas.arc(r, 0, r, 0, Angles.FULL, false);
    node.canvas.stroke();
    node.canvas.fill();
    node.canvas.closePath();
  },

  square(node) {
    var r = node.getRadius();
    var x1 = 0;
    var x2 = r * 2;
    var y1 = -r;
    var y2 = r;
    node.canvas.beginPath();
    node.canvas.moveTo(x1, y1);
    node.canvas.lineTo(x1, y2);
    node.canvas.lineTo(x2, y2);
    node.canvas.lineTo(x2, y1);
    node.canvas.lineTo(x1, y1);
    node.canvas.stroke();
    node.canvas.fill();
    node.canvas.closePath();
  },

  star(node) {
    var r = node.getRadius();
    var cx = r;
    var cy = 0;
    var spikes = 8;
    var outerRadius = r;
    var innerRadius = r * 0.5;
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
    node.canvas.closePath();
  },

  triangle(node) {
    var r = node.getRadius();
    var lengthOfSide = (2 * r) * Math.cos(30 * Math.PI / 180);

    node.canvas.beginPath();
    node.canvas.moveTo(0, 0);
    node.canvas.rotate(30 * Math.PI / 180);
    node.canvas.lineTo(lengthOfSide, 0);

    node.canvas.rotate(-60 * Math.PI / 180);
    node.canvas.lineTo(lengthOfSide, 0);

    node.canvas.rotate(30 * Math.PI / 180);
    node.canvas.lineTo(0, 0);

    node.canvas.stroke();
    node.canvas.fill();
    node.canvas.closePath();
  }

};
