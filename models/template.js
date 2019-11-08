const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const templateSchema = new Schema({
  name: {
    type: String,
    required: true,
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
    required: true
  },
  shown: {
    type: Boolean,
    default: true,
    select: false
  }
});

templateSchema.index(
  {
    _id: "text",
    name: "text",
    description: "text"
  },
  { name: "template_text_index" }
);

const Template = mongoose.model("Template", templateSchema);

module.exports = Template;
