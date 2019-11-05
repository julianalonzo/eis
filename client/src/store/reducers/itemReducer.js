import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  item: null,
  searchedItems: [],
  searchingItems: false,
  fetchingItem: false,
  creatingItem: false,
  createItemError: null,
  updatingItem: false,
  updatingItemError: null
};

const searchItemsStart = (state, action) => {
  return updateObject(state, { searchingItems: true });
};

const searchItemsSuccess = (state, action) => {
  return updateObject(state, {
    searchedItems: action.items,
    searchingItems: false
  });
};

const searchItemsFail = (state, action) => {
  return updateObject(state, { searchingItems: false });
};

const resetSearchItems = (state, action) => {
  return updateObject(state, { searchedItems: [] });
};

const fetchItemStart = (state, action) => {
  return updateObject(state, { fetchingItem: true, item: null });
};

const fetchItemSuccess = (state, action) => {
  return updateObject(state, { item: action.item, fetchingItem: false });
};

const fetchItemFail = (state, action) => {
  return updateObject(state, {
    fetchingItem: false,
    item: null
  });
};

const resetItem = (state, action) => {
  return updateObject(state, {
    item: null
  });
};

const createItemStart = (state, action) => {
  return updateObject(state, { creatingItem: true });
};

const createItemFail = (state, action) => {
  return updateObject(state, { creatingItem: false });
};

const createItemSuccess = (state, action) => {
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_ITEMS_START:
      return searchItemsStart(state, action);
    case actionTypes.SEARCH_ITEMS_SUCCESS:
      return searchItemsSuccess(state, action);
    case actionTypes.SEARCH_ITEMS_FAIL:
      return searchItemsFail(state, action);
    case actionTypes.RESET_SEARCH_ITEMS:
      return resetSearchItems(state, action);
    case actionTypes.FETCH_ITEM_START:
      return fetchItemStart(state, action);
    case actionTypes.FETCH_ITEM_SUCCESS:
      return fetchItemSuccess(state, action);
    case actionTypes.FETCH_ITEM_FAIL:
      return fetchItemFail(state, action);
    case actionTypes.RESET_ITEM:
      return resetItem(state, action);
    case actionTypes.CREATE_ITEM_START:
      return createItemStart(state, action);
    case actionTypes.CREATE_ITEM_SUCCESS:
      return createItemSuccess(state, action);
    case actionTypes.CREATE_ITEM_FAIL:
      return createItemFail(state, action);
    case actionTypes.UPDATE_ITEM_START:
      return updateItemStart(state, action);
    case actionTypes.UPDATE_ITEM_SUCCESS:
      return updateItemSuccess(state, action);
    case actionTypes.UPDATE_ITEM_FAIL:
      return updateItemFail(state, action);
    default:
      return state;
  }
};

export default reducer;
