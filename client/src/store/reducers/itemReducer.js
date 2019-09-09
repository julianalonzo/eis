import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  items: [],
  loading: false,
  creatingItems: false,
  creatingItemsError: null
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

const createItemsStart = (state, action) => {
  return updateObject(state, { creatingItems: true });
};

const createItemsFail = (state, action) => {
  return updateObject(state, { creatingItems: false });
};

const createItemsSuccess = (state, action) => {
  const newItems = action.items;

  return updateObject(state, {
    creatingItems: false,
    items: state.items.concat(newItems)
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ITEMS_START:
      return fetchItemsStart(state, action);
    case actionTypes.FETCH_ITEMS_SUCCESS:
      return fetchItemsSuccess(state, action);
    case actionTypes.FETCH_ITEMS_FAIL:
      return fetchItemsFail(state, action);
    case actionTypes.CREATE_ITEMS_START:
      return createItemsStart(state, action);
    case actionTypes.CREATE_ITEMS_SUCCESS:
      return createItemsSuccess(state, action);
    case actionTypes.CREATE_ITEMS_FAIL:
      return createItemsFail(state, action);
    default:
      return state;
  }
};

export default reducer;
