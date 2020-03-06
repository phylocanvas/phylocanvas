import defaults from '@cgps/phylocanvas/defaults';

export default function (state = {}, { reducer, type, payload }) {
  if (reducer) {
    return {
      ...state,
      ...reducer(type, payload),
    };
  }

  // if (type.indexOf('PHYLOCANVAS_') === 0) {
  //   return {
  //     ...state,
  //     ...payload,
  //   };
  // }

  return state;
}
