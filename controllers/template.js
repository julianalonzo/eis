const { generateItemData } = require('./item');

const Template = require('../models/template');

exports.getTemplates = async (req, res, next) => {
  try {
    const templates = await Template.find({ shown: true }).populate(
      'item.thumbnails'
    );

    res.status(200).json({ templates: templates });
  } catch (err) {
    console.log(err);
  }
};

exports.getTemplate = async (req, res, next) => {
  try {
    const templateId = req.params.templateId || '';

    const template = await Template.findOne({ _id: templateId, shown: true })
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
    const itemName = req.body.itemName || '';
    const itemCategory = req.body.itemCategory || '';
    const itemCondition = req.body.itemCondition || '';
    const properties = req.body.properties
      ? JSON.parse(req.body.properties)
      : [];
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
      },
      shown: true
    });

    const savedTemplate = await template.save();

    res.status(201).json({ template: savedTemplate });
  } catch (err) {
    console.log(err);
  }
};

exports.removeTemplate = async (req, res, next) => {
  // @TODO Add validation

  try {
    const templateId = req.body.templateId;

    await Template.updateOne({ _id: templateId }, { $set: { shown: false } });

    res.status(200).json({ templateId: templateId });
  } catch (err) {
    console.log(err);
  }
};
