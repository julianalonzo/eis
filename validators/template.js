const { body, param, query } = require('express-validator');
const mongoose = require('mongoose');

const { validateItemCreate, validateItemUpdate } = require('./item');

/**
 * Validator for getting templates
 */
const getTemplatesValidator = [
  query('_id').custom(value => {
    if (value === undefined) {
      return true;
    } else if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error(`ID "${value}" is not a valid ObjectId`);
    }

    return true;
  })
];

/**
 * Validator for getting a template
 */
const getTemplateValidator = [
  param('templateId').custom(value => {
    if (!Boolean(value)) {
      throw new Error('Template ID is required');
    } else if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error(`Template ID ${value} is not a valid ObjectId`);
    }

    return true;
  })
];

/**
 * Validator for creating a template
 */
const createTemplateValidator = body('template').custom(async value => {
  let template;

  if (!Boolean(value)) {
    throw new Error('Template is required');
  }

  try {
    template = JSON.parse(value);
  } catch (err) {
    throw new Error('Template must be JSON');
  }

  const name = template.name || '';
  if (name.trim() === '') {
    throw new Error('Template name is required');
  }

  if (!Boolean(template.item)) {
    throw new Error('Item is required on template');
  }

  await validateItemCreate(JSON.stringify(template.item));

  const folder = template.item.folder || '';
  if (('' + folder).trim() !== '') {
    throw new Error('You may not set a folder for a template item');
  }

  return true;
});

/**
 * Validator for updating a template
 */
const updateTemplateValidator = [
  param('templateId').custom(value => {
    if (!Boolean(value)) {
      throw new Error('Template ID is required');
    } else if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error(`Template ID ${value} is not a valid ObjectId`);
    }

    return true;
  }),
  body('template').custom(async value => {
    let template;

    // Ignore if template is not in request body
    if (!Boolean(value)) {
      return true;
    }

    try {
      template = JSON.parse(value);
    } catch (err) {
      throw new Error('Template must be JSON');
    }

    const name =
      template.name !== undefined ? ('' + template.name).trim() : undefined;
    if (name !== undefined) {
      if (name.trim() === '') {
        throw new Error('Template name is required');
      }
    }

    if (Boolean(template.item)) {
      const folder = template.item.folder || '';
      if (('' + folder).trim() !== '') {
        throw new Error('You may not set a folder for a template item');
      }

      await validateItemUpdate(JSON.stringify(template.item));
    }

    return true;
  })
];

/**
 * Validator for deleting a template
 */
const deleteTemplateValidator = [
  param('templateId').custom(value => {
    if (!Boolean(value)) {
      throw new Error('Template ID is required');
    } else if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error(`Template ID ${value} is not a valid ObjectId`);
    }

    return true;
  })
];

module.exports = {
  getTemplatesValidator,
  getTemplateValidator,
  createTemplateValidator,
  updateTemplateValidator,
  deleteTemplateValidator
};
