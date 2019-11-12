import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  isAuthenticated: false,
  user: null,
  authenticatingUser: false,
  authenticateUserError: null
};

const authenticateUserStart = (state, action) => {
  return updateObject(state, { authenticatingUser: true });
};

const authenticateUserSuccess = (state, action) => {
  return updateObject(state, {
    authenticatingUser: false,
    isAuthenticated: Boolean(action.user),
    user: action.user
  });
};

const authenticateUserFail = (state, action) => {
  return updateObject(state, {
    authenticatingUser: false,
    isAuthenticated: false,
    user: null
  });
};

const setUser = (state, action) => {
  return updateObject(state, {
    isAuthenticated: Boolean(action.user),
    user: action.user
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHENTICATE_USER_START:
      return authenticateUserStart(state, action);
    case actionTypes.AUTHENTICATE_USER_SUCCESS:
      return authenticateUserSuccess(state, action);
    case actionTypes.AUTHENTICATE_USER_FAIL:
      return authenticateUserFail(state, action);
    case actionTypes.SET_USER:
      return setUser(state, action);
    default:
      return state;
  }
};

export default reducer;
