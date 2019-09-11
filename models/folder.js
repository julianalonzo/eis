const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const folderSchema = new Schema({
  name: { type: String, isRequired: true },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder'
  }
});

module.exports = mongoose.model('Folder', folderSchema);
