export default function (tree, updater) {
  if (updater) {
    tree.mergeState(updater);
    tree.render();
  }
}
