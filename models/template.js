const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const templateSchema = new Schema({
  name: {
    type: String,
    isRequired: true,
    trim: true
  },
  description: {
    type: String,
    default: "",
    trim: true
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    isRequired: true
  },
  shown: {
    type: Boolean,
    default: true,
    select: false
  }
});

await templateSchema.index({
  _id: "text",
  name: "text",
  description: "text"
});

module.exports = mongoose.model("Template", templateSchema);
