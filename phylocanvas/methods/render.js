import types from '../types';

export default function (tree) {
  tree.resizeCanvas();
  
  const layout = tree.layout();

  const t0 = performance.now();

  tree.preRender(layout);

  if (tree.state.styleNodeLines) {
    for (const node of layout.postorderTraversal) {
      if (node.isLeaf) {
        const nodeStyle = tree.state.styles ? tree.state.styles[node.id] : undefined;
        node.strokeStyle = (nodeStyle ? nodeStyle.strokeStyle : undefined) || tree.state.strokeStyle;
      } else {
        node.strokeStyle = node.children[0].strokeStyle;
        for (const child of node.children) {
          if (child.strokeStyle !== node.strokeStyle) {
            node.strokeStyle = tree.state.strokeStyle;
            break;
          }
        }
      }
    }
  }

  const startIndex = layout.rootNode.preIndex;
  const stopIndex = layout.rootNode.preIndex + layout.rootNode.totalNodes;

  for (let i = startIndex; i < stopIndex; i++) {
    const node = layout.preorderTraversal[i];
    if (node !== layout.rootNode) {
      if (node.id === tree._.highlightedId) {
        tree.ctx.strokeStyle = tree.state.highlightedStyle;
      } else if (tree.state.styleNodeLines) {
        tree.ctx.strokeStyle = node.strokeStyle;
      } else {
        tree.ctx.strokeStyle = tree.state.strokeStyle;
      }

      types[tree.state.type].drawLine(tree, layout, node);

      // skip collapsed sub-trees
      if (node.isCollapsed) {
        i += node.totalNodes - 1;
      }
    }
  }

  for (let i = startIndex; i < stopIndex; i++) {
    const node = layout.preorderTraversal[i];
    tree.drawNode(layout, node);

    // skip collapsed sub trees
    if (node.isCollapsed) {
      i += node.totalNodes - 1;
    }
  }

  tree.postRender(layout);

  const t1 = performance.now();

  tree.log('render took ', (t1 - t0), ' milliseconds.');
}
