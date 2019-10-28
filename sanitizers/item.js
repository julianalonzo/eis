const { sanitizeBody } = require('express-validator');
const { validationResult } = require('express-validator');

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

/**
 * Sanitizes item for create by trimming string fields and ensuring that arrays are initialized
 * @param {Object} item Item to be added
 * @param {string} item.name Name of the item (required)
 * @param {string} item.category Category of the item
 * @param {string} item.condition Condition of the item
 * @param {mongoose.SchemaTypes.ObjectId[]} item.thumbnails Thumbnail IDs of an item
 * @param {Object[]} properties Properties of an item
 * @param {string} properties[].name Name of the property (required)
 * @param {string} properties[].value Value of the property
 * @param {mongoose.SchemaTypes.ObjectId[]} item.attachments Attachment IDs of an item
 * @param {mongoose.SchemaTypes.ObjectId} item.folder Folder ID that represents where the item is located
 */
function sanitizeItemForCreate(item) {
  const {
    name,
    category,
    condition,
    properties,
    thumbnails,
    attachments,
    folder,
    notes
  } = item;

  return {
    name: name.trim(),
    category: category ? category.trim() : '',
    condition: condition ? condition.trim() : '',
    properties: properties ? sanitizeProperties(properties) : [],
    thumbnails: thumbnails || [],
    attachments: attachments || [],
    notes: notes ? notes.map(note => note.trim()) : [],
    folder: folder
  };
}

/**
 * Sanitizer for create item
 */
const createItemSanitizer = sanitizeBody('item').customSanitizer(
  (value, { req }) => {
    // Do not sanitize when validation fails
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return;
    }

    return sanitizeItemForCreate(JSON.parse(value));
  }
);

/**
 * Sanitizes item for update by trimming string fields and ensuring that arrays are initialized
 * @param {Object} item Item to be added
 * @param {string} item.name Name of the item (required)
 * @param {string} item.category Category of the item
 * @param {string} item.condition Condition of the item
 * @param {mongoose.SchemaTypes.ObjectId[]} item.thumbnails Thumbnail IDs of an item
 * @param {Object[]} properties Properties of an item
 * @param {string} properties[].name Name of the property (required)
 * @param {string} properties[].value Value of the property
 * @param {mongoose.SchemaTypes.ObjectId[]} item.attachments Attachment IDs of an item
 * @param {mongoose.SchemaTypes.ObjectId} item.folder Folder ID that represents where the item is located
 */
function sanitizeItemForUpdate(item) {
  const {
    name,
    category,
    condition,
    properties,
    thumbnails,
    attachments,
    folder,
    notes
  } = item;

  return {
    name: name !== undefined ? '' + name.trim() : undefined,
    category: category !== undefined ? '' + category.trim() : undefined,
    condition: condition !== undefined ? '' + condition.trim() : undefined,
    properties:
      properties !== undefined
        ? sanitizeProperties([...properties])
        : undefined,
    thumbnails: thumbnails !== undefined ? [...thumbnails] : undefined,
    attachments: attachments !== undefined ? [...attachments] : undefined,
    notes:
      notes !== undefined
        ? [...notes].map(note => {
            return { ...note, content: ('' + note.content).trim() };
          })
        : undefined,
    folder: folder
  };
}

/**
 * Sanitizes item for update by trimming string values and by ensuring that falsy values are set to undefined
 */
const updateItemSanitizer = sanitizeBody('item').customSanitizer(
  (value, { req }) => {
    // Do not sanitize when validation fails
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return;
    }

    return sanitizeItemForUpdate(Boolean(value) ? JSON.parse(value) : {});
  }
);

module.exports = {
  createItemSanitizer,
  updateItemSanitizer,
  sanitizeItemForCreate,
  sanitizeItemForUpdate
};
