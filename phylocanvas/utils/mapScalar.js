/**
 * Maps a scalar value on the canvas plane to a scalar value on the tree plane.
 *
 * @param {Object} tree - a tree instance
 * @param {Number} value - the value to be mapped.
 *
 * @example <caption>Example usage of mapScalar with a tree scale equals 2.</caption>
 * // returns 5
 * mapScalar(tree, 10);
 *
 * @returns {Number} Mapped value
 */
export default function (tree, value) {
  return (value / tree.state.scale);
}
