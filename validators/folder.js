const { body, param, query } = require('express-validator');
const mongoose = require('mongoose');

const Folder = require('../models/folder');

/**
 * Validates whether the folder and _id query params are valid object IDs
 */
const getFoldersValidator = [
  query('_id').custom(value => {
    if (value === undefined) {
      return true;
    } else if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error(`ID "${value}" is not a valid ObjectId`);
    }

    return true;
  }),
  query('parent').custom(async value => {
    if (value === undefined) {
      return true;
    } else if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error(`Parent folder ID "${value}" is not a valid ObjectId`);
    } else if (!(await isFolderFound(value))) {
      throw new Error(`Parent folder ID ${value} does not exist`);
    }

    return true;
  })
];

/**
 * Validates whether the itemId param is existing and is a valid ObjectId
 */
const getFolderValidator = [
  param('folderId').custom(value => {
    if (!Boolean(value)) {
      throw new Error('Folder ID is required');
    } else if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error(`Folder ID ${value} is not a valid ObjectId`);
    }

    return true;
  })
];

/**
 * Validates whether name is not empty and parent is a valid ObjectId and is existing
 */
const createFolderValidator = [
  body('name')
    .not()
    .isEmpty({ ignore_whitespace: true })
    .trim()
    .withMessage('Folder name is required'),
  body('parent').custom(async value => {
    if (!Boolean(value)) {
      return true;
    } else if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error(`Parent folder ID ${value} is not a valid ObjectId`);
    } else if (!(await isFolderFound(value))) {
      throw new Error(`Parent folder ID ${value} does not exist`);
    }

    return true;
  })
];

/**
 * Validator for updating a folder
 */
const updateFolderValidator = [
  param('folderId').custom(async value => {
    if (!Boolean(value)) {
      throw new Error('Folder ID is required');
    } else if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error(`Folder ID ${value} is not a valid ObjectId`);
    }

    return true;
  }),
  body('name')
    .custom(value => {
      if (!Boolean(value)) {
        return true;
      }

      if (('' + value).trim() === '') {
        throw new Error('Folder name is required');
      }

      return true;
    })
    .trim(),
  body('parent').custom(async (value, { req }) => {
    if (!Boolean(value)) {
      return true;
    } else if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error(`Parent folder ID ${value} is not a valid ObjectId`);
    } else if (!(await isFolderFound(value))) {
      throw new Error(`Parent folder ID ${value} does not exist`);
    } else if (value === req.params.folderId) {
      throw new Error('A folder cannot be its own parent');
    }

    return true;
  })
];

const deleteFolderValidator = param('folderId').custom(value => {
  if (!Boolean(value)) {
    throw new Error('Folder ID is required');
  } else if (!mongoose.Types.ObjectId.isValid(value)) {
    throw new Error(`Folder ID ${value} is not a valid ObjectId`);
  }

  return true;
});

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

module.exports = {
  getFoldersValidator,
  getFolderValidator,
  createFolderValidator,
  updateFolderValidator,
  deleteFolderValidator,
  isFolderFound
};
