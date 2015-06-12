/**
 * PhyloCanvas - A JavaScript and HTML5 Canvas Phylogenetic tree drawing tool.
 *
 * @author Chris Powell (c.powell@imperial.ac.uk)
 * @modified Jyothish NT 01/03/15
 */

import { addClass, hasClass, removeClass } from './utils/dom';
import { fireEvent, addEvent, killEvent } from './utils/events';

/**
 * @namespace PhyloCanvas
 */

import Tree from './Tree';
import Branch from './Branch';
import ContextMenu from './ContextMenu';

import branchRenderers from './renderers/branch';
import nodeRenderers from './renderers/node';
import prerenderers from './renderers/pre';

export { Tree, Branch, ContextMenu, branchRenderers, nodeRenderers, prerenderers };

export function History(tree) {
  this.tree = tree;

  this.injectCss();
  this.div = this.createDiv(tree.canvasEl);

  this.resizeTree(tree);

  this.tree.addListener('subtree', function (evt) {
    this.addSnapshot(evt.node);
  }.bind(this));
  this.tree.addListener('loaded', this.reset.bind(this));
  this.tree.addListener('typechanged', function () {
    this.addSnapshot(this.tree.root.id);
  }.bind(this));

  if (tree.historyCollapsed) {
    this.collapse();
  }
}

History.prototype.reset = function () {
  this.clear();
  // Fixing initial snapshot - draw only after the tree is drawn
  if (this.tree.drawn) {
    this.addSnapshot(this.tree.root.id);
  }
};

History.prototype.collapse = function () {
  addClass(this.div, 'collapsed');
  this.toggleDiv.firstChild.data = '>';
  this.resizeTree();
};

History.prototype.expand = function () {
  removeClass(this.div, 'collapsed');
  this.toggleDiv.firstChild.data = '<';
  this.resizeTree();
};

History.prototype.isCollapsed = function () {
  return hasClass(this.div, 'collapsed');
};

History.prototype.toggle = function () {
  if (this.isCollapsed()) {
    this.expand();
  } else {
    this.collapse();
  }
  fireEvent(this.tree.canvasEl, 'historytoggle', { isOpen: !this.isCollapsed() });
};

History.prototype.createDiv = function (parentDiv) {
  var div = document.createElement('div');
  div.className = 'pc-history';
  addEvent(div, 'click', killEvent);
  addEvent(div, 'contextmenu', killEvent);

  var title = document.createElement('div');
  title.innerHTML = 'History';
  title.className = 'pc-history-title';
  div.appendChild(title);

  var tabDiv = document.createElement('div');
  tabDiv.appendChild(document.createTextNode('<'));
  tabDiv.className = 'toggle';
  addEvent(tabDiv, 'click', this.toggle.bind(this));
  div.appendChild(tabDiv);
  this.toggleDiv = tabDiv;

  var snapshotList = document.createElement('ul');
  snapshotList.className = 'pc-history-snapshots';
  div.appendChild(snapshotList);
  this.snapshotList = snapshotList;

  parentDiv.appendChild(div);
  return div;
};

History.prototype.resizeTree = function () {
  var tree = this.tree;
  this.width = this.div.offsetWidth;
  tree.setSize(tree.canvasEl.offsetWidth - this.width, tree.canvasEl.offsetHeight);
  if (this.isCollapsed()) {
    tree.canvasEl.getElementsByTagName('canvas')[0].style.marginLeft = this.width + 'px';
  } else {
    tree.canvasEl.getElementsByTagName('canvas')[0].style.marginLeft = '20%';
  }
};

/**
 * Add a snapshot of the tree to the history
 * 1.0.6-1 (08/04/2014) - put the new snapshot at the top of the list github issue #17
 */
