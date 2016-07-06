/**
 * Phylocanvas - Interactive tree visualisation for the web.
 *
 * @copyright 2016 Centre for Genomic Pathogen Surveillance
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
  const target = object[fnName] ? object : object.prototype;
  const originalFn = target[fnName];

  target[fnName] = function (...args) {
    return fn.call(this, originalFn, args);
  };
}

/**
 * @module Phylocanvas
 */

/**
 * Register a plugin.
 *
 * @param {function} pluginFn - Imported plugin module.
 */
function plugin(pluginFn) {
  pluginFn.call(this, decorate);
}

/**
 * Create an instance of Phylocanvas.
 *
 * @param {string|HTMLElement} element - ID or element within which to place Phylocanvas instance.
 * @param {Object} conf - Configuration object, properties are copied into the Tree instance.
 * @return an instance of Tree.
 */
function createTree(element, conf = {}) {
  return new Tree(element, conf);
}

export default { plugin, createTree };
