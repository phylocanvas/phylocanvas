/**
 * Maps a scalar value on the tree plane to a scalar value on the canvas plane.
 *
 * @param {Object} tree - a tree instance
 * @param {Number} value - the value to be mapped.
 *
 * @example <caption>Example usage of unmapScalar with a tree scale equals 2.</caption>
 * // returns 10
 * unmapScalar(tree, 5);
 *
 * @returns {Number} Mapped value
 */
export default function (tree, value) {
  return value * tree.state.scale;
}
