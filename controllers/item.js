const Item = require('../models/item');

exports.getItems = async (req, res, next) => {
  try {
    const items = await Item.find();

    res.status(200).json({ items: items });
  } catch (err) {
    console.log(err);
  }
};
