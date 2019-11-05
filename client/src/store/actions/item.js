import * as actionTypes from './actionTypes';

import axios from 'axios';

export const searchItemsStart = () => {
  return {
    type: actionTypes.SEARCH_ITEMS_START
  };
};

export const searchItemsSuccess = items => {
  return {
    type: actionTypes.SEARCH_ITEMS_SUCCESS,
    items: items
  };
};

export const searchItemsFail = error => {
  return {
    type: actionTypes.SEARCH_ITEMS_FAIL,
    error: error
  };
};

export const searchItems = searchQuery => {
  return async dispatch => {
    dispatch(searchItemsStart());

    try {
      const response = await axios.get(`/api/items?search=${searchQuery}`);
      dispatch(searchItemsSuccess(response.data.items));
    } catch (error) {
      dispatch(searchItemsFail(error.response));
    }
  };
};

export const resetSearchedItems = () => {
  return {
    type: actionTypes.RESET_SEARCH_ITEMS
  };
};

export const fetchItemStart = () => {
  return {
    type: actionTypes.FETCH_ITEM_START
  };
};

export const fetchItemSuccess = item => {
  return {
    type: actionTypes.FETCH_ITEM_SUCCESS,
    item: item
  };
};

export const fetchItemFail = error => {
  return {
    type: actionTypes.FETCH_ITEM_FAIL,
    error: error
  };
};

export const fetchItem = itemId => {
  return async dispatch => {
    dispatch(fetchItemStart());

    try {
      const fetchItemResponse = await axios.get(`/api/items/${itemId}`);

      dispatch(fetchItemSuccess(fetchItemResponse.data.item));
    } catch (err) {
      dispatch(fetchItemFail(err));
    }
  };
};

export const resetItem = () => {
  return {
    type: actionTypes.RESET_ITEM
  };
};

export const createItemStart = () => {
  return {
    type: actionTypes.CREATE_ITEM_START
  };
};

export const createItemSuccess = item => {
  return {
    type: actionTypes.CREATE_ITEM_SUCCESS,
    item: item
  };
};

export const createItemFail = error => {
  return {
    type: actionTypes.CREATE_ITEM_FAIL,
    error: error
  };
};

export const createItem = item => {
  return async dispatch => {
    dispatch(createItemStart());

    try {
      const response = await axios.post('api/items', item);
      dispatch(createItemSuccess(response.data.item));
    } catch (error) {
      dispatch(createItemFail(error.response));
    }
  };
};

export const updateItemStart = () => {
  return {
    type: actionTypes.UPDATE_ITEM_START
  };
};

export const updateItemSuccess = item => {
  return {
    type: actionTypes.UPDATE_ITEM_SUCCESS,
    item: item
  };
};

export const updateItemFail = error => {
  return {
    type: actionTypes.UPDATE_ITEM_FAIL,
    error: error
  };
};

export const updateItem = (itemId, formData) => {
  return async dispatch => {
    dispatch(updateItemStart());

    try {
      const response = await axios.put(`api/items/${itemId}`, formData);
      dispatch(updateItemSuccess(response.data.item));
    } catch (err) {
      dispatch(updateItemFail(err));
    }
  };
};
