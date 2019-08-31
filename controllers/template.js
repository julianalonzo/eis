const Template = require('../models/template');

exports.createTemplate = (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'Dummy'
  });
};
