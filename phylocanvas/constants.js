/**
 * An enumeration of certain pre-defined angles to enable faster drawing of
 * trees. There are FORTYFIVE, QUARTER, HALF and FULL. Values are all radians.
 *
 * @enum
 * @memberof Phylocanvas
 * @constant
 */
export const Angles = {
  /**
   * @constant
   * @type double
   * @description The equivalent of 0 degrees in Radians
   */
  Degrees0: 0,
  /**
   * @constant
   * @type double
   * @description The equivalent of 45 degrees in Radians
   */
  Degrees45: Math.PI * 0.25,
  /**
   * @constant
   * @type double
   * @description The equivalent of 90 degrees in Radians
   */
  Degrees90: Math.PI * 0.5,
  /**
   * @constant
   * @type double
   * @description The equivalent of 180 degrees in Radians
   */
  Degrees180: Math.PI,
  /**
   * @constant
   * @type double
   * @description The equivalent of 270 degrees in Radians
   */
  Degrees270: Math.PI * 1.5,
  /**
   * @constant
   * @type double
   * @description The equivalent of 270 degrees in Radians
   */
  Degrees360: Math.PI * 2,
};

export const TreeTypes = {
  Radial: 'rd',
  Rectangular: 'rc',
  Circular: 'cr',
  Diagonal: 'dg',
  Hierarchical: 'hr',
};

export const EmptyArray = [];
