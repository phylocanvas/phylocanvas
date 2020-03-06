import fitInPanel from '../functions/fitInPanel';

export default function (tree) {
  tree.setState(
    fitInPanel(tree)
  );
}
