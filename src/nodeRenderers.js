import { constants } from './utils';

const { Angles } = constants;

function drawConnector(canvas, connectingOffset) {
  canvas.beginPath();
  canvas.moveTo(0, 0);
  canvas.lineTo(connectingOffset, 0);
  canvas.stroke();
  canvas.closePath();
}

function commitPath(canvas, { lineWidth, strokeStyle, fillStyle }) {
  canvas.lineWidth = lineWidth;
  canvas.strokeStyle = strokeStyle;
  canvas.fillStyle = fillStyle;

  canvas.fill();
  if (lineWidth > 0 && strokeStyle !== fillStyle) {
    canvas.stroke();
  }
}

const lengthOfSquareSide = (radius) => radius * Math.sqrt(2);

/**
 * @function nodeRenderer
 * @description a pure function to render a leaf.
 *
 * @param {CanvasRenderingContext2D} canvas - See {@link Tree#canvas}
 * @param {number} radius - See {@link Branch#radius}
 * @param {Object} style - See {@link Branch#leafStyle}
 */

export default {

  circle(canvas, radius, style) {
    // circle takes same area as square inside given radius
    const scaledArea = Math.pow(lengthOfSquareSide(radius), 2);
    const scaledRadius = Math.sqrt(scaledArea / Math.PI);

    drawConnector(canvas, radius - scaledRadius);

    canvas.beginPath();
    canvas.arc(radius, 0, scaledRadius, 0, Angles.FULL, false);
    canvas.closePath();

    commitPath(canvas, style);
  },

  square(canvas, radius, style) {
    const lengthOfSide = lengthOfSquareSide(radius);
    const startX = radius - lengthOfSide / 2;

    drawConnector(canvas, startX);

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

    drawConnector(canvas, outerRadius - innerRadius);

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

    drawConnector(canvas, radius - midpoint);

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
