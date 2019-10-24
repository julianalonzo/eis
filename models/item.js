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
    {
      name: {
        type: String,
        isRequired: true
      },
      value: {
        type: String
      }
    }
  ],
  attachments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File'
    }
  ],
  notes: [
    {
      content: {
        type: String
      },
      datePosted: {
        type: Date,
        isRequired: true,
        default: Date.now
      }
    }
  ],
  shown: {
    type: Boolean,
    isRequired: true,
    select: false
  },
  folder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder'
  }
});

itemSchema.index({
  name: 'text',
  category: 'text',
  condition: 'text',
  'properties.value': 'text',
  'notes.content': 'text'
});

module.exports = mongoose.model('Item', itemSchema);
