import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  items: [],
  item: {
    name: '',
    category: '',
    condition: '',
    thumbnails: [],
    properties: [],
    attachments: [],
    notes: []
  },
  fetchingItems: false,
  fetchingItem: false,
  creatingItem: false,
  updatingItemDetails: false,
  addingProperty: false,
  updatingProperty: false,
  removingProperty: false,
  addingAttachments: false,
  removingAttachment: false,
  addingNote: false,
  addingNoteError: null,
  removingNote: false,
  removingNoteError: null,
  updatingItemDetailsError: null,
  addingPropertyError: null,
  updatingPropertyError: null,
  removingPropertyError: null,
  addingAttachmentsError: null,
  removingAttachmentError: null,
  creatingItemsError: null,
  removingItem: false,
  removingItemError: null
};

const fetchItemsStart = (state, action) => {
  return updateObject(state, { fetchingItems: true });
};

const fetchItemsSuccess = (state, action) => {
  return updateObject(state, { items: action.items, fetchingItems: false });
};

const fetchItemsFail = (state, action) => {
  return updateObject(state, { fetchingItems: false });
};

const resetItems = (state, action) => {
  return updateObject(state, { items: [] });
};

const fetchItemStart = (state, action) => {
  return updateObject(state, { fetchingItem: true, item: null });
};

const fetchItemSuccess = (state, action) => {
  return updateObject(state, { item: action.item, fetchingItem: false });
};

const fetchItemFail = (state, action) => {
  return updateObject(state, {
    fetchingItem: false,
    item: {
      name: '',
      category: '',
      condition: '',
      thumbnails: [],
      properties: [],
      attachments: [],
      notes: []
    }
  });
};

const resetItem = (state, action) => {
  return updateObject(state, {
    item: {
      name: '',
      category: '',
      condition: '',
      thumbnails: [],
      properties: [],
      attachments: [],
      notes: []
    }
  });
};

const createItemsStart = (state, action) => {
  return updateObject(state, { creatingItem: true });
};

const createItemsFail = (state, action) => {
  return updateObject(state, { creatingItem: false });
};

const createItemsSuccess = (state, action) => {
  return updateObject(state, {
    creatingItem: false
  });
};

const updateItemDetailsStart = (state, action) => {
  return updateObject(state, {
    updatingItemDetails: true
  });
};

const updateItemDetailsSuccess = (state, action) => {
  return updateObject(state, {
    updatingItemDetails: false,
    item: {
      ...state.item,
      ...action.updatedItemDetails
    }
  });
};

const updateItemDetailsFail = (state, action) => {
  return updateObject(state, {
    updatingItemDetails: false,
    updatingItemDetailsError: action.error
  });
};

const addPropertyStart = (state, action) => {
  return updateObject(state, {
    addingProperty: true
  });
};

const addPropertySuccess = (state, action) => {
  return updateObject(state, {
    addingProperty: false,
    item: {
      ...state.item,
      properties: state.item.properties.concat(action.property)
    }
  });
};

const addPropertyFail = (state, action) => {
  return updateObject(state, {
    addingProperty: false,
    addingPropertyError: action.error
  });
};

const updatePropertyStart = (state, action) => {
  return updateObject(state, {
    updatingProperty: true
  });
};

const updatePropertySuccess = (state, action) => {
  const indexOfUpdatedProperty = state.item.properties.findIndex(
    property => property._id === action.property._id
  );

  const updatedProperties = [...state.item.properties];
  updatedProperties[indexOfUpdatedProperty] = action.property;

  return updateObject(state, {
    updatingProperty: false,
    item: {
      ...state.item,
      properties: updatedProperties
    }
  });
};

const updatePropertyFail = (state, action) => {
  return updateObject(state, {
    updatingProperty: false,
    updatingPropertyError: action.error
  });
};

const removePropertyStart = (state, action) => {
  return updateObject(state, {
    removingProperty: true
  });
};

const removePropertySuccess = (state, action) => {
  return updateObject(state, {
    removingProperty: false,
    item: {
      ...state.item,
      properties: state.item.properties.filter(
        property => property._id !== action.propertyId
      )
    }
  });
};

const removePropertyFail = (state, action) => {
  return updateObject(state, {
    removingProperty: false,
    removingPropertyError: action.error
  });
};

const addAttachmentsStart = (state, action) => {
  return updateObject(state, {
    addingAttachments: true
  });
};

const addAttachmentsSuccess = (state, action) => {
  return updateObject(state, {
    addingAttachments: false,
    item: {
      ...state.item,
      attachments: state.item.attachments.concat(action.attachments)
    }
  });
};

const addAttachmentsFail = (state, action) => {
  return updateObject(state, {
    addingAttachments: false,
    addingAttachmentsError: action.error
  });
};

const removeAttachmentStart = (state, action) => {
  return updateObject(state, {
    removingAttachment: true
  });
};

const removeAttachmentSuccess = (state, action) => {
  return updateObject(state, {
    removingAttachment: false,
    item: {
      ...state.item,
      attachments: state.item.attachments.filter(
        attachment => attachment._id !== action.attachmentId
      )
    }
  });
};

const removeAttachmentFail = (state, action) => {
  return updateObject(state, {
    removingAttachment: false,
    removingAttachmentError: action.error
  });
};

