import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  registeringUser: false,
  registerUserError: null
};

const registerUserStart = (state, action) => {
  return updateObject(state, { registeringUser: true });
};

const registerUserSuccess = (state, action) => {
  return updateObject(state, { registeringUser: false });
};

const registerUserFail = (state, action) => {
  return updateObject(state, {
    registeringUser: false,
    registerUserError: action.error
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_USER_START:
      return registerUserStart(state, action);
    case actionTypes.REGISTER_USER_SUCCESS:
      return registerUserSuccess(state, action);
    case actionTypes.REGISTER_USER_FAIL:
      return registerUserFail(state, action);
    default:
      return state;
  }
};

export default reducer;
