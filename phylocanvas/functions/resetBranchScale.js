import types from '../types';
import defaults from '../defaults';

export default function (tree) {
  return {
    branchScale: types[tree.state.type].getBranchScale(tree, defaults.stepScale),
  };
}
