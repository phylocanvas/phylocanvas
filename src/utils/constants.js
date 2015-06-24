/**
 * An enumeration of certain pre-defined angles to enable faster drawing of
 * trees. There are FORTYFIVE, QUARTER, HALF and FULL. Values are all radians.
 *
 * @enum
 * @memberof PhyloCanvas
 * @constant
 */
export const Angles = {
  /**
   * @constant
   * @type double
   * @description PI / 4
   */
  FORTYFIVE: Math.PI / 4,
  /**
   * @constant
   * @type double
   * @description PI / 2
   */
  QUARTER: Math.PI / 2,
  /**
   * @constant
   * @type double
   * @description PI
   */
  HALF: Math.PI,
  /**
   * @constant
   * @type double
   * @description PI * 2
   */
  FULL: 2 * Math.PI
};


/**
 * dictionary to translate newick annotations to branch renderer ids
 *
 * @enum
 * @memberof PhyloCanvas
 * @constant
 */
export let Shapes = {
  x: 'star',
  s: 'square',
  o: 'circle',
  t: 'triangle'
};
