import { parseFn as parseNewick } from './newick';

const format = 'nexus';
const fileExtension = /\.n(ex|xs)$/;
const validator = /^#NEXUS[\s\n;\w\W\.\*\:(\),-=\[\]\/&]+$/i;

function parseFn({ string, root, options }, callback) {
  if (!string.match(/BEGIN TREES/gi)) {
    return callback(new Error('The nexus file does not contain a tree block'));
  }

  let { name } = options;

  // get everything between BEGIN TREES and next END;
  let treeSection = string.match(/BEGIN TREES;[\S\s]+END;/i)[0].replace(/BEGIN TREES;\n/i, '').replace(/END;/i, '');
  // get translate section

  let leafNameObject = {};
  let translateSection = treeSection.match(/TRANSLATE[^;]+;/i);
  if (translateSection && translateSection.length) {
    translateSection = translateSection[0];
    //remove translate section from tree section
    treeSection = treeSection.replace(translateSection, '');

    //parse translate section into kv pairs
    translateSection = translateSection.replace(/translate|;/gi, '');

    let tIntArr = translateSection.split(',');
    for (let i = 0; i < tIntArr.length; i++) {
      let ia = tIntArr[i].trim().replace('\n', '').split(' ');
      if (ia[0] && ia[1]) {
        leafNameObject[ia[0].trim()] = ia[1].trim();
      }
    }
  }

  // find each line starting with tree.
  let tArr = treeSection.split('\n');
  let trees = {};
  // id name is '' or does not exist, ask user to choose which tree.
  for (let i = 0; i < tArr.length; i++) {
    if (tArr[i].trim() === '') continue;
    let s = tArr[i].replace(/tree\s/i, '');
    if (!name) {
      name = s.trim().match(/^\w+/)[0];
    }
    trees[name] = s.trim().match(/[\S]*$/)[0];
  }
  if (!trees[name]) {
    return new Error('tree ' + name + ' does not exist in this NEXUS file');
  }

  parseNewick({ string: trees[name].trim(), root }, function (error) {
    if (error) {
      return callback(error);
    }

    callback();

    // translate in accordance with translate block
    if (leafNameObject) {
      for (let n of Object.keys(leafNameObject)) {
        let branches = root.tree.branches;
        let branch = branches[n];
        delete branches[n];
        branch.id = leafNameObject[n];
        branches[branch.id] = branch;
      }
      root.tree.draw();
    }
  });
}

export default {
  parseFn,
  format,
  fileExtension,
  validator
};
