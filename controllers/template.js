const Template = require('../models/template');

exports.getTemplates = (req, res, next) => {
  Template.find()
    .then(templates => {
      res.status(200).json(templates);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.createTemplate = (req, res, next) => {
  // @TODO: Add validation
  const template = new Template({
    name: req.body.name,
    description: req.body.description,
    item: {
      ...JSON.parse(req.body.item),
      thumbnails: [
        ...req.files.thumbnails.map(thumbnail => {
          return {
            originalname: thumbnail.originalname,
            mimetype: thumbnail.mimetype,
            filename: thumbnail.filename,
            path: thumbnail.path
          };
        })
      ]
    },
    properties: [
      ...req.body.properties.map(property => {
        return JSON.parse(property);
      })
    ],
    attachments: [
      ...req.files.attachments.map(attachment => {
        return {
          originalname: attachment.originalname,
          mimetype: attachment.mimetype,
          filename: attachment.filename,
          path: attachment.path
        };
      })
    ]
  });

  template
    .save()
    .then(savedTemplate => {
      res.status(201).json(savedTemplate);
    })
    .catch(err => {
      console.log(err);
    });
};
