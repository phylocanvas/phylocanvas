import zoomLevelToScale from '../utils/zoomLevelToScale';

export default function (tree, delta, point = tree.getCentrePoint()) {
  tree.setBranchScale(
    zoomLevelToScale(tree, tree.state.branchScale, delta),
    point
  );
}
