const { toArray } = require('../util/helperFunctions');
const { saveFiles } = require('../controllers/files');

const Template = require('../models/template');

exports.getTemplates = async (req, res, next) => {
  try {
    const templates = await Template.find();
    res.status(200).json({ templates: templates });
  } catch (err) {
    console.log(err);
  }
};

exports.createTemplate = async (req, res, next) => {
  // @TODO: Add validation

  try {
    // Ensure that an array is passed to the Template's properties field
    let properties = [];
    if (req.body.properties) {
      properties = toArray(req.body.properties);
      properties = properties.map(property => {
        return JSON.parse(property);
      });
    }

    // Ensure that an array is passed to the Template's thumbnails field
    let thumbnails = [];
    if (req.files.thumbnails) {
      const uploadedThumbnails = await saveFiles(
        'thumbnail',
        req.files.thumbnails
      );

      thumbnails = uploadedThumbnails.map(uploadedThumbnail => {
        return uploadedThumbnail.id;
      });
    }

    // @TODO: Process attachments

    const template = new Template({
      name: req.body.name,
      description: req.body.description ? req.body.description : '',
      item: {
        ...JSON.parse(req.body.item),
        thumbnails: thumbnails
      },
      properties: properties
    });

    const savedTemplate = await template.save();
    res.status(201).json({ template: savedTemplate });
  } catch (err) {
    console.log(err);
  }
};
