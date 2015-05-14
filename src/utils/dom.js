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

module.exports.setupDownloadLink = setupDownloadLink;
