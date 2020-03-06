function getStartPoint(start, size, minBound, maxBound) {
  if (start + size < minBound + maxBound) {
    return start;
  }

  if (start - size > minBound) {
    return start - size;
  }

  return minBound;
}

export default function (contextMenu, x, y) {
  const { el, parent } = contextMenu;

  el.classList.remove('visible', 'top', 'bottom', 'left', 'right');
  el.style.top = el.style.bottom = el.style.left = el.style.right = null;

  const width = el.offsetWidth;
  const height = el.offsetHeight;

  const top = getStartPoint(y, height, window.scrollY, window.innerHeight);
  const left = getStartPoint(x, width, window.scrollX, window.innerWidth);
  const isTop = (top + height / 2) > y;
  const isLeft = (left + width / 2) > x;

  el.style.left = `${left}px`;
  el.style.top = `${top}px`;

  el.style.transformOrigin =
    `${isTop ? 'top' : 'bottom'} ${isLeft ? 'left' : 'right'}`;

  parent.removeChild(el);
  parent.appendChild(el);
  void el.offsetWidth; // trigger reflow

  el.classList.add('visible');
}
