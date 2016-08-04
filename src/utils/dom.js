import { fireEvent } from './events';

const windowURL = window.URL || window.webkitURL;

export function createBlobUrl(data, type = 'text/plain;charset=utf-8') {
  const blob = new Blob([ data ], { type });
  return windowURL.createObjectURL(blob);
}

export function setupDownloadLink(url, filename) {
  const anchor = document.createElement('a');
  const isDownloadSupported = (typeof anchor.download !== 'undefined');

  anchor.href = url;
  anchor.target = '_blank';
  if (isDownloadSupported) {
    anchor.download = filename;
  }
  fireEvent(anchor, 'click');
  if (isDownloadSupported) {
    windowURL.revokeObjectURL(anchor.href);
  }
}

/**
 * Get the x coordinate of oElement
 *
 * @param domElement - The element to get the X position of.
 *
 */
export function getX(domElement) {
  let xValue = 0;
  while (domElement) {
    xValue += domElement.offsetLeft;
    domElement = domElement.offsetParent;
  }
  return xValue;
}

/**
 * Get the y coordinate of oElement
 *
 * @param domElement - The element to get the Y position of.
 *
 */
export function getY(domElement) {
  let yValue = 0;
  while (domElement) {
    yValue += domElement.offsetTop;
    domElement = domElement.offsetParent;
  }
  return yValue;
}

export function addClass(element, className) {
  const classes = element.className.split(' ');
  if (classes.indexOf(className) === -1) {
    classes.push(className);
    element.className = classes.join(' ');
  }
}

export function removeClass(element, className) {
  const classes = element.className.split(' ');
  const index = classes.indexOf(className);

  if (index !== -1) {
    classes.splice(index, 1);
    element.className = classes.join(' ');
  }
}

export function hasClass(element, className) {
  const classes = element.className.split(' ');
  const index = classes.indexOf(className);

  return index !== -1;
}

/**
 * Setting the cursor to dragging required vendor prefixes.
 * @param domElement
 */
export function setCursorDragging(domElement) {
  domElement.style.cursor = "-webkit-grabbing";
  domElement.style.cursor = "-moz-grabbing";
  domElement.style.cursor = "grabbing";
}

/**
 * Setting the cursor to drag required vendor prefixes.
 * @param domElement
 */
export function setCursorDrag(domElement) {
  domElement.style.cursor = "-webkit-grab";
  domElement.style.cursor = "-moz-grab";
  domElement.style.cursor = "grab";
}
