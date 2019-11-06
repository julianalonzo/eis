const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: {
    type: String,
    isRequired: true,
    trim: true
  },
  category: {
    type: String,
    default: '',
    trim: true
  },
  condition: {
    type: String,
    default: '',
    trim: true
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
        isRequired: true,
        trim: true
      },
      value: {
        type: String,
        default: '',
        trim: true
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
        isRequired: true,
        trim: true
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

itemSchema.index(
  {
    _id: 'text',
    name: 'text',
    category: 'text',
    condition: 'text',
    properties: {
      name: 'text',
      value: 'text'
    },
    notes: {
      content: 'text'
    }
  },
  { background: false }
);

module.exports = mongoose.model('Item', itemSchema);
