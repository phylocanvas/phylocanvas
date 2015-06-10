
export default function ({ url, method, data }, callback) {
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
