import { constants } from 'phylocanvas-utils';

const { Angles } = constants;

function commitPath(canvas, { lineWidth, strokeStyle, fillStyle }) {
  canvas.save();

  canvas.lineWidth = lineWidth;
  canvas.strokeStyle = strokeStyle;
  canvas.fillStyle = fillStyle;

  canvas.fill();
  if (lineWidth > 0) {
    canvas.stroke();
  }

  canvas.restore();
}

const lengthOfSquareSide = (radius) => radius * Math.sqrt(2);

export default {

  circle(canvas, radius, style) {
    // circle takes same area as square inside given radius
    const scaledArea = Math.pow(lengthOfSquareSide(radius), 2);
    const scaledRadius = Math.sqrt(scaledArea / Math.PI);

    canvas.beginPath();
    canvas.arc(radius, 0, scaledRadius, 0, Angles.FULL, false);
    canvas.closePath();

    commitPath(canvas, style);
  },

  square(canvas, radius, style) {
    const lengthOfSide = lengthOfSquareSide(radius);
    const startX = radius - lengthOfSide / 2;

    // connector
    // canvas.beginPath();
    // canvas.moveTo(0, 0);
    // canvas.lineTo(startX, 0);
    // canvas.stroke();
    // canvas.closePath();

    canvas.beginPath();
    canvas.moveTo(startX, 0);
    canvas.lineTo(startX, lengthOfSide / 2);
    canvas.lineTo(startX + lengthOfSide, lengthOfSide / 2);
    canvas.lineTo(startX + lengthOfSide, -lengthOfSide / 2);
    canvas.lineTo(startX, -lengthOfSide / 2);
    canvas.lineTo(startX, 0);
    canvas.closePath();

    commitPath(canvas, style);
  },

  star(canvas, radius, style) {
    const cx = radius;
    const cy = 0;
    const spikes = 5;
    const outerRadius = radius;
    const innerRadius = outerRadius * 0.5;
    const step = Math.PI / spikes;

    let rot = Math.PI / 2 * 3;

    canvas.beginPath();
    canvas.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      let x = cx + Math.cos(rot) * outerRadius;
      let y = cy + Math.sin(rot) * outerRadius;
      canvas.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      canvas.lineTo(x, y);
      rot += step;
    }
    canvas.lineTo(cx, cy - outerRadius);
    canvas.closePath();

    commitPath(canvas, style);
  },

  triangle(canvas, radius, style) {
    const lengthOfSide = (2 * radius) * Math.cos(30 * Math.PI / 180);
    const height = (Math.sqrt(3) / 2) * lengthOfSide;
    const midpoint = (1 / Math.sqrt(3)) * (lengthOfSide / 2);

    canvas.beginPath();
    canvas.moveTo(radius, midpoint);
    canvas.lineTo(radius + lengthOfSide / 2, midpoint);
    canvas.lineTo(radius, -(height - midpoint));
    canvas.lineTo(radius - lengthOfSide / 2, midpoint);
    canvas.lineTo(radius, midpoint);
    canvas.closePath();

    commitPath(canvas, style);
  },

};
