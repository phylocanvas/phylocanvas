import getPostorderTraversal from '../utils/getPostorderTraversal';

function reroot(tree, layout, parent, sourceNode) {
  const newRoot = {
    branchLength: sourceNode.branchLength,
    children: [],
    parent,
  };
  parent.children.push(newRoot);

  for (const child of sourceNode.parent.children) {
    if (child !== sourceNode) {
      newRoot.children.push(child);
    }
  }

  if (sourceNode.parent.parent && sourceNode.parent !== layout.rootNode) {
    reroot(tree, layout, newRoot, sourceNode.parent);
  }
}

function getSource(newRoot) {
  const postorderTraversal = getPostorderTraversal(newRoot);
  const subtrees = [];
  for (const node of postorderTraversal) {
    if (node.isLeaf) {
      subtrees.push(`${node.id}:${node.branchLength}`);
    } else if (node !== newRoot) {
      const chunks = subtrees.splice(subtrees.length - node.children.length, node.children.length);
      subtrees.push(`(${chunks.join(',')}):${node.branchLength}`);
    }
  }

  return `(${subtrees.join(',')});`;
}

export default function (tree, nodeOrId) {
  const node = tree.getNodeById(nodeOrId);
  const layout = tree.layout();

  if (node.parent) {
    const newRoot = {
      branchLength: 0,
      children: [],
    };

    reroot(tree, layout, newRoot, node);
    newRoot.children.push(node);

    const source = {
      type: 'newick',
      original: tree.state.source,
      data: getSource(newRoot),
    };

    tree.setSource(source);
  }
}
