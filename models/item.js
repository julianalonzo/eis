const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: {
    type: String,
    isRequired: true
  },
  category: {
    type: String
  },
  condition: {
    type: String
  }
});

module.exports = mongoose.model('Item', itemSchema);
