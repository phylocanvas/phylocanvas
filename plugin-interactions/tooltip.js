const visibleClass = 'phylocanvas-tooltip-visible';

export function createTooltipElement() {
  const element = document.createElement('div');

  element.className = 'phylocanvas-tooltip';
  element.style.position = 'absolute';
  element.style.pointerEvents = 'none';

  return element;
}

export function showTooltip(element, x, y, content) {
  element.innerHTML = content;

  element.style.left = `${x}px`;
  element.style.top = `${y}px`;

  element.classList.add(visibleClass);
}

export function hideTooltip(element) {
  element.classList.remove(visibleClass);
}
