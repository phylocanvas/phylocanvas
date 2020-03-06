/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint max-params: ["error", 4] */
/* eslint max-len: 0 */

function decorate(fnName, fn) {
  const original = this[fnName];
  this[fnName] = function (...args) {
    return fn.call(this, original.bind(this), args);
  };
}

export default function (tree, plugins) {
  for (const plugin of plugins) {
    if (typeof plugin !== 'function') {
      throw new Error('Invalid plugin provided.');
    }
    plugin.call(tree, tree, decorate.bind(tree), plugin.options);
  }
}
