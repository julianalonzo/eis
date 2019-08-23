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
      .then(items => {
        console.log('Items', items);

        dispatch(fetchItemsSuccess(items));
      })
      .catch(error => {
        dispatch(fetchItemsFail(error));
      });
  };
};
