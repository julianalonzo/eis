const Item = require('../models/item');

exports.getItems = (req, res, next) => {
  Item.find()
    .then(items => {
      res.status(200).json({ items: items });
    })
    .catch(error => {
      console.log('Error', error);
    });
};
