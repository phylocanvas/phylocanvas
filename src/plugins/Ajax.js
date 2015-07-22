import Tree from '../Tree';

function http({ url, method, data }, callback) {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      callback(xhr);
    }
  };
  xhr.open(method, url, true);
  if (method === 'GET') {
    xhr.send();
  } else {
    xhr.send(data);
  }
}

export default function ajaxPlugin(decorate) {
  decorate(Tree, 'build', function (delegate, args) {
    let [ inputString, parser, options ] = args;

    if (options.ajax || inputString.match(parser.fileExtension)) {
      http(
        { url: inputString, method: 'GET' },
        (response) => {
          if (response.status >= 400) {
            return this.loadError(new Error(response.responseText));
          }
          delegate.call(this, response.responseText, parser, options);
        }
      );
    } else {
      delegate.apply(this, args);
    }
  });
}
