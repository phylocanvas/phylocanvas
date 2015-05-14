
function fireEvent(element, type, params) {
  var event; // The custom event that will be created
  var param;

  if (document.createEvent) {
    event = document.createEvent('HTMLEvents');
    event.initEvent(type, true, true);
  } else {
    event = document.createEventObject();
    event.eventType = type;
  }

  event.eventName = type;
  event.bubbles = false;
  if (params) {
    for (param in params) {
      if (params.hasOwnProperty(param)) {
        event[param] = params[param];
      }
    }
  }

  if (document.createEvent) {
    element.dispatchEvent(event);
  } else {
    element.fireEvent('on' + event.eventType, event);
  }
}

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

module.exports.fireEvent = fireEvent;
module.exports.setupDownloadLink = setupDownloadLink;
