import { constants } from '@cgps/phylocanvas';
const { Angles } = constants;

export default function (tree, decorate) {
  decorate('postRender', (delegate, args) => {
    const { ctx, state } = tree;
    ctx.save();
    for (const annotation of (state.annotations || [])) {
      let node = tree.getNodeById(annotation.nodes[0]);
      let minx = node.x;
      let miny = node.y;
      let maxx = node.x;
      let maxy = node.y;
      for (let i = 1; i < annotation.nodes.length; i++) {
        node = tree.getNodeById(annotation.nodes[i]);
        if (node.x < minx) minx = node.x;
        if (node.y < miny) miny = node.y;
        if (node.x > maxx) maxx = node.x;
        if (node.y > maxy) maxy = node.y;
      }
      const x = (maxx + minx) / 2;
      const y = (maxy + miny) / 2;
      const radius = (Math.max((maxx - minx), (maxy - miny)) / 2) + state.nodeSize * 2;

      ctx.beginPath();
      ctx.arc(x, y, radius, Angles.Degrees0, Angles.Degrees360);
      ctx.closePath();

      ctx.strokeStyle = annotation.strokeStyle || state.strokeStyle;
      ctx.stroke();

      ctx.fillStyle = annotation.fillStyle || state.fillStyle;
      ctx.fill();

      if (annotation.label) {
        const labelX = x + annotation.callout[0];
        const labelY = y + radius + annotation.callout[1];
        ctx.fillStyle = annotation.labelFillStyle || state.fillStyle;
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        if (Array.isArray(annotation.label)) {
          let i = 0;
          for (const label of annotation.label) {
            ctx.fillText(label, labelX, labelY + (i * state.fontSize));
            i += 1;
          }
        } else {
          ctx.fillText(annotation.label, x + annotation.callout[0], y + radius + annotation.callout[1]);
        }
        if (annotation.callout) {
          ctx.beginPath();
          ctx.moveTo(x, y + radius);
          ctx.lineTo(x + annotation.callout[0], y + radius + annotation.callout[1]);
          ctx.lineTo(x + annotation.callout[2], y + radius + annotation.callout[3]);
          ctx.stroke();
        }
      }
    }
    ctx.restore();

    delegate(...args);
  });
}
