const path = require('path');

exports.getFile = (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'uploads', req.params.filename));
};
