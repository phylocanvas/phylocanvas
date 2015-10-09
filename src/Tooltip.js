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

    this.element.style.top = `${y}px`;
    this.element.style.left = `${x}px`;

    this.element.style.display = 'block';
    //

    this.closed = false;
  }

}

export class ChildNodesTooltip extends Tooltip {

  constructor(tree, options) {
    super(tree, options);

    this.element.style.background = 'rgba(97, 97, 97, 0.9)';
    this.element.style.color = '#fff';
    this.element.style.cursor = 'pointer';
    this.element.style.padding = '8px';
    this.element.style.marginTop = '16px';
    this.element.style.transform = 'translateX(-52%)'; // 52% prevents blurry text in Chrome
    this.element.style.borderRadius = '2px';
    this.element.style.textAlign = 'center';
    this.element.style.fontFamily = this.tree.font || 'sans-serif';
    this.element.style.fontSize = '10px';
    this.element.style.fontWeight = 'bold';
  }

  createContent(node) {
    var numChildren = node.getChildIds().length;
    this.element.appendChild(
      document.createTextNode(
        `${numChildren} ${numChildren === 1 ? 'Child Node' : 'Child Nodes'}`
      )
    );
  }
}
