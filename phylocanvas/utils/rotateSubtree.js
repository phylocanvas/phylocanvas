function rotate(array, startIndex, node) {
  const subtrees = [];
  for (const childNode of node.children) {
    const subtree = array.splice(startIndex, childNode.totalNodes);
    subtrees.push(subtree);
  }
  for (const subtree of subtrees) {
    array.splice(startIndex, 0, ...subtree);
  }
}

export default function (tree, layout, node) {
  const { preorderTraversal, postorderTraversal } = layout;

  rotate(preorderTraversal, preorderTraversal.indexOf(node) + 1, node);
  for (let i = 0; i < preorderTraversal.length; i++) {
    preorderTraversal[i].preIndex = i;
  }

  rotate(postorderTraversal, postorderTraversal.indexOf(node) - node.totalNodes + 1, node);
  for (let i = 0; i < postorderTraversal.length; i++) {
    postorderTraversal[i].postIndex = i;
  }

  node.children.reverse();
}
