import types from '../types';
import setStepScale from '../functions/setStepScale';

export default function (tree, stepScale, point = tree.getCentrePoint()) {
  const axis = types[tree.state.type].stepScalingAxis;

  if (axis && stepScale > 0) {
    tree.setState(
      setStepScale(tree, stepScale, point)
    );
  }
}
