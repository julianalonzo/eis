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

export const fetchItems = () => {
  return dispatch => {
    dispatch(fetchItemsStart());
    axios
      .get('/api/items')
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

export const createItemsSuccess = items => {
  return {
    type: actionTypes.CREATE_ITEMS_SUCCESS,
    items: items
  };
};

export const createItemsFail = error => {
  return {
    type: actionTypes.CREATE_ITEMS_FAIL
  };
};

export const createItems = item => {
  return dispatch => {
    dispatch(createItemsStart());
    axios
      .post('/api/items/new', item)
      .then(response => {
        dispatch(createItemsSuccess(response.data.item));
      })
      .catch(error => {
        dispatch(createItemsFail(error));
      });
  };
};
