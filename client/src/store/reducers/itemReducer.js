import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  items: [],
  loading: false
};

const fetchItemsStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchItemsSuccess = (state, action) => {
  return updateObject(state, { items: action.items, loading: false });
};

const fetchItemsFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ITEMS_START:
      return fetchItemsStart(state, action);
    case actionTypes.FETCH_ITEMS_SUCCESS:
      return fetchItemsSuccess(state, action);
    case actionTypes.FETCH_ITEMS_FAIL:
      return fetchItemsFail(state, action);
    default:
      return state;
  }
};

export default reducer;
