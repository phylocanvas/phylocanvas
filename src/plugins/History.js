import { addClass, hasClass, removeClass } from '../utils/dom';
import { fireEvent, addEvent, killEvent } from '../utils/events';

import { Tree } from '../index';

class History {

  constructor(tree) {
    this.tree = tree;

    this.injectCss();
    this.div = this.createDiv(tree.canvasEl);

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

  reset() {
    this.clear();
    // Fixing initial snapshot - draw only after the tree is drawn
    if (this.tree.drawn) {
      this.addSnapshot(this.tree.root.id);
    }
  }

  collapse() {
    addClass(this.div, 'collapsed');
    this.toggleDiv.firstChild.data = '>';
    this.resizeTree();
    this.tree.draw();
  }

  expand() {
    removeClass(this.div, 'collapsed');
    this.toggleDiv.firstChild.data = '<';
    this.resizeTree();
    this.tree.draw();
  }

  isCollapsed() {
    return hasClass(this.div, 'collapsed');
  }

  toggle() {
    if (this.isCollapsed()) {
      this.expand();
    } else {
      this.collapse();
    }
    fireEvent(this.tree.canvasEl, 'historytoggle', { isOpen: !this.isCollapsed() });
  }

  createDiv(parentDiv) {
    var div = document.createElement('div');
    div.className = 'pc-history';
    addEvent(div, 'click', killEvent);
    addEvent(div, 'contextmenu', killEvent);

    let title = document.createElement('div');
    title.innerHTML = 'History';
    title.className = 'pc-history-title';
    div.appendChild(title);

    let tabDiv = document.createElement('div');
    tabDiv.appendChild(document.createTextNode('<'));
    tabDiv.className = 'toggle';
    addEvent(tabDiv, 'click', this.toggle.bind(this));
    div.appendChild(tabDiv);
    this.toggleDiv = tabDiv;

    let snapshotList = document.createElement('ul');
    snapshotList.className = 'pc-history-snapshots';
    div.appendChild(snapshotList);
    this.snapshotList = snapshotList;

    parentDiv.appendChild(div);
    return div;
  }

  resizeTree() {
    var tree = this.tree;
    this.width = this.div.offsetWidth;
    tree.setSize(tree.canvasEl.offsetWidth - this.width, tree.canvasEl.offsetHeight);
    if (this.isCollapsed()) {
      tree.canvasEl.getElementsByTagName('canvas')[0].style.marginLeft = this.width + 'px';
    } else {
      tree.canvasEl.getElementsByTagName('canvas')[0].style.marginLeft = '20%';
    }
  }

  addSnapshot(id) {
    var historyIdPrefix = 'phylocanvas-history-';
    var treetype = this.tree.treeType;
    var historyAlreadyPresent = false;

    this.tree.historySnapshots.forEach(function (ele) {
      ele.style.background = 'transparent';
      if (ele.id === historyIdPrefix + id && ele.getAttribute('data-tree-type') === treetype) {
        historyAlreadyPresent = true;
        ele.style.background = 'lightblue';
      }
    });

    if (historyAlreadyPresent) {
      return;
    }
    let url = this.tree.getPngUrl();
    let listElement = document.createElement('li');
    let thumbnail = document.createElement('img');

    thumbnail.width = this.width;
    thumbnail.src = url;
    thumbnail.id = historyIdPrefix + id;
    thumbnail.setAttribute('data-tree-type', this.tree.treeType);
    thumbnail.style.background = 'lightblue';

    this.tree.historySnapshots.push(thumbnail);

    listElement.appendChild(thumbnail);
    this.snapshotList.appendChild(listElement);

    addEvent(thumbnail, 'click', this.goBackTo.bind(this));
  }

  clear() {
    var listElements = this.snapshotList.getElementsByTagName('li');
    for (let i = listElements.length; i--; ) {
      this.snapshotList.removeChild(listElements[0]);
    }
  }

  goBackTo(event) {
    var element = event.target;
    this.tree.setTreeType(element.getAttribute('data-tree-type'), true);
    this.tree.redrawFromBranch(this.tree.originalTree.branches[element.id.replace('phylocanvas-history-', '')]);
  }

  injectCss() {
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
  }

}

export default function historyPlugin(decorate) {
  decorate(this, 'createTree', function (delegate, args) {
    let tree = delegate(...args);
    let [, config] = args;
    if (config.history || typeof config.history === 'undefined') {
      let isCollapsedConfigured = (config.history && typeof config.history.collapsed !== 'undefined');
      tree.historyCollapsed = isCollapsedConfigured ? config.history.collapsed : true;
      tree.historySnapshots = [];
      tree.history = new History(tree);
    }
    return tree;
  });

  decorate(Tree, 'resizeToContainer', function (delegate) {
    if (!this.history) {
      return delegate.apply(this);
    }
    this.history.resizeTree();
  });

  this.History = History;
}
