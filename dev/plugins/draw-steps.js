import { Angles, TreeTypes } from '@cgps/phylocanvas/constants';

function getNumberOfVisibleLeaves(tree) {
  return tree.nodes.rootNode.visibleLeaves;
  // let visibleLeaves = tree.nodes.rootNode.totalLeaves;
  // for (const id of tree.state.collapsedIds) {
  //   const collapsedNode = tree.getNodeById(id);
  //   if (collapsedNode && !collapsedNode.isHidden) {
  //     visibleLeaves -= collapsedNode.totalLeaves - 1;
  //   }
  // }
  // return visibleLeaves;
}

function drawPaddingBox(tree) {
  const { ctx, state } = tree;

  ctx.save();

  const { left, top, right, bottom } = tree.getDrawingArea();

  ctx.strokeStyle = 'brown';
  ctx.strokeRect(
    left,
    top,
    right - left,
    bottom - top
  );

  ctx.restore();
}

function drawBoundingBox(tree) {
  const { ctx } = tree;

  const { minX, maxX, minY, maxY } = tree.getBounds();

  ctx.save();

  ctx.strokeStyle = 'blue';
  ctx.lineWidth *= 2;
  ctx.strokeRect(
    minX,
    minY,
    maxX - minX,
    maxY - minY
  );

  ctx.restore();
}

function drawHorizontalLines(tree) {
  const { ctx, state } = tree;
  const visibleLeaves = getNumberOfVisibleLeaves(tree);

  const startX = (state.padding - state.offsetX) / state.scale;
  const endX = (ctx.canvas.width - state.padding - state.offsetX) / state.scale;

  ctx.strokeStyle = 'red';
  for (let i = 0; i <= visibleLeaves; i++) {
    ctx.beginPath();
    ctx.moveTo(startX, (i - 0.5) * state.stepScale);
    ctx.lineTo(endX, (i - 0.5) * state.stepScale);
    ctx.stroke();
    ctx.closePath();
  }

  ctx.strokeStyle = 'orange';
  ctx.setLineDash([ 1, 1 ]);
  for (let i = 0; i < visibleLeaves; i++) {
    ctx.beginPath();
    ctx.moveTo(startX, i * state.stepScale - state.nodeSize);
    ctx.lineTo(endX, i * state.stepScale - state.nodeSize);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(startX, i * state.stepScale);
    ctx.lineTo(endX, i * state.stepScale);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(startX, i * state.stepScale + state.nodeSize);
    ctx.lineTo(endX, i * state.stepScale + state.nodeSize);
    ctx.stroke();
    ctx.closePath();
  }
}

function drawVerticalLines(tree) {
  const { ctx, state } = tree;
  const visibleLeaves = getNumberOfVisibleLeaves(tree);

  const start = (state.padding - state.offsetY) / state.scale;
  const end = (ctx.canvas.height - state.padding - state.offsetY) / state.scale;

  ctx.strokeStyle = 'red';
  for (let i = 0; i <= visibleLeaves; i++) {
    ctx.beginPath();
    ctx.moveTo((i - 0.5) * state.stepScale, start);
    ctx.lineTo((i - 0.5) * state.stepScale, end);
    ctx.stroke();
    ctx.closePath();
  }

  ctx.strokeStyle = 'orange';
  ctx.setLineDash([ 1, 1 ]);
  for (let i = 0; i < visibleLeaves; i++) {
    ctx.beginPath();
    ctx.moveTo(i * state.stepScale - state.nodeSize, start);
    ctx.lineTo(i * state.stepScale - state.nodeSize, end);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(i * state.stepScale, start);
    ctx.lineTo(i * state.stepScale, end);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(i * state.stepScale + state.nodeSize, start);
    ctx.lineTo(i * state.stepScale + state.nodeSize, end);
    ctx.stroke();
    ctx.closePath();
  }
}

