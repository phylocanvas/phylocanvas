import fitInPanel from './fitInPanel';

export default function (tree) {
  const { minScale } = fitInPanel(tree);
  return { minScale };
}
