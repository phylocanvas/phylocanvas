export default function (tree, name) {
  return (
    tree._.cache[name] || (tree._.cache[name] = new Map())
  );
}
