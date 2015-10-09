/**
 * Tooltip
 *
 * @constructor
 * @memberOf PhyloCanvas
 */
export default class Tooltip {

  constructor(tree, {
    className = 'phylocanvas-tooltip',
    element = document.createElement('div'),
    zIndex = 2000
  } = {}) {
    this.tree = tree;
    this.element = element;
    this.element.className = className;
    this.element.style.display = 'none';
    this.element.style.position = 'fixed';
    this.element.style.zIndex = zIndex;
    this.closed = true;

    this.tree.canvasEl.appendChild(this.element);
  }

  close() {
    this.element.style.display = 'none';
    this.closed = true;
  }

  open(x = 100, y = 100, node) {
    while (this.element.hasChildNodes()) {
      this.element.removeChild(this.element.firstChild);
    }

    this.createContent(node);

    this.element.style.top = y + 'px';
    this.element.style.left = x + 'px';

    this.element.style.display = 'block';

    this.closed = false;
  }

}

export class ChildNodesTooltip extends Tooltip {

  constructor(tree, options) {
    super(tree, options);

    this.element.style.border = '1px solid #CCCCCC';
    this.element.style.background = '#FFFFFF';
    this.element.style.letterSpacing = '0.5px';
  }

  createElement(tagName, textContent) {
    var element = document.createElement(tagName);
    element.style.cursor = 'pointer';
    element.style.padding = '0.3em 0.5em 0.3em 0.5em';
    element.style.fontFamily = this.tree.font;
    element.style.fontSize = this.fontSize || '12pt';
    element.style.color = 'black';
    if (typeof textContent === 'object') {
      element.appendChild(textContent);
    } else {
      element.appendChild(document.createTextNode(textContent));
    }
    return element;
  }

  createContent(node) {
    this.element.appendChild(
      this.createElement('div', node.getChildIds().length)
    );
  }
}
