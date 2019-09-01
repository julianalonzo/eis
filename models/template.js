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
    thumbnails: [
      {
        originalname: { type: String, isRequired: true },
        mimetype: { type: String, isRequired: true },
        filename: { type: String, isRequired: true },
        path: { type: String, isRequired: true }
      }
    ]
  },
  properties: [
    { name: { type: String, isRequired: true }, value: { type: String } }
  ],
  attachments: [
    {
      originalname: { type: String, isRequired: true },
      mimetype: { type: String, isRequired: true },
      filename: { type: String, isRequired: true },
      path: { type: String, isRequired: true }
    }
  ]
});

module.exports = mongoose.model('Template', templateSchema);
