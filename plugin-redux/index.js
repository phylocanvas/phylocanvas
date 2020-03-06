export default function (store, selector, stateKey) {
  return function (tree, decorate) {
    tree.stateKey = stateKey;

    store.subscribe(() => {
      const state = store.getState();
      const nextTree = selector ? selector(state) : state;

      if (tree.state === nextTree) return;

      tree.state = nextTree;
      tree.render();
    });

    decorate('mergeState', (delegate, args) => {
      const [ state ] = args;
      tree.state = { ...tree.state, ...state };
    });

    decorate('dispatch', (delegate, args) => {
      const [ type, payload ] = args;
      store.dispatch({
        getTree: () => tree,
        reducer: tree.reducer,
        stateKey,
        type,
        payload,
      });
    });
  };
}