const addNoteStart = (state, action) => {
  return updateObject(state, {
    addingNote: true
  });
};

const addNoteSuccess = (state, action) => {
  return updateObject(state, {
    addingNote: false,
    item: {
      ...state.item,
      notes: state.item.notes.concat(action.note)
    }
  });
};

const addNoteFail = (state, action) => {
  return updateObject(state, {
    addingNote: false,
    addingNoteError: action.error
  });
};

const removeNoteStart = (state, action) => {
  return updateObject(state, {
    removingNote: true
  });
};

const removeNoteSuccess = (state, action) => {
  return updateObject(state, {
    removingNote: false,
    item: {
      ...state.item,
      notes: state.item.notes.filter(note => note._id !== action.noteId)
    }
  });
};

const removeNoteFail = (state, action) => {
  return updateObject(state, {
    removingNote: false,
    removingNoteError: action.error
  });
};

const removeItemStart = (state, action) => {
  return updateObject(state, { removingItem: true });
};

const removeItemFail = (state, action) => {
  return updateObject(state, {
    removingItem: false,
    removingItemError: action.error
  });
};

const removeItemSuccess = (state, action) => {
  return updateObject(state, {
    removingItem: false,
    items: state.items.filter(item => item._id !== action.removedItemId)
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ITEMS_START:
      return fetchItemsStart(state, action);
    case actionTypes.FETCH_ITEMS_SUCCESS:
      return fetchItemsSuccess(state, action);
    case actionTypes.FETCH_ITEMS_FAIL:
      return fetchItemsFail(state, action);
    case actionTypes.RESET_ITEMS:
      return resetItems(state, action);
    case actionTypes.FETCH_ITEM_START:
      return fetchItemStart(state, action);
    case actionTypes.FETCH_ITEM_SUCCESS:
      return fetchItemSuccess(state, action);
    case actionTypes.FETCH_ITEM_FAIL:
      return fetchItemFail(state, action);
    case actionTypes.RESET_ITEM:
      return resetItem(state, action);
    case actionTypes.CREATE_ITEMS_START:
      return createItemsStart(state, action);
    case actionTypes.CREATE_ITEMS_SUCCESS:
      return createItemsSuccess(state, action);
    case actionTypes.CREATE_ITEMS_FAIL:
      return createItemsFail(state, action);
    case actionTypes.UPDATE_ITEM_DETAILS_START:
      return updateItemDetailsStart(state, action);
    case actionTypes.UPDATE_ITEM_DETAILS_SUCCESS:
      return updateItemDetailsSuccess(state, action);
    case actionTypes.UPDATE_ITEM_DETAILS_FAIL:
      return updateItemDetailsFail(state, action);
    case actionTypes.ADD_PROPERTY_START:
      return addPropertyStart(state, action);
    case actionTypes.ADD_PROPERTY_SUCCESS:
      return addPropertySuccess(state, action);
    case actionTypes.ADD_PROPERTY_FAIL:
      return addPropertyFail(state, action);
    case actionTypes.UPDATE_PROPERTY_START:
      return updatePropertyStart(state, action);
    case actionTypes.UPDATE_PROPERTY_SUCCESS:
      return updatePropertySuccess(state, action);
    case actionTypes.UPDATE_PROPERTY_FAIL:
      return updatePropertyFail(state, action);
    case actionTypes.REMOVE_PROPERTY_START:
      return removePropertyStart(state, action);
    case actionTypes.REMOVE_PROPERTY_SUCCESS:
      return removePropertySuccess(state, action);
    case actionTypes.REMOVE_PROPERTY_FAIL:
      return removePropertyFail(state, action);
    case actionTypes.ADD_ATTACHMENTS_START:
      return addAttachmentsStart(state, action);
    case actionTypes.ADD_ATTACHMENTS_SUCCESS:
      return addAttachmentsSuccess(state, action);
    case actionTypes.ADD_ATTACHMENTS_FAIL:
      return addAttachmentsFail(state, action);
    case actionTypes.REMOVE_ATTACHMENT_START:
      return removeAttachmentStart(state, action);
    case actionTypes.REMOVE_ATTACHMENT_SUCCESS:
      return removeAttachmentSuccess(state, action);
    case actionTypes.REMOVE_ATTACHMENT_FAIL:
      return removeAttachmentFail(state, action);
    case actionTypes.REMOVE_NOTE_START:
      return addNoteStart(state, action);
    case actionTypes.ADD_NOTE_SUCCESS:
      return addNoteSuccess(state, action);
    case actionTypes.ADD_NOTE_FAIL:
      return addNoteFail(state, action);
    case actionTypes.ADD_NOTE_START:
      return removeNoteStart(state, action);
    case actionTypes.REMOVE_NOTE_SUCCESS:
      return removeNoteSuccess(state, action);
    case actionTypes.REMOVE_NOTE_FAIL:
      return removeNoteFail(state, action);
    case actionTypes.REMOVE_ITEM_START:
      return removeItemStart(state, action);
    case actionTypes.REMOVE_ITEM_FAIL:
      return removeItemFail(state, action);
    case actionTypes.REMOVE_ITEM_SUCCESS:
      return removeItemSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
