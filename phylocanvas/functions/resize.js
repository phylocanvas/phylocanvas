import getPixelRatio from '../utils/getPixelRatio';

export default function (tree, width, height) {
  tree.pixelRatio = getPixelRatio(tree.ctx);
  return { size: { width, height } };
}
