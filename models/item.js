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
  },
  thumbnails: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File'
    }
  ],
  properties: [
    { name: { type: String, isRequired: true }, value: { type: String } }
  ],
  attachments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File'
    }
  ],
  shown: {
    type: Boolean,
    isRequired: true
  },
  folder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder'
  }
});

module.exports = mongoose.model('Item', itemSchema);
