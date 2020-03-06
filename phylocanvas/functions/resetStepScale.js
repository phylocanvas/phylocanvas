import defaults from '../defaults';

export default function (tree) {
  // reset tree step scale to default value
  return {
    stepScale: defaults.stepScale,
  };
}
