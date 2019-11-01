const { body, param, query, sanitizeBody } = require('express-validator');
const mongoose = require('mongoose');

const { isFolderFound } = require('./folder');

const File = require('../models/file');

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
 * Validates the item that will be created
 */
const createItemValidator = [
  body('name')
    .not()
    .isEmpty({ ignore_whitespace: false })
    .withMessage('Item name is required')
    .trim(),
  body('thumbnails')
    .if(body('thumbnails').exists())
    .custom(async value => {
      let thumbnails;
      try {
        thumbnails = JSON.parse(value);
      } catch (err) {
        throw new Error('Thumbnails must be in JSON');
      }

      await validateThumbnails(thumbnails);

      return true;
    })
    .bail()
    .customSanitizer(value => {
      return JSON.parse(value);
    }),
  body('properties')
    .if(body('properties').exists())
    .custom(async value => {
      let properties;
      try {
        properties = JSON.parse(value);
      } catch (err) {
        throw new Error('Properties must be in JSON');
      }

      await validateProperties(properties);

      return true;
    })
    .bail()
    .customSanitizer(value => {
      const properties = JSON.parse(value);
      return sanitizeProperties(properties);
    }),
  body('attachments')
    .if(body('attachments').exists())
    .custom(async value => {
      let attachments;
      try {
        attachments = JSON.parse(value);
      } catch (err) {
        throw new Error('Attachments must be in JSON');
      }

      await validateAttachments(attachments);

      return true;
    })
    .bail()
    .customSanitizer(value => {
      return JSON.parse(value);
    }),
  body('folder').custom(async value => {
    const folder = value || '';
    if (folder.trim() === '') {
      throw new Error('Folder is required');
    } else if (!mongoose.Types.ObjectId.isValid(folder)) {
      throw new Error(`Folder ${folder} is not a valid Object ID`);
    } else if (!(await isFolderFound(folder))) {
      throw new Error(`Folder ${folder} was not found`);
    }

    return true;
  })
];

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
  body('name')
    .if(body('name').exists())
    .not()
    .isEmpty({ ignore_whitespace: false })
    .withMessage('Item name is required')
    .trim(),
  body('category')
    .if(body('category').exists())
    .trim(),
  body('condition')
    .if(body('condition').exists())
    .trim(),
  body('thumbnails')
    .if(body('thumbnails').exists())
    .custom(async value => {
      let thumbnails;
      try {
        thumbnails = JSON.parse(value);
      } catch (err) {
        throw new Error('Thumbnails must be in JSON');
      }

      await validateThumbnails(thumbnails);

      return true;
    })
    .bail()
    .customSanitizer(value => {
      return JSON.parse(value) || [];
    }),
  body('properties')
    .if(body('properties').exists())
    .custom(async value => {
      let properties;
      try {
        properties = JSON.parse(value) || [];
      } catch (err) {
        throw new Error('Properties must be in JSON');
      }

      await validateProperties(properties);

      return true;
    })
    .bail()
    .customSanitizer(value => {
      const properties = JSON.parse(value);
      return sanitizeProperties(properties);
    }),
  body('attachments')
    .if(body('attachments').exists())
    .custom(async value => {
      let attachments;
      try {
        attachments = JSON.parse(value);
      } catch (err) {
        throw new Error('Attachments must be in JSON');
      }

      await validateAttachments(attachments);

      return true;
    })
    .bail()
    .customSanitizer(value => {
      return JSON.parse(value);
    }),
  body('notes')
    .if(body('notes').exists())
    .custom(value => {
      let notes;
      try {
        notes = JSON.parse(value);
      } catch (err) {
        throw new Error('Notes must be in JSON');
      }

      for (const note of notes) {
        if (note.content.trim() === '') {
          throw new Error('A note must not be empty');
        }
      }

      return true;
    })
    .bail()
    .customSanitizer(value => {
      const notes = JSON.parse(value);

      return notes.map(note => {
        return {
          ...note,
          content: note.content.trim()
        };
      });
    }),
  body('folder')
    .if(body('folder').exists())
    .custom(async value => {
      const folder = value;
      if (folder.trim() === '') {
        throw new Error('Folder is required');
      } else if (!mongoose.Types.ObjectId.isValid(folder)) {
        throw new Error(`Folder ${folder} is not a valid Object ID`);
      } else if (!(await isFolderFound(folder))) {
        throw new Error(`Folder ${folder} was not found`);
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
 * Sanitizes properties by trimming name and value
 * @param {Object[]} properties Properties to be sanitized
 * @param {string} properties.name Name of the property (required)
 * @param {string} properties.value Value of the property
 */
function sanitizeProperties(properties) {
  return properties.map(property => {
    return {
      ...property,
      name: property.name.trim(),
      value: Boolean(property.value) ? property.value.trim() : ''
    };
  });
}

module.exports = {
  getItemsValidator,
  getItemValidator,
  createItemValidator,
  updateItemValidator,
  deleteItemValidator
};
