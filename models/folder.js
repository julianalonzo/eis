const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const folderSchema = new Schema({
  name: { type: String, required: true, trim: true },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
    default: null
  },
  shown: {
    type: Boolean,
    default: true,
    select: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

folderSchema.index(
  {
    _id: "text",
    name: "text"
  },
  { name: "folder_text_index" }
);

const Folder = mongoose.model("Folder", folderSchema);

module.exports = Folder;
