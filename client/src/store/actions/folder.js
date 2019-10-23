import * as actionTypes from './actionTypes';

import axios from 'axios';

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
  return dispatch => {
    dispatch(fetchFoldersStart());
    axios
      .get('/api/folders')
      .then(res => {
        dispatch(fetchFoldersSuccess(res.data.folders));
      })
      .catch(error => {
        dispatch(fetchFoldersFail(error));
      });
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

export const fetchFolder = folderId => {
  return async dispatch => {
    dispatch(fetchFolderStart());

    try {
      const response = await axios.get(`/api/folders/${folderId}`);

      dispatch(fetchFolderSuccess(response.data.folder));
    } catch (err) {
      dispatch(fetchFolderFail(err));
    }
  };
};

export const setFolder = folder => {
  return {
    type: actionTypes.SET_FOLDER,
    folder: folder
  };
};

export const resetFolder = () => {
  return {
    type: actionTypes.RESET_FOLDER
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
    type: actionTypes.CREATE_FOLDER_FAIL
  };
};

export const createFolder = (name, parentId) => {
  return async dispatch => {
    dispatch(createFolderStart());

    try {
      const response = await axios.post(`api/folders/${parentId}`, {
        name: name
      });
      dispatch(createFolderSuccess(response.data.folder));
    } catch (err) {
      dispatch(createFolderFail(err));
    }
  };
};

export const removeFolderStart = () => {
  return {
    type: actionTypes.REMOVE_FOLDER_START
  };
};

export const removeFolderFail = error => {
  return {
    type: actionTypes.REMOVE_FOLDER_FAIL
  };
};

export const removeFolderSuccess = ({ removedFoldersIds, removedItemsIds }) => {
  return {
    type: actionTypes.REMOVE_FOLDER_SUCCESS,
    removedFoldersIds: removedFoldersIds,
    removedItemsIds: removedItemsIds
  };
};

export const removeFolder = folderId => {
  return async dispatch => {
    dispatch(removeFolderStart());

    try {
      const response = await axios.delete(`api/folders/${folderId}`);
      dispatch(removeFolderSuccess(response.data));
    } catch (err) {
      dispatch(removeFolderFail(err));
    }
  };
};
