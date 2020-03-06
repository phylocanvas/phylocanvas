export default function (tree, dz = 0, point = tree.getCentrePoint()) {
  tree.transform(0, 0, dz, point);
}
