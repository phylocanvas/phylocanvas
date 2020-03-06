export default function (tree) {
  if (tree.deferred.count > 0) {
    tree.deferred.count -= 1;
  }

  if (tree.deferred.count === 0 && tree.deferred.render) {
    tree.render();
  }

  tree.deferred.render = false;
}
