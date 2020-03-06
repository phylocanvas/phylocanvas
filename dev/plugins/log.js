export default function (tree, decorate) {
  decorate('log', (delegate, args) => {
    console.log(tree.stateKey || '', ...args);
  });
}
