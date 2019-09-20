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
      .get(`/api/items/${folderId}`)
      .then(res => {
        dispatch(fetchItemsSuccess(res.data.items));
      })
      .catch(error => {
        dispatch(fetchItemsFail(error));
      });
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
