export default function (tree, ...pipeline) {
  const buffer = {};

  for (const func of pipeline) {
    if (typeof(func) === 'function') {
      const updater = func(tree);
      Object.assign(buffer, updater);
      Object.assign(tree.state, updater);
    }
  }

  return buffer;
}
