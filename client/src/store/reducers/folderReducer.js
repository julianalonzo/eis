import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  folders: [],
  fetchingFolders: false
};

const fetchFoldersStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchFoldersSuccess = (state, action) => {
  return updateObject(state, { items: action.items, loading: false });
};

const fetchFoldersFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_FOLDERS_START:
      return fetchFoldersStart(state, action);
    case actionTypes.FETCH_FOLDERS_SUCCESS:
      return fetchFoldersSuccess(state, action);
    case actionTypes.FETCH_FOLDERS_FAIL:
      return fetchFoldersFail(state, action);
    default:
      return state;
  }
};

export default reducer;
