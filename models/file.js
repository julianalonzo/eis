const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
  originalname: { type: String, isRequired: true },
  mimetype: { type: String, isRequired: true },
  filename: { type: String, isRequired: true },
  path: { type: String, isRequired: true },
  type: { type: String, isRequired: true },
  size: { type: Number, isRequired: true },
  dateUploaded: { type: Date, isRequired: true, default: Date.now }
});

module.exports = mongoose.model('File', fileSchema);
