import Parser from '../Parser';
import newickParserDefinition from './newick';

export default {
  newick: new Parser(newickParserDefinition)
};
