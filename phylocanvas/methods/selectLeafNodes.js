import setSelectedIds from '../functions/setSelectedIds';

export default function (tree, ids, append) {
  if (ids && Array.isArray(ids)) {
    tree.setState(
      setSelectedIds(tree, ids, append)
    );
  }
}
