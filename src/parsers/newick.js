import Branch from '../Branch';
import { Shapes } from '../utils/constants';

const format = 'newick';
const fileExtension = /\.nwk$/;
const validation = /^[\w\W\.\*\:(\),-\/]+;\s?$/gi;

const labelTerminatingChars = [ ':', ',', ')' ];

function parseLabel(string) {
  let label = '';

  for (let char of string) {
    if (labelTerminatingChars.some((c) => c === char)) {
      return label;
    }
    label += char;
  }
}

function parseAnnotations(label, branch) {
  let segments = label.split('**');
  branch.id = segments[0];
  if (segments.length === 1) return;
  segments = segments[1].split('*');

  for (let b = 0; b < segments.length; b += 2) {
    let value = segments[b + 1];
    switch (segments[b]) {
      case 'nsz' :
        branch.radius = window.parseInt(value);
        break;
      case 'nsh' :
        if (Shapes[value]) {
          branch.nodeShape = Shapes[value];
        } else if (branch.nodeRenderers[value]) {
          branch.nodeShape = value;
        } else {
          branch.nodeShape = 'circle';
        }
        break;
      case 'ncol' : branch.colour = value;
        let hexRed = '0x' + branch.colour.substring(0, 2);
        let hexGreen = '0x' + branch.colour.substring(2, 4);
        let hexBlue = '0x' + branch.colour.substring(4, 6);
        branch.colour =
          'rgba(' +
            parseInt(hexRed, 16).toString() + ',' +
            parseInt(hexGreen, 16).toString() + ',' +
            parseInt(hexBlue, 16).toString() +
          ',1)';
        break;
      default:
        break;
    }
  }
}

const nodeTerminatingChars = [ ')', ',' ];

function parseNodeLength(string) {
  let nodeLength = '';

  for (let char of string) {
    if (char in nodeTerminatingChars) {
      break;
    }
    nodeLength += char;
  }
  return nodeLength;
}


function parseBranch(branch, string, index) {
  let label = parseLabel(string.slice(index));
  let postLabelIndex = index + label.length;
  let nodeLength = 0;

  if (label.match(/\*/)) {
    parseAnnotations(label, branch);
  }

  if (string[postLabelIndex] === ':') {
    nodeLength = parseNodeLength(string.slice(postLabelIndex + 1));
    branch.branchLength = Math.max(parseFloat(nodeLength), 0);
  } else {
    branch.branchLength = 0;
  }

  branch.id = label || branch.tree.generateId();
  return postLabelIndex + branch.branchLength;
}

function parse(string, root) {
  let currentNode = root;

  for (let i = 0; i < string.length; i++) {
    let node;
    switch (string[i]) {
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
        for (let l = 0; l < this.leaves.length; l++) {
          if (this.leaves[l].totalBranchLength > this.maxBranchLength) {
            this.maxBranchLength = this.leaves[l].totalBranchLength;
          }
        }
        break;
      default:
          i = parseBranch(currentNode, string, i);
          i--;
        break;
    }
  }
}

export default {
  format,
  fileExtension,
  validation,
  parse
};