History.prototype.addSnapshot = function (id) {
  var historyIdPrefix = 'phylocanvas-history-';
  // So that addSnapshot will not be invoked on drawing the subtree
  // You dont need to create a snapshot of an already created one.
  var treetype = this.tree.treeType;
  var match = false;
  var init = true;

  // Check if there is a snapshot already available. If not, then add a snapshot
  this.tree.historySnapshots.forEach(function (ele) {
    var dataTreeType = ele.getAttribute('data-tree-type');
    ele.style.background = 'transparent';
    if (ele.id == historyIdPrefix + id && ele.getAttribute('data-tree-type') == treetype) {
      // History already present
      match = true;
      ele.style.background = 'lightblue';
    }
  });

  // Check if there is a snapshot already available. If not, then add a snapshot
  if (match) {
    return;
  }
  var url = this.tree.getPngUrl();
  var listElement = document.createElement('li');
  var thumbnail = document.createElement('img');

  thumbnail.width = this.width;
  thumbnail.src = url;
  thumbnail.id = historyIdPrefix + id;
  thumbnail.setAttribute('data-tree-type', this.tree.treeType);
  thumbnail.style.background = 'lightblue';
  // Creating the snapshot array which is used to check if the element exists in history in further clicks
  this.tree.historySnapshots.push(thumbnail);

  listElement.appendChild(thumbnail);
  this.snapshotList.appendChild(listElement);

  addEvent(thumbnail, 'click', this.goBackTo.bind(this));
};

History.prototype.clear = function () {
  var listElements = this.snapshotList.getElementsByTagName('li');
  for (var i = listElements.length; i-- ;) {
    this.snapshotList.removeChild(listElements[0]);
  }
};

History.prototype.goBackTo = function (evt) {
  var ele = evt.target;
  this.tree.treeType = ele.getAttribute('data-tree-type');
  this.tree.redrawFromBranch(this.tree.origBranches[ele.id.replace('phylocanvas-history-', '')]);
};

History.prototype.injectCss = function () {
  var css =
    '.pc-history { position: absolute; top: 0; bottom: 0; left: 0; box-sizing: border-box; width: 20%; overflow: hidden; background: #EEE }' +
    '.pc-history .pc-history-title { box-sizing: border-box; height: 20px; text-align: center; font-size: 13px; color: #666; padding: 2px; border-bottom: 1px solid #bbb }' +
    '.pc-history .toggle { position: absolute; top: 0; right: 0; padding: 2px 8px; cursor: pointer; border-top-left-radius: 50%; border-bottom-left-radius: 50%; background-color: #666; color: #FFF; box-sizing: border-box; height: 20px; }' +
    '.pc-history.collapsed .toggle { border-radius: 0 50% 50% 0 }' +
    '.pc-history .toggle:hover { background-color: #FFF; color: #CCC }' +
    '.pc-history.collapsed { width: 25px }' +
    '.pc-history.collapsed .pc-history-snapshots { display: none }' +
    '.pc-history.collapsed .pc-history-title { writing-mode: tb-rl; -webkit-transform: rotate(270deg); -moz-transform: rotate(270deg); -o-transform: rotate(270deg); -ms-transform: rotate(270deg); transform: rotate(270deg); margin-top: 70px; background: 0 0; color: #666; letter-spacing: 1.2px; border-bottom: none }' +
    '.pc-history-snapshots { position: absolute; top: 20px; bottom: 0; margin: 0; padding: 0; overflow-x: hidden; overflow-y: scroll; }' +
    '.pc-history-snapshots li { list-style: outside none none }' +
    '.pc-history img { border: 0px solid #CCC; border-top-width: 1px; cursor: pointer; width: 100%; box-sizing: border-box; transition: background-color .25s ease; display: block }' +
    '.pc-history img:hover { background-color: #fff }';
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');

  style.type = 'text/css';
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);
};


Tree.prototype.initialiseHistory = function (config) {
  var isCollapsedConfigured;

  if (config.history || typeof config.history === 'undefined') {
    isCollapsedConfigured = (config.history && typeof config.history.collapsed !== 'undefined');
    this.historyCollapsed = isCollapsedConfigured ? config.history.collapsed : true;
    this.historySnapshots = [];
    this.history = new History(this);
  }
};
