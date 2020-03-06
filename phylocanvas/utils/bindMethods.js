import methods from '../methods';

export default function (tree) {
  tree.error = console.error;
  tree.log = () => {};

  for (const name of Object.keys(methods)) {
    tree[name] = methods[name].bind(null, tree);
  }
}
