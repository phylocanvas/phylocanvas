import suspend from './suspend';
import resume from './resume';

export default function (tree, decorate) {
  tree.suspend = suspend.bind(null, tree);
  tree.resume = resume.bind(null, tree);
  tree.deferred = {
    count: 0,
    render: false,
  };
  decorate('render', (delegate, args) => {
    if (tree.deferred.count > 0) {
      tree.deferred.render = true;
      tree.log('render is suspended');
    } else {
      delegate(...args);
    }
  });
}
