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
import Tooltip from './Tooltip';
import Parser from './Parser';

import treeTypes from './treeTypes';
import nodeRenderers from './nodeRenderers';
import * as utils from './utils';

export { Tree, Branch, Tooltip, Parser, treeTypes, nodeRenderers, utils };

function decorate(object, fnName, fn) {
  let target = object[fnName] ? object : object.prototype;
  let originalFn = target[fnName];

  target[fnName] = function (...args) {
    return fn.call(this, originalFn, args);
  };
}

function plugin(pluginFn) {
  pluginFn.call(this, decorate);
}

function createTree(element, conf = {}) {
  return new Tree(element, conf);
}

export default { plugin, createTree };
