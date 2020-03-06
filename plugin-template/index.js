import defaults from './defaults';

export default function (tree, decorate) {
  decorate('getInitialState', (delegate, args) => {
    const [ options ] = args;
    const { pluginName = {} } = options;
    return {
      ...delegate(...args),
      pluginName: {
        ...defaults,
        ...pluginName,
      },
    };
  });
}
