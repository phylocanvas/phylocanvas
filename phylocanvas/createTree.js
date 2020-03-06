/* eslint max-params: 0 */

import applyPlugins from './utils/applyPlugins';
import bindMethods from './utils/bindMethods';

import fitInPanel from './functions/fitInPanel';
import resetBranchScale from './functions/resetBranchScale';
import resetCollapsedIds from './functions/resetCollapsedIds';
import resetRootId from './functions/resetRootId';
import resetRotatedIds from './functions/resetRotatedIds';
import resetStepScale from './functions/resetStepScale';
import resize from './functions/resize';
import restoreViewport from './functions/restoreViewport';

export default function (canvas, options = {}, plugins = []) {
  const tree = {
    canvas,
    ctx: canvas.getContext('2d'),
    state: {},
    _: {
      cache: {},
    },
  };

  bindMethods(tree);

  if (plugins.length) {
    applyPlugins(tree, plugins);
  }

  tree.init(options);

  if (options.source) {
    const { width, height } = tree.ctx.canvas;
    tree.setState(
      tree.chain(
        () =>
          (tree.state.size
            ? restoreViewport(tree, width, height)
            : resize(tree, width, height)),
        () => ({ source: options.source }),
        () =>
          (tree.state.rootId ? { rootId: tree.state.rootId } : resetRootId(tree)),
        () =>
          (tree.state.collapsedIds
            ? { collapsedIds: tree.state.collapsedIds }
            : resetCollapsedIds(tree)),
        () =>
          (tree.state.rotatedIds
            ? { rotatedIds: tree.state.rotatedIds }
            : resetRotatedIds(tree)),
        () =>
          (tree.state.stepScale
            ? { stepScale: tree.state.stepScale }
            : resetStepScale(tree)),
        () =>
          (tree.state.branchScale
            ? { branchScale: tree.state.branchScale }
            : resetBranchScale(tree)),
        () => {
          const { offsetX, offsetY, scale, minScale, maxScale } = fitInPanel(
            tree
          );
          return {
            offsetX: tree.state.offsetX || offsetX,
            offsetY: tree.state.offsetY || offsetY,
            scale: tree.state.scale || scale,
            minScale: tree.state.minScale || minScale,
            maxScale: tree.state.maxScale || maxScale,
          };
        }
      )
    );
  }

  return tree;
}
