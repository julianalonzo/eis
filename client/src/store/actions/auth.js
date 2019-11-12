import * as actionTypes from "./actionTypes";

import axios from "axios";
import jwt_decode from "jwt-decode";

import setAuthToken from "../../util/setAuthToken";

export const authenticateUserStart = () => {
  return {
    type: actionTypes.AUTHENTICATE_USER_START
  };
};

export const authenticateUserSuccess = user => {
  return {
    type: actionTypes.AUTHENTICATE_USER_SUCCESS,
    user: user
  };
};

export const authenticateUserFail = error => {
  return {
    type: actionTypes.AUTHENTICATE_USER_FAIL,
    error: error
  };
};

export const authenticateUser = user => {
  return async dispatch => {
    dispatch(authenticateUserStart());

    try {
      const response = await axios.post("/api/users/login", user);

      const { token } = response.data;
      localStorage.setItem("eisToken", token);
      setAuthToken(token);

      const decodedToken = jwt_decode(token);
      dispatch(authenticateUserSuccess(decodedToken));

      return decodedToken;
    } catch (error) {
      dispatch(authenticateUserFail(error.response));
      return error.response.data;
    }
  };
};

export const setUser = user => {
  return {
    type: actionTypes.SET_USER,
    user: user
  };
};

export const signoutUser = () => {
  return dispatch => {
    localStorage.removeItem("eisToken");
    setAuthToken(false);

    dispatch(setUser(null));
  };
};
