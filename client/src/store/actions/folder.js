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
