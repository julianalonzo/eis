import * as actionTypes from './actionTypes';

import axios from 'axios';

export const registerUserStart = () => {
  return {
    type: actionTypes.REGISTER_USER_START
  };
};

export const registerUserSuccess = () => {
  return {
    type: actionTypes.REGISTER_USER_SUCCESS
  };
};

export const registerUserFail = error => {
  return {
    type: actionTypes.REGISTER_USER_FAIL,
    error: error
  };
};

export const registerUser = user => {
  return async dispatch => {
    dispatch(registerUserStart());

    try {
      const response = await axios.post('/api/users/register', user);
      dispatch(registerUserSuccess());

      return response.data;
    } catch (error) {
      dispatch(registerUserFail(error.response));
      return error.response.data;
    }
  };
};
