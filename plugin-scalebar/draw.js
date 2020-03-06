import { utils } from '@cgps/phylocanvas';

export default function (tree) {
  const { scalebar } = tree.state;
  const { position } = scalebar;
  const ctx = tree.ctx;
  const pixelRatio = utils.getPixelRatio(ctx);
  const lineWidth = scalebar.lineWidth;
  const fontSize = scalebar.fontSize;
  const padding = scalebar.padding;
  const height = scalebar.height;
  const targetWidth = scalebar.width;
  let digits = scalebar.digits;

  const rawScale = targetWidth / tree.state.branchScale / tree.state.scale;
  let scale = 0.0;
  if (Number.isInteger(rawScale)) {
    scale = rawScale;
  } else {
    while (scale === 0.0) {
      scale = parseFloat(rawScale.toFixed(digits), 10);
      if (scale === 0.0) digits++;
    }
  }

  const width = targetWidth * scale / rawScale;

  ctx.save();
  ctx.scale(pixelRatio, pixelRatio);
  const canvasWidth = ctx.canvas.width / pixelRatio;
  const canvasHeight = ctx.canvas.height / pixelRatio;

  let x = 0;
  if (typeof position.left !== 'undefined') {
    x = position.left;
  } else if (typeof position.centre !== 'undefined') {
    x = (canvasWidth / 2) - (width / 2) - padding + position.centre;
  } else if (typeof position.right !== 'undefined') {
    x = canvasWidth - width - position.right - (padding * 2);
  } else {
    tree.error(
      'Invalid horizontal position specified. Supported values are `left`, `centre`, or `right`'
    );
  }
  let y = 0;
  if (typeof position.top !== 'undefined') {
    y = position.top + padding;
  } else if (typeof position.middle !== 'undefined') {
    y = (canvasHeight / 2) - height + position.middle + padding;
  } else if (typeof position.bottom !== 'undefined') {
    y = canvasHeight - height - position.bottom - padding;
  } else {
    tree.error(
      'Invalid vertical position specified. Supported values are `top`, `middle`, or `bottom`'
    );
  }

  ctx.fillStyle = scalebar.background;
  ctx.fillRect(x, y - padding, width + padding * 2, height + padding * 2);

  ctx.font = `${fontSize}px ${scalebar.fontFamily || tree.state.fontFamily}`;
  ctx.fillStyle = scalebar.fillStyle;
  ctx.strokeStyle = scalebar.strokeStyle;
  ctx.lineWidth = lineWidth;
  ctx.textBaseline = scalebar.textBaseline;
  ctx.textAlign = scalebar.textAlign;

  ctx.beginPath();
  // crossbar
  ctx.moveTo(x + padding + lineWidth, y + lineWidth);
  ctx.lineTo(x + width + padding - lineWidth, y + lineWidth);
  // left pylon
  ctx.moveTo(x + padding + lineWidth, y + lineWidth);
  ctx.lineTo(x + padding + lineWidth, y + height);
  // right pylon
  ctx.moveTo(x + width + padding - lineWidth, y + lineWidth);
  ctx.lineTo(x + width + padding - lineWidth, y + height);

  ctx.stroke();
  ctx.closePath();

  ctx.fillText(
    scale,
    x + (width + padding * 2) / 2,
    y + height + scalebar.textBaselineOffset
  );

  ctx.restore();
}
