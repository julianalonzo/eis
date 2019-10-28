const { sanitizeBody } = require('express-validator');
const { validationResult } = require('express-validator');

const { sanitizeItemForCreate, sanitizeItemForUpdate } = require('./item');

/**
 * Sanitizer for creating a template
 */
const createTemplateSanitizer = sanitizeBody('template').customSanitizer(
  (value, { req }) => {
    // Do not sanitize when validation fails
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return;
    }

    const { name: templateName, description, item } = JSON.parse(value);

    return {
      name: templateName.trim(),
      description: ('' + description).trim(),
      item: sanitizeItemForCreate(item)
    };
  }
);

/**
 * Sanitizer for updating a template
 */
const updateTemplateSanitizer = sanitizeBody('template').customSanitizer(
  (value, { req }) => {
    // Do not sanitize when validation fails
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return;
    }

    const { name: templateName, description, item } = Boolean(value)
      ? JSON.parse(value)
      : {};

    return {
      name: templateName !== undefined ? ('' + templateName).trim() : undefined,
      description:
        description !== undefined ? ('' + description).trim() : undefined,
      item: sanitizeItemForUpdate(Boolean(item) ? item : {})
    };
  }
);

module.exports = {
  createTemplateSanitizer,
  updateTemplateSanitizer
};
