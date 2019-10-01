const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const folderSchema = new Schema({
  name: { type: String, isRequired: true },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder'
  },
  shown: {
    type: Boolean,
    isRequired: true
  }
});

module.exports = mongoose.model('Folder', folderSchema);
