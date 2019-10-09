import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  items: [],
  item: null,
  fetchingItems: false,
  fetchingItem: false,
  creatingItem: false,
  updatingItem: false,
  updatingItemError: null,
  creatingItemsError: null,
  removingItem: false,
  removingItemError: null
};

const fetchItemsStart = (state, action) => {
  return updateObject(state, { fetchingItems: true });
};

const fetchItemsSuccess = (state, action) => {
  return updateObject(state, { items: action.items, fetchingItems: false });
};

const fetchItemsFail = (state, action) => {
  return updateObject(state, { fetchingItems: false });
};

const resetItems = (state, action) => {
  return updateObject(state, { items: [] });
};

const fetchItemStart = (state, action) => {
  return updateObject(state, { fetchingItem: true, item: null });
};

const fetchItemSuccess = (state, action) => {
  return updateObject(state, { item: action.item, fetchingItem: false });
};

const fetchItemFail = (state, action) => {
  return updateObject(state, { fetchingItem: false, item: null });
};

const resetItem = (state, action) => {
  return updateObject(state, { item: null });
};

const createItemsStart = (state, action) => {
  return updateObject(state, { creatingItem: true });
};

const createItemsFail = (state, action) => {
  return updateObject(state, { creatingItem: false });
};

const createItemsSuccess = (state, action) => {
  return updateObject(state, {
    creatingItem: false
  });
};

const updateItemStart = (state, action) => {
  return updateObject(state, {
    updatingItem: true
  });
};
const updateItemSuccess = (state, action) => {
  return updateObject(state, {
    updatingItem: false,
    item: action.item
  });
};
const updateItemFail = (state, action) => {
  return updateObject(state, {
    updatingItem: false,
    updatingItemError: action.error
  });
};

const removeItemStart = (state, action) => {
  return updateObject(state, { removingItem: true });
};

const removeItemFail = (state, action) => {
  return updateObject(state, {
    removingItem: false,
    removingItemError: action.error
  });
};

const removeItemSuccess = (state, action) => {
  return updateObject(state, {
    removingItem: false,
    items: state.items.filter(item => item._id !== action.removedItemId)
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
    case actionTypes.RESET_ITEMS:
      return resetItems(state, action);
    case actionTypes.FETCH_ITEM_START:
      return fetchItemStart(state, action);
    case actionTypes.FETCH_ITEM_SUCCESS:
      return fetchItemSuccess(state, action);
    case actionTypes.FETCH_ITEM_FAIL:
      return fetchItemFail(state, action);
    case actionTypes.RESET_ITEM:
      return resetItem(state, action);
    case actionTypes.CREATE_ITEMS_START:
      return createItemsStart(state, action);
    case actionTypes.CREATE_ITEMS_SUCCESS:
      return createItemsSuccess(state, action);
    case actionTypes.CREATE_ITEMS_FAIL:
      return createItemsFail(state, action);
    case actionTypes.UPDATE_ITEM_START:
      return updateItemStart(state, action);
    case actionTypes.UPDATE_ITEM_SUCCESS:
      return updateItemSuccess(state, action);
    case actionTypes.UPDATE_ITEM_FAIL:
      return updateItemFail(state, action);
    case actionTypes.REMOVE_ITEM_START:
      return removeItemStart(state, action);
    case actionTypes.REMOVE_ITEM_FAIL:
      return removeItemFail(state, action);
    case actionTypes.REMOVE_ITEM_SUCCESS:
      return removeItemSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
