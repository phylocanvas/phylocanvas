import Branch from '../Branch';

const format = 'newick';
const fileExtension = /\.nwk$/;
const validator = /^[\w\W\.\*\:(\),-\/]+;\s?$/gi;

function isTerminatingChar(terminatingChar) {
  return this === terminatingChar;
}

const labelTerminatingChars = [ ':', ',', ')', ';' ];

function parseLabel(string) {
  let label = '';
  for (let char of string) {
    if (labelTerminatingChars.some(isTerminatingChar.bind(char))) {
      break;
    }
    label += char;
  }
  return label;
}

function parseAnnotations(label, branch) {
  let segments = label.split('**');
  let displayOptions = {};
  branch.id = segments[0];
  if (segments.length === 1) return;
  segments = segments[1].split('*');

  for (let b = 0; b < segments.length; b += 2) {
    let value = segments[b + 1];
    switch (segments[b]) {
      case 'nsz' :
        displayOptions.size = window.parseInt(value);
        break;
      case 'nsh' :
        displayOptions.shape = value;
        break;
      case 'ncol' :
        displayOptions.colour = value;
        break;
      default:
        break;
    }
  }
  branch.setDisplay(displayOptions);
}

const nodeTerminatingChars = [ ')', ',', ';' ];

function parseBranchLength(string) {
  let nodeLength = '';
  for (let char of string) {
    if (nodeTerminatingChars.some(isTerminatingChar.bind(char))) {
      break;
    }
    nodeLength += char;
  }
  return nodeLength;
}

function parseBranch(branch, string, index) {
  let label = parseLabel(string.slice(index));
  let postLabelIndex = index + label.length;
  let branchLengthStr = '';
  if (label.match(/\*/)) {
    parseAnnotations(label, branch);
  }

  if (string[postLabelIndex] === ':') {
    branchLengthStr = parseBranchLength(string.slice(postLabelIndex + 1));
    branch.branchLength = Math.max(parseFloat(branchLengthStr), 0);
  } else {
    branch.branchLength = 0;
  }

  if (label) {
    branch.label = label;
  }
  branch.id = label || branch.tree.generateBranchId();
  return postLabelIndex + branchLengthStr.length;
}

function parseFn({ string, root }, callback) {
  let cleanString = string.replace(/(\r|\n)/g, '');
  let currentNode = root;

  for (let i = 0; i < cleanString.length; i++) {
    let node;
    switch (cleanString[i]) {
      case '(': // new Child
        node = new Branch();
        currentNode.addChild(node);
        currentNode = node;
        break;
      case ')': // return to parent
        currentNode = currentNode.parent;
        break;
      case ',': // new sibiling
        node = new Branch();
        currentNode.parent.addChild(node);
        currentNode = node;
        break;
      case ';':
        break;
      default:
          try {
            i = parseBranch(currentNode, cleanString, i);
          } catch (e) {
            return callback(e);
          }
        break;
    }
  }
  return callback();
}

export default {
  format,
  fileExtension,
  validator,
  parseFn
};
