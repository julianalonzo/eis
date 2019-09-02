const Template = require('../models/template');

exports.getTemplates = (req, res, next) => {
  Template.find()
    .then(templates => {
      res.status(200).json({ templates: templates });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.createTemplate = (req, res, next) => {
  // @TODO: Add validation

  let thumbnails = [];
  if (req.files.thumbnails) {
    thumbnails = req.files.thumbnails.map(thumbnail => {
      return {
        originalname: thumbnail.originalname,
        mimetype: thumbnail.mimetype,
        filename: thumbnail.filename,
        path: thumbnail.path
      };
    });
  }

  let properties = [];
  if (req.body.properties) {
    properties = req.body.properties.map(property => {
      return JSON.parse(property);
    });
  }

  let attachments = [];
  if (req.files.attachments) {
    req.files.attachments.map(attachment => {
      return {
        originalname: attachment.originalname,
        mimetype: attachment.mimetype,
        filename: attachment.filename,
        path: attachment.path
      };
    });
  }

  const template = new Template({
    name: req.body.name,
    description: req.body.description,
    item: {
      ...JSON.parse(req.body.item),
      thumbnails: thumbnails
    },
    properties: properties,
    attachments: attachments
  });

  template
    .save()
    .then(savedTemplate => {
      res.status(201).json({ template: savedTemplate });
    })
    .catch(err => {
      console.log(err);
    });
};
