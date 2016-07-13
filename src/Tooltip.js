/**
 * Tooltip base class
 *
 * @class
 */
function Tooltip(tree, {
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

Tooltip.prototype.close = function () {
  this.element.style.display = 'none';
  this.closed = true;
};

Tooltip.prototype.open = function (x = 100, y = 100, node) {
  while (this.element.hasChildNodes()) {
    this.element.removeChild(this.element.firstChild);
  }

  this.createContent(node);

  this.element.style.top = `${y}px`;
  this.element.style.left = `${x}px`;

  this.element.style.display = 'block';

  this.closed = false;
};

export default Tooltip;

export function ChildNodesTooltip(tree, options) {
  Tooltip.call(this, tree, options);

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

ChildNodesTooltip.prototype = Object.create(Tooltip.prototype);
ChildNodesTooltip.prototype.constructor = ChildNodesTooltip;

ChildNodesTooltip.prototype.createContent = function (node) {
  const textNode = document.createTextNode(node.getChildProperties('id').length);
  this.element.appendChild(textNode);
};
