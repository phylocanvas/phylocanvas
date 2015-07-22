export default class Parser {

  constructor({ format, parseFn, fileExtension, validator }) {
    this.format = format;
    this.parseFn = parseFn;
    this.fileExtension = fileExtension;
    this.validator = validator;
  }

  parse({ formatString, root, options = { validate: true } }, callback) {
    if (formatString.match(this.validator) || options.validate === false) {
      return this.parseFn({ string: formatString, root, options }, callback);
    }
    return callback(new Error(`Format string does not validate as "${this.format}"`));
  }

}
