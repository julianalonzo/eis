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

templateSchema.index({
  _id: "text",
  name: "text",
  description: "text"
});

const Template = mongoose.model("Template", templateSchema);

Template.on("index", err => {
  if (err) {
    console.log(err);
  }

  console.log("Template indexes created");
});

module.exports = Template;
