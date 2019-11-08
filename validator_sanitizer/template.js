const { body, param, query } = require("express-validator");
const mongoose = require("mongoose");

const { createItemValidator, updateItemValidator } = require("./item");

/**
 * Validator for getting templates
 */
const getTemplatesValidator = [
  query("_id").custom(value => {
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
  param("templateId").custom(value => {
    if (!Boolean(value)) {
      throw new Error("Template ID is required");
    } else if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error(`Template ID ${value} is not a valid ObjectId`);
    }

    return true;
  })
];

/**
 * Validator for creating a template
 */
const createTemplateValidator = [
  body("templateName")
    .not()
    .isEmpty({ ignore_whitespace: true })
    .withMessage("Template name is required")
    .trim(),
  ...createItemValidator.slice(0, createItemValidator.length - 1), // Do not include folder field validation
  body("folder")
    .not()
    .exists()
    .withMessage("You cannot set a folder for a template")
];

/**
 * Validator for updating a template
 */
const updateTemplateValidator = [
  param("templateId").custom(value => {
    if (!Boolean(value)) {
      throw new Error("Template ID is required");
    } else if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error(`Template ID ${value} is not a valid ObjectId`);
    }

    return true;
  }),
  body("templateName")
    .if(body("templateName").exists())
    .not()
    .isEmpty({ ignore_whitespace: true })
    .withMessage("Template name is required")
    .trim(),
  ...updateItemValidator.slice(1, updateItemValidator.length - 1), // Do not include folder field validation
  body("folder")
    .not()
    .exists()
    .withMessage("You cannot set a folder for a template")
];

/**
 * Validator for deleting a template
 */
const deleteTemplateValidator = [
  param("templateId").custom(value => {
    if (!Boolean(value)) {
      throw new Error("Template ID is required");
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
