import transform from '../functions/transform';

export default function (tree, dx = 0, dy = 0, dz = 0, point = tree.getCentrePoint()) {
  if (dx !== 0 || dy !== 0 || dz !== 0) {
    tree.setState(
      transform(tree, dx, dy, dz, point)
    );
  }
}
