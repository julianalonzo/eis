import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import { createFolderFail } from '../actions/folder';

const initialState = {
  folders: [],
  fetchingFolders: false,
  folder: {
    _id: '',
    name: '',
    parent: '',
    children: [],
    hierarchy: []
  },
  fetchingFolder: false,
  creatingFolder: false,
  removingFolder: false,
  removingFolderError: null
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

const fetchFolderStart = (state, action) => {
  return updateObject(state, { fetchingFolder: true });
};

const fetchFolderSuccess = (state, action) => {
  return updateObject(state, {
    folder: action.folder,
    fetchingFolder: false
  });
};

const fetchFolderFail = (state, action) => {
  return updateObject(state, { fetchingFolder: false });
};

const setFolder = (state, action) => {
  return updateObject(state, {
    folder: action.folder
  });
};

const resetFolder = (state, action) => {
  return updateObject(state, {
    folder: {
      _id: '',
      name: '',
      parent: '',
      children: [],
      hierarchy: []
    }
  });
};

const createFolderStart = (state, action) => {
  return updateObject(state, { creatingFolder: true });
};

const createFolderSuccess = (state, action) => {
  return updateObject(state, {
    creatingFolder: false,
    folders: state.folders.concat(action.folder),
    folder: {
      ...state.folder,
      children: state.folder.children.concat(action.folder)
    }
  });
};

const removeFolderStart = (state, action) => {
  return updateObject(state, { removingFolder: true });
};

const removeFolderFail = (state, action) => {
  return updateObject(state, {
    removingFolder: false,
    removingFolderError: action.error
  });
};

const removeFolderSuccess = (state, action) => {
  let updatedFolders = state.folders;

  for (const removedFolderId of action.removedFoldersIds) {
    updatedFolders = updatedFolders.filter(
      folder => folder._id !== removedFolderId
    );
  }

  return updateObject(state, {
    removingFolder: false,
    folders: updatedFolders
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
    case actionTypes.FETCH_FOLDER_START:
      return fetchFolderStart(state, action);
    case actionTypes.FETCH_FOLDER_SUCCESS:
      return fetchFolderSuccess(state, action);
    case actionTypes.FETCH_FOLDER_FAIL:
      return fetchFolderFail(state, action);
    case actionTypes.SET_FOLDER:
      return setFolder(state, action);
    case actionTypes.RESET_FOLDER:
      return resetFolder(state, action);
    case actionTypes.CREATE_FOLDER_START:
      return createFolderStart(state, action);
    case actionTypes.CREATE_FOLDER_SUCCESS:
      return createFolderSuccess(state, action);
    case actionTypes.CREATE_FOLDER_FAIL:
      return createFolderFail(state, action);
    case actionTypes.REMOVE_FOLDER_START:
      return removeFolderStart(state, action);
    case actionTypes.REMOVE_FOLDER_FAIL:
      return removeFolderFail(state, action);
    case actionTypes.REMOVE_FOLDER_SUCCESS:
      return removeFolderSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
