import C2S from 'canvas2svg';

function exportSVG(tree, method, args = []) {
  // save a copy of the tree original drawing context
  const originalCxt = tree.ctx;

  // replace the tree drawing context with the SVG drawing context
  const { width, height } = originalCxt.canvas;
  const svgCtx = new C2S(width, height);
  tree.ctx = svgCtx;

  // draw the tree on the SVG drawing context
  tree.render();

  // get the SVG element
  const svg = svgCtx[method].apply(svgCtx, args);

  // restore the tree original drawing context
  tree.ctx = originalCxt;
  tree.render();

  return svg;
}

export default function (tree) {
  tree.exportSVG = () => exportSVG(tree, 'getSvg');
  tree.exportSerialisedSVG = (fixNamedEntities = false) =>
    exportSVG(tree, 'getSerializedSvg', [ fixNamedEntities ]);
}
