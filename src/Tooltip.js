/**
 * Tooltip base class
 *
 * @class
 */
class Tooltip {
  /**
   * @constructor
   * @param {Tree} tree instance
   * @param {Object} [options]
   * @param {string} [options.className=phylocanvas-tooltip]
   * @param {HTMLElement} [options.element=document.createElement('div')]
   * @param {number} [options.zIndex=2000]
   * @param {HTMLElement} [options.parent=tree.containerElement]
   */
  constructor(tree, {
    className = 'phylocanvas-tooltip',
    element = document.createElement('div'),
    zIndex = 2000,
    parent = tree.containerElement,
  } = {}) {
    this.tree = tree;
    this.element = element;
    this.element.className = className;
    this.element.style.display = 'none';
    this.element.style.position = 'fixed';
    this.element.style.zIndex = zIndex;
    this.closed = true;

    parent.appendChild(this.element);
  }

  /**
   * @method
   */
  close() {
    this.element.style.display = 'none';
    this.closed = true;
  }

  /**
   * @param {number} [x=100]
   * @param {number} [y=100]
   * @param {Branch} [node]
   */
  open(x = 100, y = 100, node) {
    while (this.element.hasChildNodes()) {
      this.element.removeChild(this.element.firstChild);
    }

    this.createContent(node);

    this.element.style.top = `${y}px`;
    this.element.style.left = `${x}px`;

    this.element.style.display = 'block';

    this.closed = false;
  }

  /**
   * @throws an error if not overridden by a subclass.
   */
  createContent() {
    throw new Error('Not implemented');
  }
}

export default Tooltip;

// named export cannot have a doclet
// @extends not working well
export class ChildNodesTooltip extends Tooltip {

  /**
   * Tooltip displaying number of child nodes.
   *
   * @constructor
   * @param {Tree} tree instance
   * @param {Object} [options]
   * @see {@link Tooltip}
   */
  constructor(tree, options) {
    super(tree, options);

    this.element.style.background = 'rgba(97, 97, 97, 0.9)';
    this.element.style.color = '#fff';
    this.element.style.cursor = 'pointer';
    this.element.style.padding = '8px';
    this.element.style.marginTop = '16px';
    this.element.style.borderRadius = '2px';
    this.element.style.textAlign = 'center';
    this.element.style.fontFamily = this.tree.font || 'sans-serif';
    this.element.style.fontSize = '10px';
    this.element.style.fontWeight = '500';
  }

  /**
   * Adds a text node containing the number of children.
   * @override
   */
  createContent(node) {
    const textNode = document.createTextNode(node.getChildProperties('id').length);
    this.element.appendChild(textNode);
  }
}
