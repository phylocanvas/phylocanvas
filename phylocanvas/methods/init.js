import getPixelRatio from '../utils/getPixelRatio';

export default function (tree, options) {
  tree.state = tree.getInitialState(options);
  tree.pixelRatio = getPixelRatio(tree.ctx);
}
