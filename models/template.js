const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const templateSchema = new Schema({
  name: {
    type: String,
    isRequired: true
  },
  description: {
    type: String,
    default: ''
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    isRequired: true
  },
  shown: {
    type: Boolean,
    default: true,
    select: false
  }
});

templateSchema.index({
  _id: 'text',
  name: 'text',
  description: 'text'
});

module.exports = mongoose.model('Template', templateSchema);
