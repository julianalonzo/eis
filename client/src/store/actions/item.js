import * as actionTypes from './actionTypes';

import axios from 'axios';

export const fetchItemsStart = () => {
  return {
    type: actionTypes.FETCH_ITEMS_START
  };
};

export const fetchItemsSuccess = items => {
  return {
    type: actionTypes.FETCH_ITEMS_SUCCESS,
    items: items
  };
};

export const fetchItemsFail = error => {
  return {
    type: actionTypes.FETCH_ITEMS_FAIL,
    error: error
  };
};

export const fetchItems = folderId => {
  return dispatch => {
    dispatch(fetchItemsStart());
    axios
      .get(`/api/items?folderId=${folderId}`)
      .then(res => {
        dispatch(fetchItemsSuccess(res.data.items));
      })
      .catch(error => {
        dispatch(fetchItemsFail(error));
      });
  };
};

export const fetchItemStart = () => {
  return {
    type: actionTypes.FETCH_ITEM_START
  };
};

export const resetItems = () => {
  return {
    type: actionTypes.RESET_ITEMS
  };
};

export const fetchItemSuccess = item => {
  return {
    type: actionTypes.FETCH_ITEM_SUCCESS,
    item: item
  };
};

export const fetchItemFail = error => {
  return {
    type: actionTypes.FETCH_ITEM_FAIL,
    error: error
  };
};

export const fetchItem = itemId => {
  return dispatch => {
    dispatch(fetchItemStart());
    axios
      .get(`/api/items/${itemId}`)
      .then(res => {
        dispatch(fetchItemSuccess(res.data.item));
      })
      .catch(error => {
        dispatch(fetchItemFail(error));
      });
  };
};

export const resetItem = () => {
  return {
    type: actionTypes.RESET_ITEM
  };
};

export const createItemsStart = () => {
  return {
    type: actionTypes.CREATE_ITEMS_START
  };
};

export const createItemsSuccess = item => {
  return {
    type: actionTypes.CREATE_ITEMS_SUCCESS,
    item: item
  };
};

export const createItemsFail = error => {
  return {
    type: actionTypes.CREATE_ITEMS_FAIL
  };
};

export const createItems = item => {
  return async dispatch => {
    dispatch(createItemsStart());

    try {
      const response = await axios.post('api/items/new', item);
      dispatch(createItemsSuccess(response.data.item));
    } catch (err) {
      dispatch(createItemsFail(err));
    }
  };
};

export const updateItemDetailsStart = () => {
  return {
    type: actionTypes.UPDATE_ITEM_DETAILS_START
  };
};

export const updateItemDetailsSuccess = updatedItemDetails => {
  return {
    type: actionTypes.UPDATE_ITEM_DETAILS_SUCCESS,
    updatedItemDetails: updatedItemDetails
  };
};

export const updateItemDetailsFail = error => {
  return {
    type: actionTypes.UPDATE_ITEM_DETAILS_FAIL,
    error: error
  };
};

export const updateItemDetails = updatedItemData => {
  return async dispatch => {
    dispatch(updateItemDetailsStart());

    try {
      const response = await axios.put('api/items/details', updatedItemData);
      dispatch(updateItemDetailsSuccess(response.data.updatedItemDetails));
    } catch (err) {
      dispatch(updateItemDetailsFail(err));
    }
  };
};

export const addPropertyStart = () => {
  return {
    type: actionTypes.ADD_PROPERTY_START
  };
};

export const addPropertySuccess = property => {
  return {
    type: actionTypes.ADD_PROPERTY_SUCCESS,
    property: property
  };
};

export const addPropertyFail = error => {
  return {
    type: actionTypes.ADD_PROPERTY_FAIL,
    error: error
  };
};

export const addProperty = (itemId, property) => {
  return async dispatch => {
    dispatch(addPropertyStart());

    try {
      const response = await axios.post('api/items/property', {
        itemId: itemId,
        property: property
      });
      dispatch(addPropertySuccess(response.data.property));
    } catch (err) {
      dispatch(addPropertyFail(err));
    }
  };
};

export const updatePropertyStart = () => {
  return {
    type: actionTypes.UPDATE_PROPERTY_START
  };
};

export const updatePropertySuccess = property => {
  return {
    type: actionTypes.UPDATE_PROPERTY_SUCCESS,
    property: property
  };
};

export const updatePropertyFail = error => {
  return {
    type: actionTypes.UPDATE_PROPERTY_FAIL,
    error: error
  };
};

export const updateProperty = (itemId, property) => {
  return async dispatch => {
    dispatch(updatePropertyStart());

    try {
      const response = await axios.put('api/items/property', {
        itemId: itemId,
        property: property
      });

      dispatch(updatePropertySuccess(response.data.property));
    } catch (err) {
      dispatch(updatePropertyFail(err));
    }
  };
};

export const removePropertyStart = () => {
  return {
    type: actionTypes.REMOVE_PROPERTY_START
  };
};

export const removePropertySuccess = propertyId => {
  return {
    type: actionTypes.REMOVE_PROPERTY_SUCCESS,
    propertyId: propertyId
  };
};

export const removePropertyFail = error => {
  return {
    type: actionTypes.REMOVE_PROPERTY_FAIL,
    error: error
  };
};

export const removeProperty = (itemId, propertyId) => {
  return async dispatch => {
    dispatch(removePropertyStart());

    try {
      const response = await axios.delete('api/items/property', {
        data: {
          itemId: itemId,
          propertyId: propertyId
        }
      });

      dispatch(removePropertySuccess(response.data.propertyId));
    } catch (err) {
      dispatch(removePropertyFail(err));
    }
  };
};

export const removeAttachmentStart = () => {
  return {
    type: actionTypes.REMOVE_ATTACHMENT_START
  };
};

export const removeAttachmentSuccess = attachmentId => {
  return {
    type: actionTypes.REMOVE_ATTACHMENT_SUCCESS,
    attachmentId: attachmentId
  };
};

export const removeAttachmentFail = error => {
  return {
    type: actionTypes.REMOVE_ATTACHMENT_FAIL,
    error: error
  };
};

export const removeAttachment = (itemId, attachmentId) => {
  return async dispatch => {
    dispatch(removeAttachmentStart());

    try {
      const response = await axios.delete('api/items/attachment', {
        data: {
          itemId: itemId,
          attachmentId: attachmentId
        }
      });

      dispatch(removeAttachmentSuccess(response.data.attachmentId));
    } catch (err) {
      dispatch(removeAttachmentFail(err));
    }
  };
};

export const removeItemStart = () => {
  return {
    type: actionTypes.REMOVE_ITEM_START
  };
};

export const removeItemFail = error => {
  return {
    type: actionTypes.REMOVE_ITEM_FAIL
  };
};

export const removeItemSuccess = removedItemId => {
  return {
    type: actionTypes.REMOVE_ITEM_SUCCESS,
    removedItemId: removedItemId
  };
};

export const removeItem = itemId => {
  return async dispatch => {
    dispatch(removeItemStart());

    try {
      const response = await axios.post('api/items/remove', { itemId: itemId });
      dispatch(removeItemSuccess(response.data.removedItemId));
    } catch (err) {
      dispatch(removeItemFail(err));
    }
  };
};
