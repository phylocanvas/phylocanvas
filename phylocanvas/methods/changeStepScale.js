import zoomLevelToScale from '../utils/zoomLevelToScale';

export default function (tree, delta, point = tree.getCentrePoint()) {
  tree.setStepScale(
    zoomLevelToScale(tree, tree.state.stepScale, delta),
    point
  );
}
