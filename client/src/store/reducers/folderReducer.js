import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  folders: null,
  fetchingFolders: false,
  folder: null,
  fetchingFolder: false,
  fetchFolderError: null,
  creatingFolder: false,
  createFolderError: null,
  deletingFolder: false,
  deleteFolderError: null,
  movingFolder: false,
  moveFolderError: null,
  deletingItem: false,
  deleteItemError: null,
  movingItem: false,
  moveItemError: null
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

const resetFolders = (state, action) => {
  return updateObject(state, { folders: null });
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
  return updateObject(state, {
    fetchingFolder: false,
    fetchFolderError: action.error
  });
};

const resetFolder = (state, action) => {
  return updateObject(state, {
    folder: null
  });
};

const createFolderStart = (state, action) => {
  return updateObject(state, { creatingFolder: true });
};

const createFolderSuccess = (state, action) => {
  const folders = state.folders || [];

  return updateObject(state, {
    creatingFolder: false,
    folders: folders.concat(action.folder),
    folder:
      state.folder !== null
        ? {
            ...state.folder,
            children: state.folder.children.concat(action.folder)
          }
        : null
  });
};

const createFolderFail = (state, action) => {
  return updateObject(state, {
    creatingFolder: false,
    createFolderError: action.error
  });
};

const deleteFolderStart = (state, action) => {
  return updateObject(state, { deletingFolder: true });
};

const deleteFolderFail = (state, action) => {
  return updateObject(state, {
    deletingFolder: false,
    deleteFolderError: action.error
  });
};

const deleteFolderSuccess = (state, action) => {
  const updatedFolders = [...state.folders].filter(
    folder => !action.deletedFoldersIds.includes(folder._id)
  );

  return updateObject(state, {
    removingFolder: false,
    folders: updatedFolders,
    folder: Boolean(state.folder)
      ? {
          ...state.folder,
          children: updatedFolders.filter(f => f.parent === state.folder._id)
        }
      : null
  });
};

const moveFolderStart = (state, action) => {
  return updateObject(state, { movingFolder: true });
};

const moveFolderFail = (state, action) => {
  return updateObject(state, {
    movingFolder: false,
    moveFolderError: action.error
  });
};

const moveFolderSuccess = (state, action) => {
  const movedFolderIndex = state.folders.findIndex(
    folder => folder._id === action.folder._id
  );

  const updatedFolders = [...state.folders];
  updatedFolders[movedFolderIndex] = action.folder;

  return updateObject(state, {
    movingFolder: false,
    folders: updatedFolders,
    folder:
      state.folder !== null
        ? {
            ...state.folder,
            children: state.folder.children.filter(
              folder => folder._id !== action.folder._id
            )
          }
        : null
  });
};

const deleteItemStart = (state, action) => {
  return updateObject(state, { deletingItem: true });
};

const deleteItemFail = (state, action) => {
  return updateObject(state, {
    deletingItem: false,
    deleteItemError: action.error
  });
};

const deleteItemSuccess = (state, action) => {
  return updateObject(state, {
    deletingItem: false,
    folder: {
      ...state.folder,
      items: state.folder.items.filter(item => item._id !== action.itemId)
    }
  });
};

const moveItemStart = (state, action) => {
  return updateObject(state, { movingItem: true });
};

const moveItemFail = (state, action) => {
  return updateObject(state, {
    movingItem: false,
    moveItemError: action.error
  });
};

const moveItemSuccess = (state, action) => {
  return updateObject(state, {
    movingItem: false,
    folder: {
      ...state.folder,
      items: state.folder.items.filter(item => item._id !== action.item._id)
    }
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
    case actionTypes.RESET_FOLDERS:
      return resetFolders(state, action);
    case actionTypes.FETCH_FOLDER_START:
      return fetchFolderStart(state, action);
    case actionTypes.FETCH_FOLDER_SUCCESS:
      return fetchFolderSuccess(state, action);
    case actionTypes.FETCH_FOLDER_FAIL:
      return fetchFolderFail(state, action);
    case actionTypes.RESET_FOLDER:
      return resetFolder(state, action);
    case actionTypes.CREATE_FOLDER_START:
      return createFolderStart(state, action);
    case actionTypes.CREATE_FOLDER_SUCCESS:
      return createFolderSuccess(state, action);
    case actionTypes.CREATE_FOLDER_FAIL:
      return createFolderFail(state, action);
    case actionTypes.DELETE_FOLDER_START:
      return deleteFolderStart(state, action);
    case actionTypes.DELETE_FOLDER_FAIL:
      return deleteFolderFail(state, action);
    case actionTypes.DELETE_FOLDER_SUCCESS:
      return deleteFolderSuccess(state, action);
    case actionTypes.MOVE_FOLDER_START:
      return moveFolderStart(state, action);
    case actionTypes.MOVE_FOLDER_FAIL:
      return moveFolderFail(state, action);
    case actionTypes.MOVE_FOLDER_SUCCESS:
      return moveFolderSuccess(state, action);
    case actionTypes.DELETE_ITEM_START:
      return deleteItemStart(state, action);
    case actionTypes.DELETE_ITEM_FAIL:
      return deleteItemFail(state, action);
    case actionTypes.DELETE_ITEM_SUCCESS:
      return deleteItemSuccess(state, action);
    case actionTypes.MOVE_ITEM_START:
      return moveItemStart(state, action);
    case actionTypes.MOVE_ITEM_FAIL:
      return moveItemFail(state, action);
    case actionTypes.MOVE_ITEM_SUCCESS:
      return moveItemSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
