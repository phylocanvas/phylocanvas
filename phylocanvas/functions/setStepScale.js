import types from '../types';
import resetMinScale from './resetMinScale';

export default function (tree, stepScale, point) {
  const pointX = point.x;
  const pointY = point.y;
  let offsetX = tree.state.offsetX;
  let offsetY = tree.state.offsetY;
  const scaleRatio = stepScale / tree.state.stepScale;

  if (point) {
    const axis = types[tree.state.type].stepScalingAxis;

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
    () => ({ stepScale, offsetX, offsetY }),
    resetMinScale
  );
}
