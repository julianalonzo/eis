const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const Item = require('../models/item');
const Template = require('../models/template');

const { saveFiles } = require('./file');

/**
 * Gets all shown or searched/filtered templates
 * @param {Object} req Request object
 * @param {Object} req.query Request queries
 * @param {string} req.query.search Request query parameter for full-text search
 * @param {Object} res Response object
 */
async function getTemplates(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  let templates = [];

  const searchQuery = req.query.search || '';
  if (Boolean(searchQuery)) {
    templates = await Template.find(
      {
        $text: { $search: searchQuery },
        shown: true
      },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .populate('item')
      .populate('item.thumbnails')
      .populate('item.attachments')
      .exec();
  } else {
    templates = await Template.find({ ...req.query, shown: true })
      .populate('item')
      .populate('item.thumbnails')
      .populate('item.attachments')
      .exec();
  }

  if (templates.length > 0) {
    return res.status(200).json({ templates: templates });
  } else {
    return res.status(404).json({ templates: [] });
  }
}

/**
 * Get a template based on the id provided
 * @param {Object} req Request object
 * @param {Object} req.params Request parameters
 * @param {mongoose.SchemaTypes.ObjectId} req.params.templateId ID of the template to be fetched (required)
 * @param {Object} res Response object
 */
async function getTemplate(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const templateId = req.params.templateId;
  const template = await Template.findOne({ _id: templateId, shown: true })
    .populate('item')
    .populate('item.thumbnails')
    .populate('item.attachments')
    .exec();

  if (Boolean(template)) {
    return res.status(200).json({ template: template });
  } else {
    return res.status(404).json({
      template: null,
      error: { status: 404, userMessage: 'Template does not exist' }
    });
  }
}

/**
 * Creates a new template
 * @param {Object} req Request object
 * @param {Object} req.body Request body
 * @param {Object} req.body.template Template to be added
 * @param {string} req.body.template.name Name of the template (required)
 * @param {string} req.body.template.description Describes the template
 * @param {Object} req.body.template.item Item to be added
 * @param {string} req.body.template.item.name Name of the item (required)
 * @param {string} req.body.template.item.category Category of the item
 * @param {string} req.body.template.item.condition Condition of the item
 * @param {Object[]} req.body.item.properties Properties of an item
 * @param {string} req.body.item.properties[].name Name of the property (required)
 * @param {string} req.body.item.properties[].value Value of the property
 * @param {Object} req.files Request files (handled by multer)
 * @param {File[]} req.files.newThumbnails Newly uploaded thumbnails for the template
 * @param {File[]} req.files.newAttachments Newly uploaded attachments for the template
 * @param {Object} res Response object
 */
async function createTemplate(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const {
    name: templateName,
    description,
    item: { name: itemName, category, condition, properties }
  } = req.body.template;

  const { newThumbnails, newAttachments } = req.files;

  const newThumbnailsIds = await saveFiles('thumbnail', newThumbnails || []);
  const newAttachmentsIds = await saveFiles('attachment', newAttachments || []);

  const savedItem = await new Item({
    name: itemName,
    category: category,
    condition: condition,
    thumbnails: newThumbnailsIds,
    properties: properties,
    attachments: newAttachmentsIds,
    notes: [],
    folder: null,
    isTemplate: true
  }).save();

  const savedTemplate = await new Template({
    name: templateName,
    description: description,
    item: savedItem.id
  }).save();

  const template = await savedTemplate
    .populate({
      path: 'item',
      populate: [
        {
          path: 'thumbnails',
          model: 'File'
        },
        {
          path: 'attachments',
          model: 'File'
        }
      ]
    })
    .execPopulate();

  return res.status(201).json({ template: template });
}

/**
 * Updates a new template
 * @param {Object} req Request object
 * @param {Object} req.body Request body
 * @param {Object} req.body.template Template to be updated
 * @param {string} req.body.template.name Name of the template
 * @param {string} req.body.template.description Describes the template
 * @param {Object} req.body.template.item Item to be updated
 * @param {string} req.body.template.item.name Name of the item
 * @param {string} req.body.template.item.category Category of the item
 * @param {string} req.body.template.item.condition Condition of the item
 * @param {Object[]} req.body.item.properties Properties of an item
 * @param {string} req.body.item.properties[].name Name of the property
 * @param {string} req.body.item.properties[].value Value of the property
 * @param {Object} req.files Request files (handled by multer)
 * @param {File[]} req.files.newThumbnails Newly uploaded thumbnails for the template
 * @param {File[]} req.files.newAttachments Newly uploaded attachments for the template
 * @param {Object} res Response object
 */
async function updateTemplate(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const templateId = req.params.templateId;
  const { name: templateName, description, item } = req.body.template;

  const template = await Template.findById(templateId);

  if (template !== null) {
    let newThumbnailsIds;
    let newAttachmentsIds;
    if (req.files) {
      const { newThumbnails, newAttachments } = req.files;

      newThumbnailsIds = newThumbnails
        ? await saveFiles('thumbnail', newThumbnails)
        : undefined;
      newAttachmentsIds = newAttachments
        ? await saveFiles('attachment', newAttachments)
        : undefined;
    }

    await Template.updateOne(
      { _id: templateId },
      { name: templateName, description: description },
      { omitUndefined: true }
    );

    await Item.updateOne(
      { _id: template.item },
      {
        $set: {
          _id: template.item,
          ...item
        }
      },
      { omitUndefined: true }
    );

    await Item.updateOne(
      { _id: template.item },
      {
        $addToSet: {
          thumbnails: newThumbnailsIds,
          attachments: newAttachmentsIds
        }
      },
      { omitUndefined: true }
    );

    const updatedTemplate = await Template.findById(templateId)
      .populate({
        path: 'item',
        populate: [
          {
            path: 'thumbnails',
            model: 'File'
          },
          {
            path: 'attachments',
            model: 'File'
          }
        ]
      })
      .exec();

    return res.status(200).json({
      template: updatedTemplate
    });
  } else {
    return res.status(404).json({
      template: null,
      error: { status: 404, userMessage: 'Template does not exist' }
    });
  }
}

/**
 * Permanently deletes the template
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} req.params Request parameters
 * @param {Object} req.params.templateId ID of the template to be deleted
 */
async function deleteTemplate(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const templateId = req.params.templateId;

  const template = await Template.findById(templateId);

  if (template === null) {
    return res.status(404).json({
      templateId: null,
      error: {
        status: 404,
        userMessage: 'Template does not exist'
      }
    });
  }

  const templateItemId = template.item;

  template.remove();
  await template.save();

  await Item.findOneAndDelete({ _id: templateItemId });

  return res.status(200).json({ templateId: templateId });
}

module.exports = {
  getTemplates,
  getTemplate,
  createTemplate,
  updateTemplate,
  deleteTemplate
};
