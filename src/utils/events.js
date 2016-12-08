export function preventDefault(event) {
  event.preventDefault();
  return false;
}

export function fireEvent(element, type, params = {}) {
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

  for (param in params) {
    if (params.hasOwnProperty(param)) {
      event[param] = params[param];
    }
  }

  if (document.createEvent) {
    element.dispatchEvent(event);
  } else {
    element.fireEvent('on' + event.eventType, event);
  }
}

export function addEvent(elem, event, fn) {
  if (elem.addEventListener) {
    elem.addEventListener(event, fn, false);
  } else {
    elem.attachEvent('on' + event, function () {
      // set the this pointer same as addEventListener when fn is called
      return (fn.call(elem, window.event));
    });
  }
}

export function removeEvent(elem, event, fn) {
  if (elem.removeEventListener) {
    elem.removeEventListener(event, fn, false);
  } else {
    console.warn('[Phylocanvas] Unable to remove event, removeEventListener not supported');
  }
}

export function killEvent(e) {
  e.stopPropagation();
  e.preventDefault();
}

/**
 * Creates a function which can be called from an event handler independent of
 * scope.
 *
 * @param {Object} obj the object the function will be called on
 * @param {String} func the name of the function to be called
 * @retuns {function}
 */
export function createHandler(obj, func) {
  var handler;

  if (typeof func === typeof 'aaa') {
    handler = function (e) {
      if (obj[func]) {
        return obj[func](e);
      }
    };
  } else {
    handler = function () { return func(obj); };
  }
  return handler;
}
