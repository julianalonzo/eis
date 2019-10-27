const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: {
    type: String,
    isRequired: true
  },
  category: {
    type: String,
    default: ''
  },
  condition: {
    type: String,
    default: ''
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
        type: String,
        default: ''
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
        type: String,
        isRequired: true
      },
      datePosted: {
        type: Date,
        default: Date.now
      }
    }
  ],
  shown: {
    type: Boolean,
    default: true,
    select: false
  },
  folder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder'
  },
  isTemplate: {
    type: Boolean,
    default: false,
    select: false
  }
});

itemSchema.index({
  _id: 'text',
  name: 'text',
  category: 'text',
  condition: 'text',
  'properties.name': 'text',
  'properties.value': 'text',
  'notes.content': 'text'
});

module.exports = mongoose.model('Item', itemSchema);
