import http from './utils/http';

export default class Parser {

  constructor({ format, parseFn, fileExtension, validator }) {
    this.format = format;
    this.parseFn = parseFn;
    this.fileExtension = fileExtension;
    this.validator = validator;
  }

  parse({ inputString, root, options = {} }, callback) {
    let doParse = (string) => {
      if (string.match(this.validator)) {
        this.parseFn(string, root, options);
        return callback();
      }
      return callback(new Error(`Format string does not validate as "${this.format}"`));
    };

    if (inputString.match(this.fileExtension)) {
      http(
        { url: inputString, method: 'GET' },
        (response) => {
          if (response.status >= 400) {
            return callback(new Error(response.responseText));
          }
          doParse(response.responseText);
        }
      );
    } else {
      doParse(inputString);
    }
  }

}
