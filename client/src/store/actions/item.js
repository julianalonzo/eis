import * as actionTypes from './actionTypes';

import axios from 'axios';

export const fetchItemsStart = () => {
  return {
    type: actionTypes.FETCH_ITEMS_START
  };
};

export const fetchItemsSuccess = items => {
  return {
    type: actionTypes.FETCH_ITEMS_SUCCESS,
    items: items
  };
};

export const fetchItemsFail = error => {
  return {
    type: actionTypes.FETCH_ITEMS_FAIL,
    error: error
  };
};

export const fetchItems = folderId => {
  return dispatch => {
    dispatch(fetchItemsStart());
    axios
      .get(`/api/items?folderId=${folderId}`)
      .then(res => {
        dispatch(fetchItemsSuccess(res.data.items));
      })
      .catch(error => {
        dispatch(fetchItemsFail(error));
      });
  };
};

export const fetchItemStart = () => {
  return {
    type: actionTypes.FETCH_ITEM_START
  };
};

export const resetItems = () => {
  return {
    type: actionTypes.RESET_ITEMS
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
  return dispatch => {
    dispatch(fetchItemStart());
    axios
      .get(`/api/items/${itemId}`)
      .then(res => {
        dispatch(fetchItemSuccess(res.data.item));
      })
      .catch(error => {
        dispatch(fetchItemFail(error));
      });
  };
};

export const resetItem = () => {
  return {
    type: actionTypes.RESET_ITEM
  };
};

export const createItemsStart = () => {
  return {
    type: actionTypes.CREATE_ITEMS_START
  };
};

export const createItemsSuccess = item => {
  return {
    type: actionTypes.CREATE_ITEMS_SUCCESS,
    item: item
  };
};

export const createItemsFail = error => {
  return {
    type: actionTypes.CREATE_ITEMS_FAIL
  };
};

export const createItems = item => {
  return async dispatch => {
    dispatch(createItemsStart());

    try {
      const response = await axios.post('api/items/new', item);
      dispatch(createItemsSuccess(response.data.item));
    } catch (err) {
      dispatch(createItemsFail(err));
    }
  };
};

export const updateItemStart = () => {
  return {
    type: actionTypes.UPDATE_ITEM_START
  };
};

export const updateItemSuccess = updatedItem => {
  return {
    type: actionTypes.UPDATE_ITEM_SUCCESS,
    item: updatedItem
  };
};

export const updateItemFail = error => {
  return {
    type: actionTypes.UPDATE_ITEM_FAIL,
    error: error
  };
};

export const updateItem = updatedItemData => {
  return async dispatch => {
    dispatch(updateItemStart());

    try {
      const response = await axios.put('api/items/', updatedItemData);
      dispatch(updateItemSuccess(response.data.item));
    } catch (err) {
      dispatch(updateItemFail(err));
    }
  };
};

export const removeItemStart = () => {
  return {
    type: actionTypes.REMOVE_ITEM_START
  };
};

export const removeItemFail = error => {
  return {
    type: actionTypes.REMOVE_ITEM_FAIL
  };
};

export const removeItemSuccess = removedItemId => {
  return {
    type: actionTypes.REMOVE_ITEM_SUCCESS,
    removedItemId: removedItemId
  };
};

export const removeItem = itemId => {
  return async dispatch => {
    dispatch(removeItemStart());

    try {
      const response = await axios.post('api/items/remove', { itemId: itemId });
      dispatch(removeItemSuccess(response.data.removedItemId));
    } catch (err) {
      dispatch(removeItemFail(err));
    }
  };
};
