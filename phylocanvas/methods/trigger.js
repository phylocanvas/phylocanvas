export default function (tree, eventName, args) {
  const callback = tree[`on${eventName}`];
  if (typeof(callback) === 'function') {
    callback.apply(tree, args);
  }
}
