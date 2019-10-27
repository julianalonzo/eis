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
 */
const createItemSanitizer = sanitizeBody('item').customSanitizer(
  (value, { req }) => {
    // Do not sanitize when validation fails
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return;
    }

    const {
      name,
      category,
      condition,
      properties,
      thumbnails,
      attachments,
      folder,
      notes
    } = JSON.parse(value);

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
);

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

    const {
      name,
      category,
      condition,
      properties,
      thumbnails,
      attachments,
      folder,
      notes
    } = Boolean(value) ? JSON.parse(value) : {};

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
);

module.exports = {
  createItemSanitizer,
  updateItemSanitizer
};
