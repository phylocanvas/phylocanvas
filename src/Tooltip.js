/**
 * Tooltip
 *
 * @constructor
 * @memberOf PhyloCanvas
 */
function Tooltip(tree, className, element) {
  this.tree = tree;
  this.element = element || document.createElement('div');
  this.element.style.display = 'none';
  this.element.style.position = 'fixed';
  this.element.style.border = '1px solid #CCCCCC';
  this.element.style.background = '#FFFFFF';
  this.element.style.letterSpacing = '0.5px';
  this.element.className = className || 'pc-tooltip';
  this.closed = true;

  this.tree.canvasEl.appendChild(this.element);
}

Tooltip.prototype.close = function () {
  this.element.style.display = 'none';
  this.closed = true;
};

Tooltip.prototype.createElement = function (tagName, textContent) {
  var element = document.createElement(tagName || 'div');
  element.style.cursor = 'pointer';
  element.style.padding = '0.3em 0.5em 0.3em 0.5em';
  element.style.fontFamily = this.tree.font;
  element.style.fontSize = this.fontSize || '12pt';
  element.appendChild(document.createTextNode(textContent));
  return element;
};

/**
 * Shows number of child nodes by default
 */
Tooltip.prototype.createContent = function (node) {
  this.element.appendChild(
    this.createElement('div', node.getChildIds().length)
  );
};

Tooltip.prototype.open = function (x, y, node) {
  while (this.element.hasChildNodes()) {
    this.element.removeChild(this.element.firstChild);
  }

  this.createContent(node);

  if (x && y) {
    this.element.style.top = y + 'px';
    this.element.style.left = x + 'px';
  } else {
    this.element.style.top = '100px';
    this.element.style.left = '100px';
  }

  this.element.style.zIndex = 2000;
  this.element.style.display = 'block';
  this.element.style.backgroundColor = '#FFFFFF';

  this.closed = false;
};

module.exports = Tooltip;
