export default function (scale) {
  return {
    minScale: scale / 2,
    maxScale: Math.max(scale, 16),
  };
}
