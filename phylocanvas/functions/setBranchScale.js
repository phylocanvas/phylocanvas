import types from '../types';
import resetMinScale from './resetMinScale';

export default function (tree, branchScale, point) {
  const pointX = point.x;
  const pointY = point.y;
  let offsetX = tree.state.offsetX;
  let offsetY = tree.state.offsetY;

  if (point) {
    const axis = types[tree.state.type].branchScalingAxis;
    const scaleRatio = branchScale / tree.state.branchScale;

    if (axis === 'x' || axis === 'xy') {
      const offset = tree.state.offsetX;
      offsetX = offset + ((pointX) - ((pointX - offset) * scaleRatio + offset));
    }

    if (axis === 'y' || axis === 'xy') {
      const offset = tree.state.offsetY;
      offsetY = offset + ((pointY) - ((pointY - offset) * scaleRatio + offset));
    }
  }

  return tree.chain(
    () => ({ branchScale, offsetX, offsetY }),
    resetMinScale
  );
}
