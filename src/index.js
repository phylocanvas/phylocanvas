/**
 * PhyloCanvas - A JavaScript and HTML5 Canvas Phylogenetic tree drawing tool.
 *
 * @author Chris Powell (c.powell@imperial.ac.uk)
 * @modified Jyothish NT 01/03/15
 */

/**
 * @namespace PhyloCanvas
 */

import Tree from './Tree';
import Branch from './Branch';
import ContextMenu from './ContextMenu';

import treeTypes from './treeTypes';
import nodeRenderers from './nodeRenderers';

export { Tree, Branch, ContextMenu, treeTypes, nodeRenderers };

export function createTree(element, conf = {}) {
  return new Tree(element, conf);
}

function decorate(object, fnName, fn) {
  let target = object[fnName] ? object : object.prototype;
  let originalFn = target[fnName];

  target[fnName] = function (...args) {
    return fn.call(this, originalFn, args);
  };
}

export function plugin(pluginFn) {
  pluginFn.call(this, decorate);
}
