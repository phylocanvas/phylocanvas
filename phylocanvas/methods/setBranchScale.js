import types from '../types';
import setBranchScale from '../functions/setBranchScale';

export default function (tree, branchScale, point = tree.getCentrePoint()) {
  const axis = types[tree.state.type].branchScalingAxis;

  if (axis && branchScale > 0) {
    tree.setState(
      setBranchScale(tree, branchScale, point)
    );
  }
}
