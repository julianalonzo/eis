const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const folderSchema = new Schema({
  name: { type: String, isRequired: true, trim: true },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
    default: null
  },
  shown: {
    type: Boolean,
    default: true,
    select: false
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

Folder.on("index", err => {
  if (err) {
    console.log(err);
  }

  console.log("Folder indexes created");
});

module.exports = Folder;
