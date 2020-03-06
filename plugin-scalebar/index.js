import defaults from './defaults';
import draw from './draw';

export default function (tree, decorate) {
  decorate('getInitialState', (delegate, args) => {
    const [ options ] = args;
    const { scalebar = {} } = options;
    return {
      ...delegate(...args),
      scalebar: {
        ...defaults,
        ...scalebar,
      },
    };
  });

  decorate('render', (delegate, args) => {
    delegate(...args);
    draw(tree);
  });
}
