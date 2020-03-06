import fitInPanel from './fitInPanel';
import resetBranchScale from './resetBranchScale';
import resetStepScale from './resetStepScale';

export default function (tree) {
  return tree.chain(
    resetStepScale,
    resetBranchScale,
    fitInPanel
  );
}

