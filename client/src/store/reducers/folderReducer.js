import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import { createFolderFail } from '../actions/folder';

const initialState = {
  folders: [],
  fetchingFolders: false,
  creatingFolder: false
};

const fetchFoldersStart = (state, action) => {
  return updateObject(state, { fetchingFolders: true });
};

const fetchFoldersSuccess = (state, action) => {
  return updateObject(state, {
    folders: action.folders,
    fetchingFolders: false
  });
};

const fetchFoldersFail = (state, action) => {
  return updateObject(state, { fetchingFolders: false });
};

const createFolderStart = (state, action) => {
  return updateObject(state, { creatingFolder: true });
};

const createFolderSuccess = (state, action) => {
  return updateObject(state, {
    creatingFolder: false,
    folders: state.folders.concat(action.folder)
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_FOLDERS_START:
      return fetchFoldersStart(state, action);
    case actionTypes.FETCH_FOLDERS_SUCCESS:
      return fetchFoldersSuccess(state, action);
    case actionTypes.FETCH_FOLDERS_FAIL:
      return fetchFoldersFail(state, action);
    case actionTypes.CREATE_FOLDER_START:
      return createFolderStart(state, action);
    case actionTypes.CREATE_FOLDER_SUCCESS:
      return createFolderSuccess(state, action);
    case actionTypes.CREATE_FOLDER_FAIL:
      return createFolderFail(state, action);
    default:
      return state;
  }
};

export default reducer;
