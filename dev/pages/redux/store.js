import { createStore, combineReducers } from 'redux';

import initialTree from '@cgps/phylocanvas/defaults';
import phylocanvasReducer from '@cgps/phylocanvas-plugin-redux/reducer';
import appendToArray from '@cgps/phylocanvas/utils/appendToArray';

const initialFilter = { items: [] };
function filter(state = initialFilter, { type, payload }) {
  switch (type) {
    case 'APPEND_TO_FILTER':
      return {
        ...state,
        items: state.items.concat(payload),
      };
    case 'REMOVE_FROM_FILTER':
      return {
        ...state,
        items: state.items.filter(item => item !== payload),
      };
    case 'PHYLOCANVAS_SELECT_SUBTREE':
      return {
        ...state,
        items: payload || initialFilter.items,
      };
    case 'PHYLOCANVAS_SELECT_LEAF':
      return {
        ...state,
        items: appendToArray(state.items, payload.id, payload.append),
      };
    default:
      return state;
  }
}

function tree(state = {}, action) {
  switch (action.type) {
    case 'PHYLOCANVAS_SELECT_LEAF':
    case 'PHYLOCANVAS_SELECT_SUBTREE':
      return state;
    default:
      return {
        ...state,
        [action.stateKey]: phylocanvasReducer(state[action.stateKey], action),
      };
  }
}

const reducer = combineReducers({
  filter,
  tree,
});

export default createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
