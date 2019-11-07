import * as actionTypes from "./actionTypes";

import axios from "axios";

export const fetchFoldersStart = () => {
  return {
    type: actionTypes.FETCH_FOLDERS_START
  };
};

export const fetchFoldersSuccess = folders => {
  return {
    type: actionTypes.FETCH_FOLDERS_SUCCESS,
    folders: folders
  };
};

export const fetchFoldersFail = error => {
  return {
    type: actionTypes.FETCH_FOLDERS_FAIL,
    error: error
  };
};

export const fetchFolders = () => {
  return async dispatch => {
    dispatch(fetchFoldersStart());

    let response = null;
    try {
      response = await axios.get("/api/folders");
      dispatch(fetchFoldersSuccess(response.data.folders));
    } catch (error) {
      response = error;
      dispatch(fetchFoldersFail(error.response));
    }
  };
};

export const resetFolders = () => {
  return {
    type: actionTypes.RESET_FOLDERS
  };
};

export const fetchFolderStart = () => {
  return {
    type: actionTypes.FETCH_FOLDER_START
  };
};

export const fetchFolderSuccess = folder => {
  return {
    type: actionTypes.FETCH_FOLDER_SUCCESS,
    folder: folder
  };
};

export const fetchFolderFail = error => {
  return {
    type: actionTypes.FETCH_FOLDER_FAIL,
    error: error
  };
};

export const resetFolder = () => {
  return {
    type: actionTypes.RESET_FOLDER
  };
};

export const fetchFolder = folderId => {
  return async dispatch => {
    dispatch(fetchFolderStart());

    try {
      const response = await axios.get(`/api/folders/${folderId}/items`);
      dispatch(fetchFolderSuccess(response.data.folder));
    } catch (error) {
      dispatch(fetchFolderFail(error.response));
    }
  };
};

export const createFolderStart = () => {
  return {
    type: actionTypes.CREATE_FOLDER_START
  };
};

export const createFolderSuccess = folder => {
  return {
    type: actionTypes.CREATE_FOLDER_SUCCESS,
    folder: folder
  };
};

export const createFolderFail = error => {
  return {
    type: actionTypes.CREATE_FOLDER_FAIL,
    error: error
  };
};

export const createFolder = folder => {
  return async dispatch => {
    dispatch(createFolderStart());

    try {
      const response = await axios.post(`/api/folders`, folder);
      dispatch(createFolderSuccess(response.data.folder));
    } catch (error) {
      dispatch(createFolderSuccess(error.response));
    }
  };
};

export const deleteFolderStart = () => {
  return {
    type: actionTypes.DELETE_FOLDER_START
  };
};

export const deleteFolderFail = error => {
  return {
    type: actionTypes.DELETE_FOLDER_FAIL,
    error: error
  };
};

export const deleteFolderSuccess = ({ deletedFoldersIds, deletedItemsIds }) => {
  return {
    type: actionTypes.DELETE_FOLDER_SUCCESS,
    deletedFoldersIds: deletedFoldersIds,
    deletedItemsIds: deletedItemsIds
  };
};

export const deleteFolder = folderId => {
  return async dispatch => {
    dispatch(deleteFolderStart());

    try {
      const response = await axios.delete(`api/folders/${folderId}`);
      dispatch(deleteFolderSuccess(response.data));
    } catch (error) {
      dispatch(deleteFolderFail(error.response));
    }
  };
};

export const deleteItemStart = () => {
  return {
    type: actionTypes.DELETE_ITEM_START
  };
};

export const deleteItemFail = error => {
  return {
    type: actionTypes.DELETE_ITEM_FAIL,
    error: error
  };
};

export const deleteItemSuccess = itemId => {
  return {
    type: actionTypes.DELETE_ITEM_SUCCESS,
    itemId: itemId
  };
};

export const deleteItem = itemId => {
  return async dispatch => {
    dispatch(deleteItemStart());

    try {
      const response = await axios.delete(`api/items/${itemId}`);
      dispatch(deleteItemSuccess(response.data.itemId));
    } catch (error) {
      dispatch(deleteItemFail(error.response));
    }
  };
};

export const moveItemStart = () => {
  return {
    type: actionTypes.MOVE_ITEM_START
  };
};

export const moveItemFail = error => {
  return {
    type: actionTypes.MOVE_ITEM_FAIL,
    error: error
  };
};

export const moveItemSuccess = item => {
  return {
    type: actionTypes.MOVE_ITEM_SUCCESS,
    item: item
  };
};

export const moveItem = (itemId, folderDestination) => {
  return async dispatch => {
    dispatch(moveItemStart());

    try {
      const response = await axios.put(
        `api/items/${itemId}`,
        folderDestination
      );
      dispatch(moveItemSuccess(response.data.item));
    } catch (error) {
      dispatch(moveItemFail(error.response));
    }
  };
};
