import { Angles } from '../constants';

// node included for context e.g. pie chart slices
export default function (tree, node, shape, size, radius = size / 2) {
  const { ctx } = tree;
  ctx.beginPath();
  if (shape === 'dot') {
    ctx.arc(0, 0, ctx.lineWidth * 2, Angles.Degrees0, Angles.Degrees360);
  } else if (shape === 'circle') {
    ctx.arc(0, 0, radius, Angles.Degrees0, Angles.Degrees360);
  } else if (shape === 'square') {
    ctx.rect(-radius, -radius, size, size);
  } else if (shape === 'triangle') {
    ctx.moveTo(0, -radius);
    ctx.lineTo(radius, radius);
    ctx.lineTo(-radius, radius);
    ctx.lineTo(0, -radius);
  } else if (shape === 'star') {
    const step = Math.PI / 5;
    let angle = Math.PI / 2 * 3;
    ctx.moveTo(0, -radius);
    for (let i = 0; i < 5; i++) {
      ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
      angle += step;
      ctx.lineTo(Math.cos(angle) * radius * 0.5, Math.sin(angle) * radius * 0.5);
      angle += step;
    }
    ctx.lineTo(0, -radius);
  }
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}
