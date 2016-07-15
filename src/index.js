import Tree from './Tree';
import Branch from './Branch';
import Prerenderer from './Prerenderer';
import Tooltip from './Tooltip';
import Parser from './Parser';

import treeTypes from './treeTypes';
import nodeRenderers from './nodeRenderers';
import * as utils from './utils';

function decorate(object, fnName, fn) {
  const target = object[fnName] ? object : object.prototype;
  const originalFn = target[fnName];

  target[fnName] = function (...args) {
    return fn.call(this, originalFn, args);
  };
}

/**
 * The publicly exported module. Exports the following methods by default, and
 * contains named exports of internal classes, types, and utils.
 *
 * @module Phylocanvas
 */

export { Tree, Branch, Prerenderer, Tooltip, Parser, treeTypes, nodeRenderers, utils };

/**
 * Register a plugin.
 *
 * @param {function} pluginFn - Imported plugin module.
 */
function plugin(pluginFn) {
  pluginFn.call(this, decorate);
}

/**
 * A factory function for Phylocanvas instances to enable decoration by plugins.
 *
 * @param {string|HTMLElement} element - ID or element within which to place Phylocanvas instance.
 * @param {Object} config - Configuration object, properties are copied into the {@link Tree} object.
 *
 * @return An instance of {@link Tree}.
 */
function createTree(element, config = {}) {
  return new Tree(element, config);
}

export default { plugin, createTree };
