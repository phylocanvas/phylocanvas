const newickParser = require('biojs-io-newick');

import treeTraversal from './treeTraversal';

export default function (source) {
  let sourceDef = source;
  if (typeof source === 'string') {
    sourceDef = { type: 'newick', data: source };
  }

  const { type, data, ...options } = sourceDef;
  let rootNode = null;
  if (type === 'newick' || type === undefined) {
    rootNode = newickParser.parse_newick(data);
  } else if (type === 'biojs') {
    rootNode = data;
  } else {
    throw new Error(`Source type is not supported: ${type}`);
  }

  return treeTraversal(rootNode, options);
}
