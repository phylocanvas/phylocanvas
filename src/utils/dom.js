var fireEvent = require('./events').fireEvent;

function setupDownloadLink(data, filename) {
  var blob = new Blob([ data ], { type: 'text/csv;charset=utf-8' });
  var url = window.URL || window.webkitURL;
  var anchor = document.createElement('a');
  var isDownloadSupported = (typeof anchor.download !== 'undefined');

  anchor.href = url.createObjectURL(blob);
  anchor.target = '_blank';
  if (isDownloadSupported) {
    anchor.download = (filename) ? filename : 'pc-download.txt';
  }
  fireEvent(anchor, 'click');
}

/**
 * Get the x coordinate of oElement
 *
 * @param domElement - The element to get the X position of.
 *
 */
function getX(domElement) {
  var xValue = 0;
  while (domElement != null) {
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
function getY(domElement) {
  var yValue = 0;
  while (domElement) {
    yValue += domElement.offsetTop;
    domElement = domElement.offsetParent;
  }
  return yValue;
}

function addClass(element, className) {
  var classes = element.className.split(' ');
  if (classes.indexOf(className) === -1) {
    classes.push(className);
    element.className = classes.join(' ');
  }
}

function removeClass(element, className) {
  var classes = element.className.split(' ');
  var index = classes.indexOf(className);

  if (index !== -1) {
    classes.splice(index, 1);
    element.className = classes.join(' ');
  }
}

function hasClass(element, className) {
  var classes = element.className.split(' ');
  var index = classes.indexOf(className);

  return index !== -1;
}

module.exports.setupDownloadLink = setupDownloadLink;
module.exports.getX = getX;
module.exports.getY = getY;
module.exports.addClass = addClass;
module.exports.removeClass = removeClass;
module.exports.hasClass = hasClass;
