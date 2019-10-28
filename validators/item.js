const { body, param, query } = require('express-validator');
const mongoose = require('mongoose');

const File = require('../models/file');
const Folder = require('../models/folder');

/**
 * Validates whether the folder and _id query params are valid object IDs
 */
const getItemsValidator = [
  query('_id').custom(value => {
    if (value === undefined) {
      return true;
    } else if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error(`ID "${value}" is not a valid ObjectId`);
    }

    return true;
  }),
  query('folder').custom(value => {
    if (value === undefined) {
      return true;
    } else if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error(`Folder ID "${value}" is not a valid ObjectId`);
    }

    return true;
  })
];

/**
 * Validates whether the itemId param is existing and is a valid ObjectId
 */
const getItemValidator = [
  param('itemId').custom(value => {
    if (!Boolean(value)) {
      throw new Error('Item ID is required');
    } else if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error(`Item ID ${value} is not a valid ObjectId`);
    }

    return true;
  })
];

/**
 * Checks whether the file id with the corresponding file type is in the File collection
 * @param {string} type Either 'thumbnail' or 'attachment'
 * @param {mongoose.Types.ObjectId} fileId
 * @returns true when file is found, otherwise false
 */
async function isFileFound(type, file) {
  const savedFile = await File.findOne({
    _id: file,
    type: type
  });

  if (savedFile === null) {
    return false;
  }

  return true;
}

/**
 * Validates the item that will be created
 */
const createItemValidator = body('item').custom(async value => {
  await validateItemCreate(value);

  const item = JSON.parse(value);

  const folder = item.folder || '';
  if (folder.trim() === '') {
    throw new Error('Folder is required');
  } else if (!mongoose.Types.ObjectId.isValid(folder)) {
    throw new Error(`Folder ${folder} is not a valid Object ID`);
  } else if (!(await isFolderFound(folder))) {
    throw new Error(`Folder ${folder} was not found`);
  }

  return true;
});

/**
 * Validates the item that will be updated
 */
const updateItemValidator = [
  param('itemId').custom(value => {
    if (!Boolean(value)) {
      throw new Error('Item ID is required');
    } else if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error(`Item ID ${value} is not a valid ObjectId`);
    }

    return true;
  }),
  body('item').custom(async value => {
    // Ignore if item is not in request body
    if (!Boolean(value)) {
      return true;
    }

    await validateItemUpdate(value);

    const { folder } = JSON.parse(value);
    if (folder !== undefined) {
      if (('' + folder).trim() === '') {
        throw new Error('Folder is required');
      } else if (!mongoose.Types.ObjectId.isValid(folder)) {
        throw new Error(`Folder ${folder} is not a valid Object ID`);
      } else if (!(await isFolderFound(folder))) {
        throw new Error(`Folder ${folder} was not found`);
      }
    }

    return true;
  })
];

/**
 * Validates the item that will be deleted
 */
const deleteItemValidator = [
  param('itemId').custom(value => {
    if (!Boolean(value)) {
      throw new Error('Item ID is required');
    } else if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error(`Item ID ${value} is not a valid ObjectId`);
    }
  })
];

/**
 * Checks whether the folder id is found in the Folder collection
 * @param {mongoose.Types.ObjectId} folderId
 * @returns true when the folder is found, otherwise false
 */
async function isFolderFound(folderId) {
  const folder = await Folder.findOne({
    _id: folderId,
    shown: true
  });

  if (folder === null) {
    return false;
  }

  return true;
}

/**
 * Validates thumbnails if they are a valid ObjectId and if they exist in the collection
 * @param {mongoose.Types.ObjectId[]} thumbnails Thumbnail IDs
 */
async function validateThumbnails(thumbnails) {
  for (const thumbnail of thumbnails) {
    if (!mongoose.Types.ObjectId.isValid(thumbnail)) {
      throw new Error(`Thumbnail ${thumbnail} is not a valid Object ID`);
    } else if (!(await isFileFound('thumbnail', thumbnail))) {
      throw new Error(`Thumbnail ${thumbnail} does not exist`);
    }
  }
}

/**
 * Validates property names of properties if they exist
 * @param {Object[]} properties Properties to be validated
 * @param {string} properties.name Name of the property (required)
 * @param {string} properties.value Value of the property
 */
async function validateProperties(properties) {
  for (const property of properties) {
    const propertyName = property.name || '';
    if (propertyName.trim() === '') {
      throw new Error('Property name is required');
    }
  }
}

/**
 * Validates attachments if they are a valid ObjectId and if they exist in the collection
 * @param {mongoose.Types.ObjectId[]} attachments Attachments to be validated
 */
async function validateAttachments(attachments) {
  for (const attachment of attachments) {
    if (!mongoose.Types.ObjectId.isValid(attachment)) {
      throw new Error(`Attachment ${attachment} is not a valid Object ID`);
    } else if (!(await isFileFound('attachment', attachment))) {
      throw new Error(`Attachment ${attachment} does not exist`);
    }
  }
}

/**
 * Validate an item object for create
 * @param {string} value Item that will be parsed to JSON and validated
 */
async function validateItemCreate(value) {
  let item;

  if (!Boolean(value)) {
    throw new Error('Item is required');
  }

  try {
    item = JSON.parse(value);
  } catch (err) {
    throw new Error('Item must be JSON');
  }

  const name = item.name || '';
  if (name.trim() === '') {
    throw new Error('Item name is required');
  }

  const thumbnails = item.thumbnails || [];
  await validateThumbnails(thumbnails);

  const properties = item.properties || [];
  await validateProperties(properties);

  const attachments = item.attachments || [];
  await validateAttachments(attachments);

  const notes = item.notes || [];
  for (const note of notes) {
    if (note.trim() === '') {
      throw new Error('A note must not be empty');
    }
  }
}

/**
 * Validate an item object for update
 * @param {string} value Item that will be parsed to JSON and validated
 */
async function validateItemUpdate(value) {
  let item;

  try {
    item = JSON.parse(value);
  } catch (err) {
    throw new Error('Item must be JSON');
  }

  const name = item.name !== undefined ? '' + item.name.trim() : undefined;
  if (name !== undefined) {
    if (name.trim() === '') {
      throw new Error('Item name is required');
    }
  }

  const thumbnails = item.thumbnails || [];
  await validateThumbnails(thumbnails);

  const properties = item.properties || [];
  await validateProperties(properties);

  const attachments = item.attachments || [];
  await validateAttachments(attachments);

  const notes = item.notes || [];
  for (const note of notes) {
    if (note.content.trim() === '') {
      throw new Error('A note must not be empty');
    }
  }

  return true;
}

module.exports = {
  getItemsValidator,
  getItemValidator,
  createItemValidator,
  updateItemValidator,
  deleteItemValidator,
  validateItemCreate,
  validateItemUpdate
};
