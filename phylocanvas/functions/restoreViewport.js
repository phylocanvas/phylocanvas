import getViewport from './getViewport';
import resize from './resize';

import restoreViewport from '../utils/restoreViewport';

export default function (tree, width, height) {
  const { size } = tree.state;
  if (size.width === width && size.height === height) {
    return {};
  }
  const viewport = getViewport(tree);
  return {
    ...resize(tree, width, height),
    ...restoreViewport(viewport, tree.state.padding, width, height),
  };
}