function drawCircularArcs(tree) {
  const { ctx, state } = tree;

  const stepAngle = Angles.Degrees360 / tree.nodes.leafNodes.length;

  ctx.strokeStyle = 'red';
  for (let i = 0; i < tree.nodes.leafNodes.length; i++) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0,
      tree.nodes.leafNodes[i].distanceFromRoot * state.branchScale,
      (i - 0.5) * stepAngle,
      (i + 0.5) * stepAngle
    );
    ctx.lineTo(0, 0);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0,
      (tree.nodes.leafNodes[i].distanceFromRoot * state.branchScale) + (state.nodeSize * 3) + tree.nodes.maxLabelWidth,
      (i - 0.5) * stepAngle,
      (i + 0.5) * stepAngle
    );
    ctx.lineTo(0, 0);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0,
      (tree.nodes.rootNode.totalLeafLength * state.branchScale) + (state.nodeSize * 3) + state.maxLabelWidth,
      (i - 0.5) * stepAngle,
      (i + 0.5) * stepAngle
    );
    ctx.lineTo(0, 0);
    ctx.stroke();
    ctx.closePath();
  }
}

function drawRadialArcs(tree) {
  const { ctx, state } = tree;

  const stepAngle = Angles.Degrees360 / tree.nodes.leafNodes.length;

  ctx.strokeStyle = 'red';
  for (const node of tree.nodes.leafNodes) {
    ctx.beginPath();
    ctx.moveTo(node.parent.x, node.parent.y);
    ctx.arc(node.parent.x, node.parent.y,
      node.branchLength * state.branchScale,
      node.angle - 0.5 * stepAngle,
      node.angle + 0.5 * stepAngle
    );
    ctx.lineTo(node.parent.x, node.parent.y);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(node.parent.x, node.parent.y);
    ctx.arc(node.parent.x, node.parent.y,
      (node.branchLength * state.branchScale) + (state.nodeSize * 3) + tree.nodes.maxLabelWidth,
      node.angle - 0.5 * stepAngle,
      node.angle + 0.5 * stepAngle
    );
    ctx.lineTo(node.parent.x, node.parent.y);
    ctx.stroke();
    ctx.closePath();
  }
}

export default function (tree, decorate) {
  decorate('postRender', (delegate, args) => {
    const { ctx, state } = tree;

    if (state.stepScale * state.scale > state.stepScale * 0.5) {
      ctx.save();

      switch (state.type) {
        case TreeTypes.Rectangular:
        case TreeTypes.Diagonal:
          drawHorizontalLines(tree);
          break;
        case TreeTypes.Hierarchical:
          drawVerticalLines(tree);
          break;
        case TreeTypes.Circular:
          drawCircularArcs(tree);
          break;
        case TreeTypes.Radial:
          drawRadialArcs(tree);
          break;
      }

      ctx.restore();
    }

    drawBoundingBox(tree);

    delegate(...args);

    ctx.save();
    ctx.scale(tree.pixelRatio, tree.pixelRatio);
    drawPaddingBox(tree);
    ctx.restore();
  });

  decorate('drawNode', (delegate, args) => {
    delegate(...args);
    const { ctx, state } = tree;
    const [ node ] = args;

    if (!node.isLeaf) {
      return;
    }

    ctx.save();

    ctx.translate(node.x, node.y);
    ctx.rotate(node.angle);

    ctx.strokeStyle = 'black';
    ctx.setLineDash([ 1, 1 ]);

    ctx.beginPath();
    ctx.rect(-state.nodeSize, -state.nodeSize, state.nodeSize * 2, state.nodeSize * 2);
    if (tree.state.alignLabels) {
      ctx.rect(tree.state.branchScale * (tree.nodes.rootNode.totalLeafLength - node.distanceFromRoot) + state.nodeSize * 2, -state.nodeSize, tree.nodes.maxLabelWidth, state.nodeSize * 2);
    } else {
      // ctx.rect(state.nodeSize * 2, -state.nodeSize, tree.nodes.maxLabelWidth, state.nodeSize * 2);
    }
    ctx.stroke();
    ctx.closePath();

    ctx.restore();
  });
}
