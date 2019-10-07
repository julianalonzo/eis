const { generateItemData } = require('./item');

const Template = require('../models/template');

exports.getTemplates = async (req, res, next) => {
  try {
    const templates = await Template.find().populate('item.thumbnails');

    res.status(200).json({ templates: templates });
  } catch (err) {
    console.log(err);
  }
};

exports.getTemplate = async (req, res, next) => {
  try {
    const templateId = req.params.templateId || '';

    const template = await Template.findOne({ _id: templateId })
      .populate('item.thumbnails')
      .populate('item.attachments')
      .exec();

    res.status(200).json({ template: template });
  } catch (err) {
    console.log(err);
  }
};

exports.createTemplate = async (req, res, next) => {
  // @TODO: Add validation

  try {
    const templateName = req.body.name || '';
    const templateDescription = req.body.description || '';
    const rawItemData = req.body.item
      ? JSON.parse(req.body.item)
      : { name: '', category: '', condition: '' };
    const itemName = rawItemData.name || '';
    const itemCategory = rawItemData.category || '';
    const itemCondition = rawItemData.condition || '';
    const properties = req.body.properties || [];
    const fileThumbnails = req.files.fileThumbnails || [];
    const fileAttachments = req.files.fileAttachments || [];

    const itemData = await generateItemData(
      itemName,
      itemCategory,
      itemCondition,
      properties,
      [],
      fileThumbnails,
      [],
      fileAttachments
    );

    const template = new Template({
      name: templateName,
      description: templateDescription,
      item: {
        name: itemData.name,
        category: itemData.category,
        condition: itemData.condition,
        thumbnails: itemData.thumbnails,
        attachments: itemData.attachments,
        properties: itemData.properties
      }
    });

    const savedTemplate = await template.save();

    res.status(201).json({ template: savedTemplate });
  } catch (err) {
    console.log(err);
  }
};
