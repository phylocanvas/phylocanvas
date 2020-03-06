import defaultOptions from '../defaults';

export default function (tree, options) {
  return { ...defaultOptions, ...options };
}
