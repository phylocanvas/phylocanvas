import Parser from '../Parser';
import newickParserDefinition from './newick';
import nexusParserDefinition from './nexus';

export default {
  nexus: new Parser(nexusParserDefinition),
  newick: new Parser(newickParserDefinition)
};
