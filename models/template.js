const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const templateSchema = new Schema({
  name: {
    type: String,
    isRequired: true
  },
  description: {
    type: String
  },
  item: {
    name: {
      type: String,
      isRequired: true
    },
    category: {
      type: String
    },
    condition: {
      type: String
    },
    thumbnails: {
      type: [String]
    }
  },
  properties: {
    type: [
      { name: { type: String, isRequired: true }, value: { type: String } }
    ]
  },
  attachments: [String]
});

module.exports = mongoose.model('Template', templateSchema);
