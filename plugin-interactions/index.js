import defaults from './defaults';
import panzoom from '@thesoulfresh/pan-zoom/src/index';
import { utils } from '@cgps/phylocanvas';

import { createTooltipElement, showTooltip, hideTooltip } from './tooltip';

export default function (tree, decorate) {

  const panning = {
    mousedown: false,
    offsetX: undefined,
    offsetY: undefined,
  };
  const tooltip = {
    visible: false,
    element: createTooltipElement(),
  };

  function onMouseDown(e) {
    if (e.button === 1) {
      e.preventDefault();
    }
    panning.mousedown = true;
    panning.offsetX = tree.state.offsetX;
    panning.offsetY = tree.state.offsetY;
  }

  function onMouseMove(e) {
    if (panning.mousedown) {
      if (tree.state.interactions.tooltip && tooltip.visible) {
        hideTooltip(tooltip.element);
        tooltip.visible = false;
      }
      return;
    }

    const point = utils.mapPoint(tree, e.offsetX, e.offsetY);
    const node = tree.getNodeAtPoint(point.x, point.y);

    if (tree.state.interactions.highlight) {
      tree.highlightNode(node);
    }

    if (tree.state.interactions.tooltip) {
      if (node) {
        if (!node.isLeaf) {
          showTooltip(tooltip.element, e.clientX, e.clientY, node.totalLeaves);
          tooltip.visible = true;
        }
        else if (tree.state.tooltipContent && typeof tree.state.tooltipContent == 'function' && node.isLeaf) {
          showTooltip(tooltip.element, e.clientX, e.clientY, tree.state.tooltipContent(node));
          tooltip.visible = true;
        }
      } else if (tooltip.visible) {
        hideTooltip(tooltip.element);
        tooltip.visible = false;
      }
    }
  }

  decorate('mergeState', (delegate, args) => {
    if (tooltip.visible) {
      hideTooltip(tooltip.element);
      tooltip.visible = false;
    }
    if (tree.state.interactions.highlight) {
      tree.highlightNode(null);
    }
    delegate(...args);
  });

  function onMouseUp(e) {
    panning.mousedown = false;
    const offsetX = tree.state.offsetX - panning.offsetX;
    const offsetY = tree.state.offsetY - panning.offsetY;
    const hasMoved = offsetX !== 0 || offsetY !== 0;

    if (tree.state.interactions.selection && e.button === 0 && !hasMoved) {
      const point = utils.mapPoint(tree, e.offsetX, e.offsetY);
      const node = tree.getNodeAtPoint(point.x, point.y);
      tree.selectNode(node, e.metaKey || e.ctrlKey);
    }
  }

  tree.ctx.canvas.addEventListener('mousemove', onMouseMove);
  tree.ctx.canvas.addEventListener('mousedown', onMouseDown);
  tree.ctx.canvas.addEventListener('touchstart', onMouseDown);
  tree.ctx.canvas.addEventListener('mouseup', onMouseUp);
  tree.ctx.canvas.addEventListener('touchend', onMouseUp);

  const unpanzoom = panzoom(tree.ctx.canvas, ({ dx, dy, dz, x, y, event }) => {
    if (dz !== 0 && dx === 0 && dy === 0) {
      if (tree.state.interactions.zoom) {
        if (event && (event.metaKey || event.ctrlKey)) {
          tree.changeBranchScale(dz < 0 ? 1 : -1, { x, y });
        } else if (event && (event.altKey || event.shiftKey)) {
          tree.changeStepScale(dz < 0 ? 1 : -1, { x, y });
        } else {
          if (
            dz > 0 &&
            tree.state.scale > tree.state.minScale * tree.pixelRatio
          ) {
            tree.transform(0, 0, -1, { x, y });
          } else if (
            dz < 0 &&
            tree.state.scale < tree.state.maxScale * tree.pixelRatio
          ) {
            tree.transform(0, 0, 1, { x, y });
          }
        }
      }
    } else {
      if (tree.state.interactions.pan) {
        tree.transform(dx, dy, 0, { x, y });
      }
    }
  });


  decorate('getInitialState', (delegate, args) => {
    const [ options ] = args;
    const { interactions = {} } = options;

    const parent =
      typeof options.parent === 'string'
        ? document.querySelector(options.parent)
        : options.parent || document.body;
    parent.appendChild(tooltip.element);

    return {
      ...delegate(...args),
      interactions: {
        ...defaults,
        ...interactions,
      },
    };
  });

  decorate('destroy', (delegate, args) => {
    unpanzoom();
    tree.ctx.canvas.removeEventListener('mousemove', onMouseMove);
    tree.ctx.canvas.removeEventListener('mousedown', onMouseDown);
    tree.ctx.canvas.removeEventListener('touchstart', onMouseDown);
    tree.ctx.canvas.removeEventListener('mouseup', onMouseUp);
    tree.ctx.canvas.removeEventListener('touchend', onMouseUp);
    hideTooltip(tooltip.element);
    delegate(...args);
  });
}
