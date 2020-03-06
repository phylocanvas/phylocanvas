export default function (tree, state) {
  tree.state = { ...tree.state, ...state };
}
